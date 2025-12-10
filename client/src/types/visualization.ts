export type Side = 'top' | 'bottom' | 'left' | 'right';

export type ComponentKind = 'ic' | 'passive' | 'connector' | 'power';

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds extends Point, Size {}

export interface PinShape {
  name: string;
  side: Side;
  position: Point;
}

export interface ComponentShape extends Bounds {
  ref: string;
  value: string;
  kind: ComponentKind;
  pins: PinShape[];
}

export interface WireShape {
  netName: string;
  path: Point[];
  labelPosition: Point;
}

export interface SchematicData {
  components: ComponentShape[];
  wires: WireShape[];
  bounds: Size;
}
