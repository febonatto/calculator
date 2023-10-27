import {
  Separator as RadixSeparator,
  SeparatorProps,
} from '@radix-ui/react-separator';

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  return (
    <RadixSeparator
      orientation={orientation}
      className="bg-zinc-800 data-[orientation=horizontal]:my-2 data-[orientation=vertical]:mx-2 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
    />
  );
}
