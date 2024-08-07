'use client'

import {
	ArrowDown01Icon,
	ArrowDownAZIcon,
	ArrowUp10Icon,
	ArrowUpZAIcon,
	LucideIcon,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { SORT_PARAM } from '@/lib/constants'
import { ColorSort } from '@/lib/types'

export default function Sorters() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const sort = searchParams.get(SORT_PARAM) || undefined

	const setSortParam = (value: ColorSort) => {
		const urlSearchParams = new URLSearchParams(searchParams)

		sort === value
			? urlSearchParams.delete(SORT_PARAM)
			: urlSearchParams.set(SORT_PARAM, value)

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	const sorters: { id: ColorSort; icon: LucideIcon }[] = [
		{ id: 'asc-name', icon: ArrowDownAZIcon },
		{ id: 'desc-name', icon: ArrowUpZAIcon },
		{ id: 'asc-code', icon: ArrowDown01Icon },
		{ id: 'desc-code', icon: ArrowUp10Icon },
	]

	return (
		<div className="flex h-10 w-fit items-center justify-center gap-2">
			{sorters.map((sorter) => {
				const Icon = sorter.icon
				const isActive = sort === sorter.id

				return (
					<Button
						key={sorter.id}
						variant={isActive ? 'default' : 'secondary'}
						size="icon"
						className="shrink-0"
						onClick={() => setSortParam(sorter.id)}
					>
						<Icon className="size-4 shrink-0" />
					</Button>
				)
			})}
		</div>
	)
}
