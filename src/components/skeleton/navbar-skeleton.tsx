'use client'

import { useEffect, useState } from 'react'

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
				'sticky inset-x-0 top-6 z-10 mx-auto flex h-fit w-[250px] flex-col gap-6 rounded-md p-2 md:ml-4',
				isScrolled && 'bg-background/20 shadow-sm backdrop-blur-sm',
			)}
		>
			<div className="flex items-center gap-4">
				<Skeleton className="size-10 shrink-0" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-4">
					<Skeleton className="size-10 shrink-0" />
					<div className="flex h-10 w-fit items-center justify-center gap-2 rounded-md">
						<Skeleton className="size-10 shrink-0" />
						<Skeleton className="size-10 shrink-0" />
						<Skeleton className="size-10 shrink-0" />
						<Skeleton className="size-10 shrink-0" />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</nav>
	)
}
