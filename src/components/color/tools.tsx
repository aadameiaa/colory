'use client'

import { BrushIcon } from 'lucide-react'

import CopyButton from '@/components/global/copy-button'
import { Button, ButtonProps } from '@/components/ui/button'

import { Color } from '@/lib/types'
import { cn, getIsTextDarkColor, getOppositeContrast } from '@/lib/utils'
import { useColorActions } from '@/store/color'

interface ToolsProps extends React.ComponentPropsWithoutRef<'div'> {
	colorId: Color['id']
	hexCode: Color['hexCode']
}

export default function Tools({
	colorId,
	hexCode,
	className,
	...props
}: ToolsProps) {
	const colorActions = useColorActions()

	const textColor = getOppositeContrast(hexCode)
	const isTextDarkColor = getIsTextDarkColor(hexCode)

	const styles: ButtonProps = {
		variant: 'ghost',
		size: 'icon',
		className: cn(
			'shrink-0',
			textColor,
			isTextDarkColor
				? 'hover:bg-foreground hover:text-background'
				: 'hover:bg-background hover:text-foreground',
		),
	}

	return (
		<div className={cn('flex items-center gap-2', className)} {...props}>
			<Button
				{...styles}
				onClick={() => colorActions.toggleBackgroundColor(colorId)}
			>
				<BrushIcon className="size-4 shrink-0" />
			</Button>
			<CopyButton text={hexCode} {...styles} />
		</div>
	)
}
