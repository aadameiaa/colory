'use client'

import FavoriteButton from '@/components/color/favorite-button'
import Tools from '@/components/color/tools'

import { Color } from '@/lib/types'
import { cn, getOppositeContrast } from '@/lib/utils'

interface PaletteProps {
	color: Color
}

export default function Palette({ color }: PaletteProps) {
	const textColor = getOppositeContrast(color.hexCode)

	return (
		<div
			style={{ backgroundColor: color.hexCode }}
			className="flex h-32 flex-col rounded-md p-2 shadow-md"
		>
			<div className="flex items-center justify-between gap-4">
				<Tools color={color} />
				<FavoriteButton color={color} />
			</div>
			<div className={cn('mt-auto flex justify-between gap-2', textColor)}>
				<p className="font-bold">{color.name}</p>
				<p>{color.code}</p>
			</div>
		</div>
	)
}
