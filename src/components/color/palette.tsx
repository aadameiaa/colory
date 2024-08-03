'use client'

import FavoriteButton from '@/components/color/favorite-button'
import Tools from '@/components/color/tools'

import { Color } from '@/lib/types'
import { cn, getIsTextDarkColor, getOppositeContrast } from '@/lib/utils'
import { DotIcon } from 'lucide-react'

interface PaletteProps {
	color: Color
}

export default function Palette({ color }: PaletteProps) {
	const textColor = getOppositeContrast(color.hexCode)
	const isTextDarkColor = getIsTextDarkColor(color.hexCode)

	return (
		<div
			style={{ backgroundColor: color.hexCode }}
			className="group/palette flex h-32 flex-col justify-between gap-4 rounded-md shadow-md transition-transform duration-500 hover:scale-110"
		>
			<div className="flex items-center justify-between gap-4 px-2 pt-2">
				<Tools
					colorId={color.id}
					hexCode={color.hexCode}
					className="invisible opacity-0 transition-all duration-300 ease-in group-hover/palette:visible group-hover/palette:opacity-100 group-hover/palette:transition-all group-hover/palette:duration-500 group-hover/palette:ease-out"
				/>
				<FavoriteButton
					colorId={color.id}
					hexCode={color.hexCode}
					variant="ghost"
					size="icon"
					className={cn(
						'hover:bg-transparent',
						textColor,
						isTextDarkColor ? 'hover:text-foreground' : 'hover:text-background',
					)}
				/>
			</div>
			<div
				className={cn(
					'flex items-end justify-between gap-2 px-4 pb-4',
					textColor,
				)}
			>
				<div className="flex flex-col">
					<div className="flex items-center">
						<p className="text-xs">{color.brand}</p>
						{color.product && (
							<>
								<DotIcon className="size-4 shrink-0" />
								<p className="text-xs">{color.product}</p>
							</>
						)}
					</div>
					<p className="font-semibold">{color.name}</p>
				</div>
				<p>{color.code}</p>
			</div>
		</div>
	)
}
