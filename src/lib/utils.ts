import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Color, RGB } from '@/lib/types'

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

export function hexCodeToRgb(hexCode: string): RGB {
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

export function toGrayScale({ r, g, b }: RGB): number {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getOppositeContrast(
	hexCode: string,
): 'text-foreground' | 'text-background' {
	return toGrayScale(hexCodeToRgb(hexCode)) > 128
		? 'text-foreground'
		: 'text-background'
}

export function getIsTextDarkColor(hexCode: Color['hexCode']): boolean {
	const textColor = getOppositeContrast(hexCode)
	return textColor === 'text-foreground'
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
