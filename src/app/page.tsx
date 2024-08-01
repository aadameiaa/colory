'use client'

import { lazy, Suspense } from 'react'

import NavbarSkeleton from '@/components/skeleton/navbar-skeleton'
import PalettesSkeleton from '@/components/skeleton/palettes-skeleton'

import { delay } from '@/lib/utils'
import { useBackgroundColor } from '@/store/color'

const Navbar = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/global/navbar'),
		delay(),
	])

	return moduleExports
})

const Palettes = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/color/palettes'),
		delay(),
	])

	return moduleExports
})

export default function HomePage() {
	const backgroundColor = useBackgroundColor()

	return (
		<main
			style={{
				backgroundColor: backgroundColor ? backgroundColor.hexCode : undefined,
			}}
			className="flex min-h-dvh flex-col gap-4 py-6 transition-colors"
		>
			<Suspense fallback={<NavbarSkeleton />}>
				<Navbar />
			</Suspense>
			<Suspense fallback={<PalettesSkeleton className="flex-1 px-6" />}>
				<Palettes className="flex-1 px-6" />
			</Suspense>
		</main>
	)
}
