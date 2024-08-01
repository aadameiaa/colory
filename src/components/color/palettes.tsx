'use client'

import Palette from '@/components/color/palette'
import { ScrollArea } from '@/components/ui/scroll-area'

import { gridAutoColumn } from '@/lib/utils'
import { useColors } from '@/store/color'

interface PalettesProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function Palettes(props: PalettesProps) {
	const colors = useColors()

	return (
		<ScrollArea {...props}>
			<section
				style={{ gridTemplateColumns: gridAutoColumn('fill', '250px', '1fr') }}
				className="grid gap-4"
			>
				{colors.map((color) => (
					<Palette key={color.id} color={color} />
				))}
			</section>
		</ScrollArea>
	)
}
