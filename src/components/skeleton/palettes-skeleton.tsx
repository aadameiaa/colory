import { Skeleton } from '@/components/ui/skeleton'

import { cn, gridAutoColumn } from '@/lib/utils'

interface PalettesSkeletonProps
	extends React.ComponentPropsWithoutRef<'section'> {}

export default function PalettesSkeleton({
	style,
	className,
	...props
}: PalettesSkeletonProps) {
	const size = 78

	return (
		<section
			style={{
				gridTemplateColumns: gridAutoColumn('fill', '250px', '1fr'),
				...style,
			}}
			className={cn(
				'mx-auto grid flex-1 place-content-start gap-4 px-6 md:max-w-xl',
				className,
			)}
			{...props}
		>
			{Array.from({ length: size }, (_, index) => index + 1).map((id) => (
				<Skeleton key={id} className="h-32 shadow-md" />
			))}
		</section>
	)
}
