import * as Popover from '@radix-ui/react-popover';

export const MainBtn = () => (
  <Popover.Root>
    <Popover.Trigger />
    <Popover.Anchor />
    <Popover.Content>
      <Popover.Close />
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Root>
);
