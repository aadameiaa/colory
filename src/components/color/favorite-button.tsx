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

interface FavoriteButtonProps {
	color: Color
}

export default function FavoriteButton({ color }: FavoriteButtonProps) {
	const favoriteColorIds = useFavoriteColorIds()
	const colorActions = useColorActions()

	const textColor = getOppositeContrast(color.hexCode)
	const isTextDarkColor = getIsTextDarkColor(color.hexCode)
	const isFavoriteColor = getIsFavoriteColor(favoriteColorIds, color.id)

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn(
				'group/heart-button shrink-0 hover:bg-transparent',
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
	)
}
