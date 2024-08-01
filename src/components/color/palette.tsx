'use client'

import { HeartIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Color } from '@/lib/types'
import {
	cn,
	getIsFavoriteColor,
	getIsTextDarkColor,
	getOppositeContrast,
} from '@/lib/utils'
import { useColorActions, useFavoriteColorIds } from '@/store/color'

interface PaletteProps {
	color: Color
}

export default function Palette({ color }: PaletteProps) {
	const favoriteColorIds = useFavoriteColorIds()
	const colorActions = useColorActions()

	const textColor = getOppositeContrast(color.hexCode)
	const isTextDarkColor = getIsTextDarkColor(color.hexCode)
	const isFavoriteColor = getIsFavoriteColor(favoriteColorIds, color.id)

	return (
		<div
			style={{ backgroundColor: color.hexCode }}
			className="flex h-32 flex-col"
		>
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					'group/heart-button ml-auto size-8 shrink-0 hover:bg-transparent',
					textColor,
					isTextDarkColor ? 'hover:text-foreground' : 'hover:text-background',
				)}
				onClick={() => colorActions.toggleFavoriteColor(color.id)}
			>
				<HeartIcon
					className={cn(
						'size-4 shrink-0 transition-colors group-hover/heart-button:fill-transparent/20',
						isFavoriteColor &&
							'fill-red-400 group-hover/heart-button:fill-red-200',
					)}
				/>
			</Button>
			<div className={cn('mt-auto flex justify-between gap-2 p-2', textColor)}>
				<p className="font-bold">{color.name}</p>
				<p>{color.code}</p>
			</div>
		</div>
	)
}
