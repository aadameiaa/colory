'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

import { cn, copyToClipboard } from '@/lib/utils'

interface CopyButtonProps extends ButtonProps {
	text: string
	label?: string
}

export default function CopyButton({
	text,
	label,
	className,
	...props
}: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopyClick = async () => {
		await copyToClipboard(text)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 1000)
	}

	const Icon = isCopied ? CheckIcon : CopyIcon

	return (
		<Button
			className={cn('shrink-0', className)}
			onClick={handleCopyClick}
			{...props}
		>
			{label && <span className="mr-2">{label}</span>}
			<Icon className="size-4 shrink-0" />
		</Button>
	)
}
