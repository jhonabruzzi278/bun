import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none tracking-wide',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-white text-black dark:bg-white dark:text-black shadow-sm',
        secondary:
          'border border-transparent bg-neutral-100 text-neutral-900 dark:bg-white/[0.08] dark:text-neutral-200 dark:border-white/[0.08] backdrop-blur-md',
        amber:
          'border border-amber-500/30 bg-amber-500/15 text-amber-300 font-bold',
        success:
          'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 font-bold',
        warning:
          'border border-orange-500/30 bg-orange-500/15 text-orange-400 font-bold',
        destructive:
          'border border-red-500/30 bg-red-500/15 text-red-400 font-bold',
        outline:
          'border border-neutral-300 dark:border-white/[0.15] text-neutral-800 dark:text-neutral-200',
        glass:
          'border border-white/20 bg-white/10 backdrop-blur-lg text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-emerald-400 animate-pulse',
            variant === 'amber' && 'bg-amber-400 animate-pulse',
            variant === 'destructive' && 'bg-red-400',
            !variant || variant === 'default' && 'bg-black dark:bg-white'
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
