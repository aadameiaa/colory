'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

import { copyToClipboard } from '@/lib/utils'

interface CopyButtonProps extends ButtonProps {
	text: string
}

export default function CopyButton({ text, ...props }: CopyButtonProps) {
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
		<Button onClick={handleCopyClick} {...props}>
			<Icon className="size-4 shrink-0" />
		</Button>
	)
}
