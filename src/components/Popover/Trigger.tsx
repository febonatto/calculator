import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

interface PopoverTriggerProps {
  children: ReactNode;
}
export function PopoverTrigger({ children }: PopoverTriggerProps) {
  return <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>;
}
