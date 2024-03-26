import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it("Cancels an order", async () => {

  const ticket = Ticket.build({
    price: 500,
    title: "Concert"
  })
  await ticket.save();

  const user = global.signin();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set("Cookie", user)
    .send({ticketId: ticket.id})
    .expect(201);

  await request(app)
    .patch(`/api/orders/cancel/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200)
  
  const newOrder = await Order.findById(order.id)
  expect(newOrder?.status).toEqual(OrderStatus.Cancelled);
} )

it.todo("Publish a cancelled order event")