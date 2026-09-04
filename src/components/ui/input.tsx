import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-zinc-300 bg-white/95 px-4 py-2 text-sm sm:text-xs font-medium text-zinc-900 shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-semibold placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/90 dark:hover:border-zinc-500 dark:bg-[#18181C] dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus-visible:border-amber-400 dark:focus-visible:ring-amber-400/40 dark:focus-visible:bg-[#202026] backdrop-blur-md transition-all duration-200 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#18181C] [&:-webkit-autofill]:[-webkit-text-fill-color:#FFFFFF]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
