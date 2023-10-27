import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PopoverContentProps {
  className?: string;
  children: ReactNode;
}
export function PopoverContent({ className, children }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          'data-[side="right"]:animate-slide-left-and-fade min-w-[246px] rounded-xl bg-zinc-800/75 p-4 text-zinc-50 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] backdrop-blur-sm',
          className,
        )}
        side="right"
        sideOffset={8}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}
