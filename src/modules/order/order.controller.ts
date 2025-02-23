import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/modules/order/dto';
import { OrderService } from 'src/modules/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(@Payload() data: CreateOrderDto) {
    console.log('data', data);
    await this.processOrder();
    console.log('done');
    return true;
  }

  async processOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Handle logic');
        resolve(null);
      }, 2000);
    });
  }
}
