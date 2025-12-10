export interface Design {
  source?: string;
  date?: string;
  tool?: string;
  title?: string;
}

export interface Component {
  ref: string;
  value: string;
  footprint?: string;
  library?: string;
  part?: string;
  description?: string;
}

export interface Node {
  ref: string;
  pin: string;
  pinFunction?: string;
  pinType?: string;
}

export interface Net {
  code: number;
  name: string;
  nodes: Node[];
}

export interface Netlist {
  version?: string;
  design?: Design;
  components: Component[];
  nets: Net[];
}

export interface ValidationError {
  rule: string;
  message: string;
  severity: 'error' | 'warning';
}
