'use client'

import { useSearchParams } from 'next/navigation'

import Palette from '@/components/color/palette'

import { FILTERS_PARAM, QUERY_PARAM, SORT_PARAM } from '@/lib/constants'
import { ColorSort } from '@/lib/types'
import {
	applyColorFilters,
	cn,
	getIsFavorited,
	gridAutoColumn,
} from '@/lib/utils'
import { useColors, useFavoriteColorIds } from '@/store/color'

interface PalettesProps extends React.ComponentPropsWithoutRef<'section'> {}

export default function Palettes({
	style,
	className,
	...props
}: PalettesProps) {
	const colors = useColors()
	const favoriteColorIds = useFavoriteColorIds()
	const searchParams = useSearchParams()

	const query = searchParams.get(QUERY_PARAM) || undefined
	const filters = searchParams.get(FILTERS_PARAM) || undefined
	const sort = (searchParams.get(SORT_PARAM) as ColorSort) || undefined

	const isFavorited = filters ? getIsFavorited(filters) : undefined
	const filteredColors = applyColorFilters(colors, favoriteColorIds, {
		query,
		isFavorited,
		sort,
	})

	return (
		<section
			style={{
				gridTemplateColumns: gridAutoColumn('fill', '250px', '1fr'),
				...style,
			}}
			className={cn('grid gap-4', className)}
			{...props}
		>
			{filteredColors.map((color) => (
				<Palette key={color.id} color={color} />
			))}
		</section>
	)
}
