import { COLOR_SORTS } from './constants'

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

export type ColorSort = (typeof COLOR_SORTS)[number]
