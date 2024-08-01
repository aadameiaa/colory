'use client'

import { HeartIcon } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

import { Color } from '@/lib/types'
import { cn, getIsFavoriteColor } from '@/lib/utils'
import { useColorActions, useFavoriteColorIds } from '@/store/color'

interface FavoriteButtonProps extends ButtonProps {
	colorId: Color['id']
	hexCode: Color['hexCode']
}

export default function FavoriteButton({
	colorId,
	hexCode,
	className,
	...props
}: FavoriteButtonProps) {
	const favoriteColorIds = useFavoriteColorIds()
	const colorActions = useColorActions()

	const isFavoriteColor = getIsFavoriteColor(favoriteColorIds, colorId)

	return (
		<Button
			className={cn('group/favorite-button shrink-0', className)}
			onClick={() => colorActions.toggleFavoriteColor(colorId)}
			{...props}
		>
			<HeartIcon
				className={cn(
					'size-4 shrink-0 transition-colors group-hover/favorite-button:fill-transparent/20',
					isFavoriteColor &&
						'fill-red-400 group-hover/favorite-button:fill-red-200',
				)}
			/>
		</Button>
	)
}
