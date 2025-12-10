import type { Netlist, ValidationError } from '../types';

type Validator = (netlist: Netlist) => ValidationError[];

const GROUND_PATTERNS = ['GND', 'VSS', 'AGND', 'DGND', '0V'];
const POWER_PATTERNS = ['VCC', 'VDD', 'V+', 'VIN', '5V', '3V3', '12V'];

/**
 * Rule: Name data must not be blank
 * Checks all component refs, values, and net names
 */
const validateNamesNotBlank: Validator = (netlist) => {
  const errors: ValidationError[] = [];

  // Check component refs and values
  netlist.components.forEach((component, index) => {
    if (!component.ref || component.ref.trim() === '') {
      errors.push({
        rule: 'names-not-blank',
        message: `Component at index ${index} has blank reference`,
        severity: 'error',
      });
    }
    if (!component.value || component.value.trim() === '') {
      errors.push({
        rule: 'names-not-blank',
        message: `Component ${component.ref || index} has blank value`,
        severity: 'warning',
      });
    }
  });

  // Check net names
  netlist.nets.forEach((net, index) => {
    if (!net.name || net.name.trim() === '') {
      errors.push({
        rule: 'names-not-blank',
        message: `Net at index ${index} has blank name`,
        severity: 'error',
      });
    }
  });

  return errors;
};

/**
 * Rule: GND must be connected to all relevant components
 * ICs and active components should have ground connection
 */
const validateGroundConnections: Validator = (netlist) => {
  const errors: ValidationError[] = [];

  // Find GND net(s)
  const groundNets = netlist.nets.filter(net =>
    GROUND_PATTERNS.some(p => net.name.toUpperCase().includes(p))
  );

  if (groundNets.length === 0) {
    errors.push({
      rule: 'gnd-connected',
      message: 'No ground net (GND) found in design',
      severity: 'warning',
    });
    return errors;
  }

  // Get all refs connected to ground
  const groundedRefs = new Set<string>();
  groundNets.forEach(net => {
    net.nodes.forEach(node => groundedRefs.add(node.ref));
  });

  // Check ICs (U prefix) are grounded
  const ics = netlist.components.filter(c => 
    c.ref.startsWith('U') || c.ref.startsWith('IC')
  );

  ics.forEach(ic => {
    if (!groundedRefs.has(ic.ref)) {
      errors.push({
        rule: 'gnd-connected',
        message: `IC ${ic.ref} (${ic.value}) is not connected to GND`,
        severity: 'error',
      });
    }
  });

  return errors;
};

/**
 * Rule: Component references must be unique
 */
const validateUniqueRefs: Validator = (netlist) => {
  const errors: ValidationError[] = [];
  const seen = new Set<string>();

  netlist.components.forEach(component => {
    if (seen.has(component.ref)) {
      errors.push({
        rule: 'duplicate-refs',
        message: `Duplicate component reference: ${component.ref}`,
        severity: 'error',
      });
    }
    seen.add(component.ref);
  });

  return errors;
};

/**
 * Rule: Power pins should be connected to power nets
 */
const validatePowerConnections: Validator = (netlist) => {
  const errors: ValidationError[] = [];

  // Find power nets
  const powerNets = netlist.nets.filter(net =>
    POWER_PATTERNS.some(p => net.name.toUpperCase().includes(p))
  );

  if (powerNets.length === 0) {
    // Check if there are ICs that would need power
    const hasICs = netlist.components.some(c => 
      c.ref.startsWith('U') || c.ref.startsWith('IC')
    );
    
    if (hasICs) {
      errors.push({
        rule: 'power-connected',
        message: 'No power net (VCC/VDD) found but design contains ICs',
        severity: 'warning',
      });
    }
  }

  return errors;
};

/**
 * Rule: Check for floating nets (single node connections)
 */
const validateNoFloatingNets: Validator = (netlist) => {
  const errors: ValidationError[] = [];

  netlist.nets.forEach(net => {
    if (net.nodes.length === 1) {
      errors.push({
        rule: 'floating-pins',
        message: `Net "${net.name}" has only one connection (floating)`,
        severity: 'warning',
      });
    }
  });

  return errors;
};

/**
 * Rule: Net nodes must reference existing components
 */
const validateNodeReferences: Validator = (netlist) => {
  const errors: ValidationError[] = [];
  const componentRefs = new Set(netlist.components.map(c => c.ref));

  netlist.nets.forEach(net => {
    net.nodes.forEach(node => {
      if (!componentRefs.has(node.ref)) {
        errors.push({
          rule: 'invalid-ref',
          message: `Net "${net.name}" references unknown component "${node.ref}"`,
          severity: 'error',
        });
      }
    });
  });

  return errors;
};

// All validators in order of execution
const validators: Validator[] = [
  validateNamesNotBlank,
  validateUniqueRefs,
  validateNodeReferences,
  validateGroundConnections,
  validatePowerConnections,
  validateNoFloatingNets,
];

/**
 * Run all validation rules against a netlist
 */
export function validateNetlist(netlist: Netlist): ValidationError[] {
  return validators.flatMap(validator => validator(netlist));
}
