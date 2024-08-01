'use client'

import { useEffect, useState } from 'react'

import Filters from '@/components/color/filters'
import Search from '@/components/color/search'
import { cn } from '@/lib/utils'

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)

	const handleScroll = () => {
		const offset = 16

		setIsScrolled(window.scrollY >= offset)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
	}, [])

	return (
		<nav
			className={cn(
				'sticky inset-x-0 top-6 z-10 mx-auto flex h-fit w-[260px] flex-wrap items-center justify-center gap-4 rounded-md p-2 md:w-fit',
				isScrolled && 'bg-background/20 shadow-sm backdrop-blur-sm',
			)}
		>
			<Search />
			<Filters />
		</nav>
	)
}
