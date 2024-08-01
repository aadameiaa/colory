import Palette from '@/components/color/palette'

import { Color } from '@/lib/types'
import { getClosestColors, gridAutoColumn } from '@/lib/utils'

interface ClosestColorsProps {
	color: Color
	colors: Color[]
}

export default function ClosestColors({ color, colors }: ClosestColorsProps) {
	const closestColors = getClosestColors(color, colors, 4)

	return (
		<section
			style={{
				gridTemplateColumns: gridAutoColumn('fill', '250px', '1fr'),
			}}
			className="mx-auto grid flex-1 place-content-start gap-4 px-6 md:max-w-xl"
		>
			{closestColors.map((color) => (
				<Palette key={color.id} color={color} />
			))}
		</section>
	)
}
