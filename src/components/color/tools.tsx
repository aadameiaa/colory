'use client'

import { BrushIcon } from 'lucide-react'

import CopyButton from '@/components/global/copy-button'
import { Button, ButtonProps } from '@/components/ui/button'

import { Color } from '@/lib/types'
import { cn, getIsTextDarkColor, getOppositeContrast } from '@/lib/utils'
import { useColorActions } from '@/store/color'

interface ToolsProps {
	color: Color
}

export default function Tools({ color }: ToolsProps) {
	const colorActions = useColorActions()

	const textColor = getOppositeContrast(color.hexCode)
	const isTextDarkColor = getIsTextDarkColor(color.hexCode)

	const styles: ButtonProps = {
		variant: 'ghost',
		size: 'icon',
		className: cn(
			'size-8 shrink-0',
			textColor,
			isTextDarkColor
				? 'hover:bg-foreground hover:text-background'
				: 'hover:bg-background hover:text-foreground',
		),
	}

	return (
		<div className="flex items-center gap-2">
			<Button
				{...styles}
				onClick={() => colorActions.toggleBackgroundColor(color)}
			>
				<BrushIcon className="size-4 shrink-0" />
			</Button>
			<CopyButton text={color.hexCode} {...styles} />
		</div>
	)
}
