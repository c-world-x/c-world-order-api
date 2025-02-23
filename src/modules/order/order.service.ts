import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor() {}

  placeOrder() {
    return true;
  }
}
