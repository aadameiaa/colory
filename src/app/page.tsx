'use client'

import Palettes from '@/components/color/palettes'

import { useBackgroundColor } from '@/store/color'

export default function HomePage() {
	const backgroundColor = useBackgroundColor()

	return (
		<main
			style={{
				backgroundColor: backgroundColor ? backgroundColor.hexCode : undefined,
			}}
			className="flex h-dvh flex-col transition-colors"
		>
			<Palettes className="flex-1 p-6" />
		</main>
	)
}
