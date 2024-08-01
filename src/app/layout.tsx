import type { Metadata } from 'next'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Colory',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={cn('bg-background font-sans antialiased', fontSans.variable)}
			>
				{children}
			</body>
		</html>
	)
}
