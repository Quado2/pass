import express, {Request, Response} from 'express'
import { Order } from '../models/order';
import { NotAuthorizedError, NotFoundError, OrderStatus } from '@qdtickets/common';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled';
import natsClient from '../nats-client';

const router = express.Router();

router.patch('/api/orders/cancel/:orderId', async (req:Request, res: Response) => {
  const {orderId} = req.params
  const  order = await Order.findById(orderId).populate('ticket');

  if(!order) throw new NotFoundError()

  if(order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();
  
  //publish an cancelled order event
  new OrderCancelledPublisher(natsClient.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id
    }
  })
  res.send(order)
});

export {router as cancelOrderRouter}