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
			className="group/palette flex h-32 flex-col rounded-md shadow-md"
		>
			<div className="flex items-center justify-between gap-4 p-2">
				<Tools
					colorId={color.id}
					hexCode={color.hexCode}
					className="invisible opacity-0 transition-all duration-300 ease-in group-hover/palette:visible group-hover/palette:opacity-100 group-hover/palette:transition-all group-hover/palette:duration-500 group-hover/palette:ease-out"
				/>
				<FavoriteButton color={color} />
			</div>
			<div className={cn('mt-auto flex justify-between gap-2 p-4', textColor)}>
				<p>{color.name}</p>
				<p>{color.code}</p>
			</div>
		</div>
	)
}
