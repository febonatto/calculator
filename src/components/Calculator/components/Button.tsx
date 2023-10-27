import { ComponentProps, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const buttonVariants = cva(
  'flex py-3 items-center justify-center rounded bg-zinc-800',
  {
    variants: {
      variant: {
        default: 'text-zinc-50',
        clean: 'text-red-700',
        expression: 'text-green-500',
        resolve: 'bg-green-500 text-zinc-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ className, variant }))} {...props}>
      <span className="text-lg font-bold">{children}</span>
    </button>
  );
}
