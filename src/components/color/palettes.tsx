'use client'

import { useSearchParams } from 'next/navigation'

import Palette from '@/components/color/palette'
import { ScrollArea } from '@/components/ui/scroll-area'

import { FILTERS_PARAM, QUERY_PARAM, SORT_PARAM } from '@/lib/constants'
import { ColorSort } from '@/lib/types'
import { applyColorFilters, getIsFavorited, gridAutoColumn } from '@/lib/utils'
import { useColors, useFavoriteColorIds } from '@/store/color'

interface PalettesProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function Palettes(props: PalettesProps) {
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
		<ScrollArea {...props}>
			<section
				style={{ gridTemplateColumns: gridAutoColumn('fill', '250px', '1fr') }}
				className="grid gap-4"
			>
				{filteredColors.map((color) => (
					<Palette key={color.id} color={color} />
				))}
			</section>
		</ScrollArea>
	)
}
