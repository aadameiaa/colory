'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useColors } from '@/store/color'
import { useRouter } from 'next/navigation'

export default function ColorPage({
	params: { colorId },
}: {
	params: { colorId: string }
}) {
	const colors = useColors()
	const router = useRouter()

	const lastIndex = colors.length - 1
	const index = colors.findIndex((color) => color.id === colorId)
	const color = colors[index]

	const handlePrevColorClick = () => {
		const prevColor = colors[index === 0 ? lastIndex : index - 1]

		router.push(`/colors/${prevColor.id}`)
	}

	const handleNextColorClick = () => {
		const nextColor = colors[index === lastIndex ? 0 : index + 1]

		router.push(`/colors/${nextColor.id}`)
	}

	return (
		<main
			style={{
				backgroundColor: color.hexCode,
			}}
			className="flex min-h-dvh flex-col gap-4 py-6 transition-colors"
		>
			<section className="mx-auto flex w-full max-w-lg items-center justify-between gap-4 px-6">
				<Button
					variant="outline"
					size="icon"
					className="shrink-0"
					onClick={handlePrevColorClick}
				>
					<ArrowLeftIcon className="size-4 shrink-0" />
				</Button>
				<div className="flex w-[170px] flex-col items-center justify-center">
					<h3 className="text-xl font-bold">{color.name}</h3>
					<p>{color.code}</p>
				</div>
				<Button
					variant="outline"
					size="icon"
					className="shrink-0"
					onClick={handleNextColorClick}
				>
					<ArrowRightIcon className="size-4 shrink-0" />
				</Button>
			</section>
		</main>
	)
}
