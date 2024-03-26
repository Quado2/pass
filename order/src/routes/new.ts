import express, {Request, Response} from 'express'
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from '@qdtickets/common';
import { body } from 'express-validator'
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const EXPIRATION_WINDOW_SECONDS = 60*15;

const router = express.Router();

router.post('/api/orders', requireAuth,[
  body('ticketId')
  .not()
  .isEmpty()
  .withMessage("Ticket must be provided")

],
validateRequest,
 async (req:Request, res: Response) => {

  const {ticketId} = req.body;
  // Find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId);
  if(!ticket) {
    throw new NotFoundError();
  }

  //Make sure that this ticket is not already saved
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    throw new BadRequestError("Ticket already reserved")
  }

  //Calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  //Build the order and save it to the database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  })

  await order.save();

  //Publish an event saying that an order was created
  
  res.status(201).send(order);
});


export {router as newOrderRouter}