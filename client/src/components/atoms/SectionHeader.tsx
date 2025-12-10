import { Heading, type HeadingProps } from '@chakra-ui/react';

interface SectionHeaderProps extends HeadingProps {
  children: React.ReactNode;
}

export function SectionHeader({ children, ...props }: SectionHeaderProps) {
  return (
    <Heading
      as="h3"
      size="sm"
      fontWeight="semibold"
      color="gray.700"
      mb={3}
      {...props}
    >
      {children}
    </Heading>
  );
}
