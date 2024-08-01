'use client'

import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import ClosestColors from '@/components/color/closest-colors'
import FavoriteButton from '@/components/color/favorite-button'
import CopyButton from '@/components/global/copy-button'
import { Button } from '@/components/ui/button'

import { useColors } from '@/store/color'

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

	const handleHomeClick = () => {
		router.push('/')
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
			<section className="mx-auto flex size-fit w-[222px] items-center gap-2">
				<Button
					variant="outline"
					size="icon"
					className="shrink-0"
					onClick={handleHomeClick}
				>
					<HomeIcon className="size-4 shrink-0" />
				</Button>
				<FavoriteButton
					colorId={color.id}
					hexCode={color.hexCode}
					variant="outline"
					size="icon"
				/>
				<CopyButton
					text={color.hexCode}
					label={color.hexCode}
					variant="outline"
				/>
			</section>
			<ClosestColors color={color} colors={colors} />
		</main>
	)
}
