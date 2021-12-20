import type { ReactNode } from 'react';
import BaseObject from './base';
import type { Merchant } from './Merchant';


export type OrderAttributes = {
    order_id: number

    merchant: Merchant;

    displayName: string;
    
};

// 导出类型 Order
// export type Order = Parse.Order<OrderAttributes>;


export class Order extends BaseObject<OrderAttributes> {
  name: any;
  avatar: ReactNode;
  constructor(attributes?: OrderAttributes) {
    super('Order', attributes);
  }
}
