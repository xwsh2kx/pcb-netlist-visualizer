export const VALIDATION_RULES = {
  NAMES_NOT_BLANK: 'names-not-blank',
  GND_CONNECTED: 'gnd-connected',
  DUPLICATE_REFS: 'duplicate-refs',
  FLOATING_PINS: 'floating-pins',
  POWER_CONNECTED: 'power-connected',
} as const;

export const RULE_DESCRIPTIONS: Record<string, string> = {
  [VALIDATION_RULES.NAMES_NOT_BLANK]: 'Component and net names must not be blank',
  [VALIDATION_RULES.GND_CONNECTED]: 'GND must be connected to all relevant components',
  [VALIDATION_RULES.DUPLICATE_REFS]: 'Component references must be unique',
  [VALIDATION_RULES.FLOATING_PINS]: 'All pins should be connected to a net',
  [VALIDATION_RULES.POWER_CONNECTED]: 'Power pins should be connected to power nets',
};
