import { COLOR_BRANDS, COLOR_SORTS } from '@/lib/constants'

export type Color = {
	id: string
	brand: string
	name: string
	code?: string
	hexCode: string
}

export type RGB = {
	r: number
	g: number
	b: number
}

export type XYZ = {
	x: number
	y: number
	z: number
}

export type LAB = {
	l: number
	a: number
	b: number
}

export type CMYK = {
	c: number
	m: number
	y: number
	k: number
}

export type ColorSort = (typeof COLOR_SORTS)[number]
export type ColorBrand = (typeof COLOR_BRANDS)[number]
