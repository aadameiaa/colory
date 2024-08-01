'use client'

import { HeartIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { FAVORITED_VALUE, FILTERS_PARAM } from '@/lib/constants'
import { cn, getIsFavorited } from '@/lib/utils'

export default function Filters() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const filters = searchParams.get(FILTERS_PARAM) || ''
	const isFavorited = getIsFavorited(filters)

	const handleFavoritedClick = () => {
		const urlSearchParams = new URLSearchParams(searchParams)

		isFavorited
			? urlSearchParams.delete(FILTERS_PARAM)
			: urlSearchParams.set(FILTERS_PARAM, FAVORITED_VALUE)

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	return (
		<div className="flex items-center justify-center">
			<Button
				variant="outline"
				size="icon"
				className="shrink-0"
				onClick={handleFavoritedClick}
			>
				<HeartIcon
					className={cn('size-4 shrink-0', isFavorited && 'fill-red-400')}
				/>
			</Button>
		</div>
	)
}
