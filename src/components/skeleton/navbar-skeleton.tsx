'use client'

import { useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

export default function NavbarSkeleton() {
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
			<Skeleton className="h-10 w-[200px]" />
			<div className="flex items-center justify-center gap-2">
				<div className="flex items-center justify-center gap-2">
					<Skeleton className="size-10 shrink-0" />
					<Skeleton className="size-10 shrink-0" />
					<Skeleton className="size-10 shrink-0" />
					<Skeleton className="size-10 shrink-0" />
				</div>
				<Separator orientation="vertical" className="h-[30px] w-[2px]" />
				<Skeleton className="size-10 shrink-0" />
			</div>
		</nav>
	)
}
