import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateOrderDto } from 'src/modules/order/dto';
import { OrderService } from 'src/modules/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(
    @Payload() data: CreateOrderDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('data', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.processOrder();
    console.log('done');
    channel.ack(originalMsg);
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
