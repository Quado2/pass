import request from 'supertest'
import {app} from '../../app';
import { Ticket } from '../../models/tickets';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get('/api/tickets/'+ id)
    .send()
    .expect(404)
})
it('returns a ticket if ticket is found', async () => {
  let title = "Test title";
  let price = 40;
  let userId = 'ad4'
  const ticket = Ticket.build({
  title,
  price,
  userId
 })
 ticket.save();

 const ticketResponse = await request(app)
 .get(`/api/tickets/${ticket.id}`)
 .send()
 .expect(200)

 expect(ticketResponse.body.title).toBe(title);
 expect(ticketResponse.body.price).toBe(price)

})