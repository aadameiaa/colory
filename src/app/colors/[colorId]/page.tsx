'use client'

import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import ClosestColors from '@/components/color/closest-colors'
import FavoriteButton from '@/components/color/favorite-button'
import CopyButton from '@/components/global/copy-button'
import { Button } from '@/components/ui/button'

import {
	formatCMYK,
	formatLAB,
	formatRGB,
	formatXYZ,
	hexCodeToRGB,
	rgbToCMYK,
	rgbToLAB,
	rgbToXYZ,
} from '@/lib/utils'
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
	const rgb = hexCodeToRGB(color.hexCode)
	const formattedRGB = formatRGB(rgb)
	const formattedXYZ = formatXYZ(rgbToXYZ(rgb))
	const formattedLAB = formatLAB(rgbToLAB(rgb))
	const formattedCMYK = formatCMYK(rgbToCMYK(rgb))

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
				<div className="flex w-[170px] flex-col items-center justify-center text-center">
					<h3 className="text-xl font-bold">{color.name}</h3>
					{color.code && <p>{color.code}</p>}
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
			<section className="flex items-center justify-center gap-2">
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
			</section>
			<section className="mx-auto flex w-full max-w-lg flex-wrap items-center justify-center gap-2 px-6">
				<CopyButton
					text={color.hexCode}
					label={color.hexCode}
					variant="outline"
				/>
				<CopyButton
					text={formattedRGB}
					label={formattedRGB}
					variant="outline"
				/>
				<CopyButton
					text={formattedXYZ}
					label={formattedXYZ}
					variant="outline"
				/>
				<CopyButton
					text={formattedLAB}
					label={formattedLAB}
					variant="outline"
				/>
				<CopyButton
					text={formattedCMYK}
					label={formattedCMYK}
					variant="outline"
				/>
			</section>
			<ClosestColors color={color} colors={colors} />
		</main>
	)
}
