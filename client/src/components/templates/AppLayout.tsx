import { Flex, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Header } from '../organisms';

interface AppLayoutProps {
  userId: string;
  sidebar: ReactNode;
  main: ReactNode;
}

export function AppLayout({ userId, sidebar, main }: AppLayoutProps) {
  const direction = useBreakpointValue({ base: 'column', lg: 'row' }) as 'column' | 'row';

  return (
    <Flex direction="column" h="100vh" bg="gray.100">
      <Header userId={userId} />
      
      <Flex
        direction={direction}
        flex={1}
        overflow="hidden"
      >
        {sidebar}
        {main}
      </Flex>
    </Flex>
  );
}
