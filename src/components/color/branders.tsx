'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { BRAND_PARAM } from '@/lib/constants'
import { ColorBrand } from '@/lib/types'

export default function Branders() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const brand = searchParams.get(BRAND_PARAM) || undefined

	const setBrandParam = (value: ColorBrand) => {
		const urlSearchParams = new URLSearchParams(searchParams)

		brand === value
			? urlSearchParams.delete(BRAND_PARAM)
			: urlSearchParams.set(BRAND_PARAM, value)

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	const branders: { id: ColorBrand; label: string }[] = [
		{ id: 'dulux', label: 'Dulux' },
		{ id: 'jotun', label: 'Jotun' },
		{ id: 'no-drop', label: 'No Drop' },
		{ id: 'nippon-paint', label: 'Nippon Paint' },
	]

	return (
		<div className="flex flex-col gap-2">
			{branders.map((brander) => {
				const isActive = brand === brander.id

				return (
					<Button
						key={brander.id}
						variant={isActive ? 'default' : 'secondary'}
						className="shrink-0 justify-start"
						onClick={() => setBrandParam(brander.id)}
					>
						{brander.label}
					</Button>
				)
			})}
		</div>
	)
}
