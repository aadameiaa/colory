'use client'

import Palettes from '@/components/color/palettes'
import Navbar from '@/components/global/navbar'

import { useBackgroundColor } from '@/store/color'

export default function HomePage() {
	const backgroundColor = useBackgroundColor()

	return (
		<main
			style={{
				backgroundColor: backgroundColor ? backgroundColor.hexCode : undefined,
			}}
			className="flex min-h-dvh flex-col gap-4 py-6 transition-colors"
		>
			<Navbar />
			<Palettes className="flex-1 px-6" />
		</main>
	)
}
