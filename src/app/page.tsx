'use client'

import Palettes from '@/components/color/palettes'
import Search from '@/components/color/search'

import { useBackgroundColor } from '@/store/color'

export default function HomePage() {
	const backgroundColor = useBackgroundColor()

	return (
		<main
			style={{
				backgroundColor: backgroundColor ? backgroundColor.hexCode : undefined,
			}}
			className="flex h-dvh flex-col gap-4 py-6 transition-colors"
		>
			<section className="flex flex-col px-6">
				<Search />
			</section>
			<Palettes className="flex-1 px-6" />
		</main>
	)
}
