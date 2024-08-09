'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'

import { QUERY_PARAM } from '@/lib/constants'

export default function Search() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const query = searchParams.get(QUERY_PARAM) || ''

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		const urlSearchParams = new URLSearchParams(searchParams)

		value
			? urlSearchParams.set(QUERY_PARAM, value)
			: urlSearchParams.delete(QUERY_PARAM)

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	return (
		<div className="relative">
			<SearchIcon className="absolute left-3 top-3 size-4 shrink-0 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Color name or code"
				defaultValue={query}
				onChange={handleChange}
				className="pl-8"
			/>
		</div>
	)
}
