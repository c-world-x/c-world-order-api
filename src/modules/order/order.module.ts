import { Module } from '@nestjs/common';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
