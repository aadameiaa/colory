import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function gridAutoColumn(type: 'fit' | 'fill', min: string, max: string) {
	return `repeat(auto-${type}, minmax(${min}, ${max}))`
}
