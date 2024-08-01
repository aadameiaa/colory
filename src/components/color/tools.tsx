'use client'

import { BrushIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

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

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					'size-8 shrink-0',
					textColor,
					isTextDarkColor
						? 'hover:bg-foreground hover:text-background'
						: 'hover:bg-background hover:text-foreground',
				)}
				onClick={() => colorActions.toggleBackgroundColor(color)}
			>
				<BrushIcon className="size-4 shrink-0" />
			</Button>
		</div>
	)
}
