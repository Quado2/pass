import { NotFoundError, currentUser, requireAuth, validateRequest } from '@qdtickets/common';
import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import { getTicketValidations } from '../utils/validations';
import { Ticket } from '../models/tickets';


const router = express.Router();

router.patch('/api/update/:id', requireAuth, getTicketValidations, validateRequest, async (req: Request, res:Response) => {
 
  const id = req.params.id;
  const ticket = Ticket.findById(id);
  if(!ticket){
    throw new NotFoundError()
  }

  if(ticket.id !== currentUser.id){
    throw new 
  }

  //check that the ticket exists otherwise throw a 404
  
  //check that the ticket was initialy created by the user

 
  Ticket.updateOne({})
})



export {router as UpdateRouter}