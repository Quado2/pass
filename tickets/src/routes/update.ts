import { NotFoundError, NotPermittedError, currentUser, requireAuth, validateRequest } from '@qdtickets/common';
import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import { getTicketValidations } from '../utils/validations';
import { Ticket } from '../models/tickets';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated';
import natsClient from '../nats-client';


const router = express.Router();

router.patch('/api/tickets/:id', 
  requireAuth,
  getTicketValidations(),
  validateRequest,
  async (req: Request, res:Response) => {
 
   //check that the ticket exists otherwise throw a 404
  const id =  req.params.id;
  const ticket =  await Ticket.findById(id);
  if(!ticket){
    throw new NotFoundError()
  }


  //check that the ticket was initialy created by the user
  if(ticket.userId !== req.currentUser!.id){
    throw new NotPermittedError()
  }

  const {title, price} = req.body;
 
 // update the ticket now 
  ticket.set({
    title, 
    price
  })

  await ticket.save();

  new TicketUpdatedPublisher(natsClient.client).publish({
    id: ticket.id,
    userId: ticket.userId,
    title: ticket.title,
    price: ticket.price
  })

 res.send(ticket)


})



export {router as UpdateRouter}