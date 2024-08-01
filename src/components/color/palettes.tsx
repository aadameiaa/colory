'use client'

import { useSearchParams } from 'next/navigation'

import Palette from '@/components/color/palette'
import { ScrollArea } from '@/components/ui/scroll-area'

import { QUERY_PARAM } from '@/lib/constants'
import { applyColorFilters, gridAutoColumn } from '@/lib/utils'
import { useColors } from '@/store/color'

interface PalettesProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function Palettes(props: PalettesProps) {
	const colors = useColors()
	const searchParams = useSearchParams()

	const query = searchParams.get(QUERY_PARAM) || ''
	const filteredColors = applyColorFilters(colors, { query })

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
