'use client'

import { PanelTopCloseIcon, PanelTopOpenIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import Filters from '@/components/color/filters'
import Search from '@/components/color/search'
import { Button } from '@/components/ui/button'

import { useDevices } from '@/hooks/use-devices'
import { cn } from '@/lib/utils'

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isVisible, setIsVisible] = useState(true)
	const { isSmallDevice } = useDevices()

	const handleScroll = () => {
		const offset = 16

		setIsScrolled(window.scrollY >= offset)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
	}, [])

	const VisibilityIcon = isVisible ? PanelTopCloseIcon : PanelTopOpenIcon

	return (
		<nav
			className={cn(
				'sticky inset-x-0 top-6 z-10 mx-auto flex h-fit w-[250px] flex-col gap-6 rounded-md p-2 md:ml-4',
				isScrolled && 'bg-background/20 shadow-sm backdrop-blur-sm',
			)}
		>
			<div className="flex items-center gap-4">
				{isSmallDevice && (
					<Button
						variant="secondary"
						size="icon"
						className="shrink-0"
						onClick={() => setIsVisible((prevState) => !prevState)}
					>
						<VisibilityIcon className="size-4 shrink-0" />
					</Button>
				)}
				<Search />
			</div>
			{isVisible && <Filters />}
		</nav>
	)
}
