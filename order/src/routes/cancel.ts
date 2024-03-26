import express, {Request, Response} from 'express'
import { Order } from '../models/order';
import { NotAuthorizedError, NotFoundError, OrderStatus } from '@qdtickets/common';

const router = express.Router();

router.patch('/api/orders/cancel/:orderId', async (req:Request, res: Response) => {
  const {orderId} = req.params
  const  order = await Order.findById(orderId);

  if(!order) throw new NotFoundError()

  if(order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.send(order)

  //publish an cancelled order event
});




export {router as cancelOrderRouter}