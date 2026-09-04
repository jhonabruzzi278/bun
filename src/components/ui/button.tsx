import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-xs font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        default:
          'bg-white text-black hover:bg-white/90 shadow-sm hover:shadow-md dark:bg-white dark:text-black dark:hover:bg-neutral-200',
        primary:
          'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/20 hover:brightness-105 hover:shadow-amber-500/30',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.12] dark:border dark:border-white/[0.08] backdrop-blur-md',
        outline:
          'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-white/[0.12] dark:text-white dark:hover:bg-white/[0.06] dark:hover:border-white/[0.2]',
        ghost:
          'hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300 dark:hover:bg-white/[0.06] dark:hover:text-white',
        destructive:
          'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
        link: 'text-amber-500 underline-offset-4 hover:underline p-0 h-auto font-medium',
        apple:
          'bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium shadow-sm hover:shadow',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-[11px] rounded-xl',
        lg: 'h-12 px-6 text-sm rounded-2xl font-bold',
        icon: 'h-9 w-9 p-0 rounded-xl',
        pill: 'h-9 px-4 rounded-full text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
