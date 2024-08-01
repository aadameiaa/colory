import { COLOR_SORTS } from '@/lib/constants'

export type Color = {
	id: string
	name: string
	code: string
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

export type ColorSort = (typeof COLOR_SORTS)[number]
