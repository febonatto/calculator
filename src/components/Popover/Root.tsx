import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

interface PopoverRootProps {
  children: ReactNode;
}
export function PopoverRoot({ children }: PopoverRootProps) {
  return <RadixPopover.Root>{children}</RadixPopover.Root>;
}
