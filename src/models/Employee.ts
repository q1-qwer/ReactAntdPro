import type { ReactNode } from 'react';
import BaseObject from './base';
import type { Merchant } from './Merchant';

export type EmployeeAttributes = {

    merchant: Merchant;

    displayName: string;
    
};

export class Employee extends BaseObject<EmployeeAttributes> {
  name: any;
  avatar: ReactNode;
  constructor(attributes?: EmployeeAttributes) {
    super('Employee', attributes);
  }
}
