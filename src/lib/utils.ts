import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { FAVORITED_VALUE, LAZY_COMPONENT_DELAY } from '@/lib/constants'
import { CMYK, Color, ColorSort, LAB, RGB, XYZ } from '@/lib/types'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function gridAutoColumn(
	type: 'fit' | 'fill',
	min: string,
	max: string,
): string {
	return `repeat(auto-${type}, minmax(${min}, ${max}))`
}

export function hexCodeToRGB(hexCode: string): RGB {
	const removedHash = hexCode.replace('#', '')
	const formattedHexCode =
		removedHash.length === 3
			? removedHash
					.split('')
					.map((char) => char + char)
					.join('')
			: removedHash
	const baseNumber = 16

	const r = parseInt(formattedHexCode.slice(0, 2), baseNumber)
	const g = parseInt(formattedHexCode.slice(2, 4), baseNumber)
	const b = parseInt(formattedHexCode.slice(4, 6), baseNumber)

	return { r, g, b }
}

function toGrayScale({ r, g, b }: RGB): number {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getOppositeContrast(
	hexCode: string,
): 'text-foreground' | 'text-background' {
	return toGrayScale(hexCodeToRGB(hexCode)) > 128
		? 'text-foreground'
		: 'text-background'
}

function normalizeXYZ({ x, y, z }: XYZ) {
	return { nx: x / 0.9642, ny: y / 1.0, nz: z / 0.8249 }
}

function xyzToLABColorSpace(normalizeValue: number) {
	return normalizeValue > 0.008856
		? Math.pow(normalizeValue, 1 / 3)
		: (903.3 * normalizeValue + 16) / 116
}

function xyzToLAB(xyz: XYZ): LAB {
	const { nx, ny, nz } = normalizeXYZ(xyz)

	const fx = xyzToLABColorSpace(nx)
	const fy = xyzToLABColorSpace(ny)
	const fz = xyzToLABColorSpace(nz)

	const l = Math.max(0, 116 * fy - 16)
	const a = (fx - fy) * 500
	const b = (fy - fz) * 200

	return { l, a, b }
}

function normalizeRGB({ r, g, b }: RGB) {
	return { nr: r / 255, ng: g / 255, nb: b / 255 }
}

export function rgbToXYZ(rgb: RGB) {
	const { nr, ng, nb } = normalizeRGB(rgb)

	const x = 0.4124564 * nr + 0.3575761 * ng + 0.1804375 * nb
	const y = 0.2126729 * nr + 0.7151522 * ng + 0.072175 * nb
	const z = 0.0193339 * nr + 0.119192 * ng + 0.9503041 * nb

	return { x, y, z }
}

export function rgbToLAB(rgb: RGB) {
	return xyzToLAB(rgbToXYZ(rgb))
}

export function rgbToCMYK(rgb: RGB): CMYK {
	const r = rgb.r / 255
	const g = rgb.g / 255
	const b = rgb.b / 255

	const k = 1 - Math.max(r, g, b)
	const c = (1 - r - k) / (1 - k)
	const m = (1 - g - k) / (1 - k)
	const y = (1 - b - k) / (1 - k)

	return {
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100),
	}
}

function colorDistance(rgb: RGB, comparedRgb: RGB) {
	const { l, a, b } = rgbToLAB(rgb)
	const { l: comparedL, a: comparedA, b: comparedB } = rgbToLAB(comparedRgb)

	return Math.sqrt(
		Math.pow(l - comparedL, 2) +
			Math.pow(a - comparedA, 2) +
			Math.pow(b - comparedB, 2),
	)
}

export function getClosestColors(
	color: Color,
	comparedColors: Color[],
	size: number = 5,
) {
	return comparedColors
		.filter((comparedColor) => comparedColor.id !== color.id)
		.map((comparedColor) => ({
			...comparedColor,
			distance: colorDistance(
				hexCodeToRGB(color.hexCode),
				hexCodeToRGB(comparedColor.hexCode),
			),
		}))
		.sort((a, b) => a.distance - b.distance)
		.slice(0, size)
}

export function getIsTextDarkColor(hexCode: Color['hexCode']): boolean {
	return getOppositeContrast(hexCode) === 'text-foreground'
}

export function getIsFavoriteColor(
	favoriteColorIds: Color['id'][],
	colorId: Color['id'],
): boolean {
	return Boolean(
		favoriteColorIds.find((favoriteColorId) => favoriteColorId === colorId),
	)
}

export async function copyToClipboard(text: string) {
	if ('clipboard' in navigator) {
		return await navigator.clipboard.writeText(text)
	}
}

function applyColorSort(colors: Color[], sort: ColorSort): Color[] {
	switch (sort) {
		case 'asc-name':
			return colors.sort((a, b) =>
				a.name.toLowerCase() <= b.name.toLowerCase() ? -1 : 1,
			)
		case 'desc-name':
			return colors.sort((a, b) =>
				a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1,
			)
		case 'asc-code':
			return colors.sort((a, b) =>
				a.code && b.code
					? a.code.toLowerCase() <= b.code.toLowerCase()
						? -1
						: 1
					: -1,
			)
		case 'desc-code':
			return colors.sort((a, b) =>
				a.code && b.code
					? a.code.toLowerCase() > b.code.toLowerCase()
						? -1
						: 1
					: -1,
			)
		default:
			return colors
	}
}

export function applyColorFilters(
	colors: Color[],
	favoriteColorIds: Color['id'][],
	{
		query,
		isFavorited,
		sort,
	}: { query?: string; isFavorited?: boolean; sort?: ColorSort },
): Color[] {
	let filteredColors = [...colors]

	if (query) {
		filteredColors = filteredColors.filter(
			(color) =>
				color.name.toLowerCase().includes(query.toLowerCase()) ||
				(color.code && color.code.toLowerCase().includes(query.toLowerCase())),
		)
	}

	if (isFavorited) {
		filteredColors = filteredColors.filter((color) =>
			Boolean(favoriteColorIds.find((colorId) => colorId === color.id)),
		)
	}

	if (sort) {
		filteredColors = applyColorSort(filteredColors, sort)
	}

	return filteredColors
}

export function getIsFavorited(filters: string): boolean {
	return filters.includes(FAVORITED_VALUE)
}

export async function delay(duration: number = LAZY_COMPONENT_DELAY) {
	return new Promise((resolve) => setTimeout(resolve, duration))
}

export function formatRGB(rgb: RGB): string {
	return `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function formatXYZ(xyz: XYZ): string {
	return `XYZ(${(xyz.x * 100).toFixed(2)}, ${(xyz.y * 100).toFixed(2)}, ${(xyz.z * 100).toFixed(2)})`
}

export function formatLAB(lab: LAB): string {
	return `LAB(${lab.l.toFixed(2)}, ${lab.a.toFixed(2)}, ${lab.b.toFixed(2)})`
}

export function formatCMYK(cmyk: CMYK): string {
	return `CMYK(${cmyk.c / 100}, ${cmyk.m / 100}, ${cmyk.y / 100}, ${cmyk.k / 100})`
}

export function nanoid(
	{ size = 10, prefix }: { size?: number; prefix?: string } = { size: 10 },
): string {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	return prefix && prefix.length !== 0
		? `${prefix}-${customAlphabet(alphabet, size)()}`
		: customAlphabet(alphabet, size)()
}
