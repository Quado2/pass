import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';
import mongoose from 'mongoose';


it("Should show order created by the user", async () => {

  const user = global.signin();
  const ticket = Ticket.build({
    price: 450,
    title: "Odumodu Home Coming"
  })
  await ticket.save();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set("Cookie", user)
    .send({ticketId: ticket.id})
    .expect(201)

 const {body: showedOrder} = await request(app)
  .get(`/api/orders/${order.id}`)
  .set("Cookie", user)
  .expect(200)
})

it("Returns unauthorized when a user tries to fetch order they did not create.", async () => {
  const user = global.signin();
  const ticket = Ticket.build({
    price: 450,
    title: "Odumodu Home Coming"
  })
  await ticket.save();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set("Cookie", user)
    .send({ticketId: ticket.id})
    .expect(201)


  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .expect(401)
  
})


it("Returns not found when non existing Id is passed", async () => {

  const user = global.signin();
  const ticket = Ticket.build({
    price: 450,
    title: "Odumodu Home Coming"
  })
  await ticket.save();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set("Cookie", user)
    .send({ticketId: ticket.id})
    .expect(201)

  const orderId = new mongoose.Types.ObjectId();
  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .expect(404)
})