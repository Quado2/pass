import request from 'supertest';
import {app} from '../../app';
import mongoose  from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('returns an error if the ticket does not exit', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId})
    .expect(404)

})

it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "PSquare Sell out",
    price: 40
  })
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "whatever",
    status: OrderStatus.Created,
    expiresAt: new Date()
  })

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ticketId: ticket.id})
    .expect(400)

})

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    title: "PSquare Sell out",
    price: 40
  })
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ticketId: ticket.id})
    .expect(201)
})

it.todo("Publishes event on creating order")