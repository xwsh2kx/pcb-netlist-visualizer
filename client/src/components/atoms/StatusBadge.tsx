import { Badge, type BadgeProps } from '@chakra-ui/react';

interface StatusBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  isValid: boolean;
  errorCount?: number;
}

export function StatusBadge({ isValid, errorCount = 0, ...props }: StatusBadgeProps) {
  if (isValid) {
    return (
      <Badge colorScheme="green" {...props}>
        ✓ Valid
      </Badge>
    );
  }

  return (
    <Badge colorScheme="red" {...props}>
      ⚠ {errorCount} error{errorCount !== 1 ? 's' : ''}
    </Badge>
  );
}
