import BaseObject from './base';

export type MerchantAttributes = {
  mid: string;
};

export class Merchant extends BaseObject<MerchantAttributes> {
  // 调用构造器，创建实例
  constructor(attributes?: MerchantAttributes) {
    super('Merchant', attributes);
  }
}
