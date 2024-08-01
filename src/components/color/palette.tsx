'use client'

import { Color } from '@/lib/types'

interface PaletteProps {
	color: Color
}

export default function Palette({ color }: PaletteProps) {
	return (
		<div
			style={{ backgroundColor: color.hexCode }}
			className="flex h-32 flex-col"
		>
			<div className="mt-auto flex justify-between gap-2 p-2">
				<p className="font-bold">{color.name}</p>
				<p>{color.code}</p>
			</div>
		</div>
	)
}
