import { cn } from '@/shared/lib/utils'

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={cn('w-full rounded-lg bg-card p-2.5 md:p-6', className)}>{children}</div>
}
