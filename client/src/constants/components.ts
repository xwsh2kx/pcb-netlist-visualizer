import type { ComponentKind } from '@/types';

export const COMPONENT_PREFIXES: Record<string, ComponentKind> = {
  U: 'ic',
  IC: 'ic',
  R: 'passive',
  C: 'passive',
  L: 'passive',
  D: 'passive',
  Q: 'passive',
  J: 'connector',
  P: 'connector',
  CN: 'connector',
  CONN: 'connector',
  PS: 'power',
  PWR: 'power',
};

export const POWER_PINS = ['VCC', 'VDD', 'V+', '+V', 'VIN', 'VBAT', '5V', '3V3', '12V'];
export const GROUND_PINS = ['GND', 'VSS', 'V-', '-V', 'AGND', 'DGND', '0V'];
export const INPUT_PINS = ['IN', 'INPUT', 'RX', 'RXD', 'MISO', 'SDA', 'A', 'B'];
export const OUTPUT_PINS = ['OUT', 'OUTPUT', 'TX', 'TXD', 'MOSI', 'SCL', 'Q', 'Y'];
export const CONTROL_PINS = ['CLK', 'RST', 'RESET', 'EN', 'CS', 'SS', 'CE', 'WE', 'OE'];
