import request from 'supertest'
import {app} from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/tickets';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
  .patch('/api/tickets/'+id)
  .set("Cookie", global.signin())
  .send({
    title: 'test title',
    price: 20
  })
  .expect(404);
})
it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
  .patch('/api/tickets/'+id)
  .send({
    title: 'test title',
    price: 20
  })
  .expect(401);
})
it('returns a 403 if the user does not own the ticket', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set("Cookie", global.signin())
  .send({
    title: 'adfk',
    price: 20
  })

  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: "New title",
      price: 22
    })
    .expect(403)
})
it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
  .post('/api/tickets')
  .set("Cookie", cookie)
  .send({
    title: 'adfk',
    price: 20
  })

  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: "",
      price: 22
    })
    .expect(400)
})
it('updates the ticket if the user provides a valid title and or price ', async () => {
  const cookie = global.signin();
  const response = await request(app)
  .post('/api/tickets')
  .set("Cookie", cookie)
  .send({
    title: 'adfk',
    price: 20
  })

  const updateTitle = "Good title"
  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title:updateTitle,
      price: 22
    })
    .expect(200)

  const ticket = await Ticket.findById(response.body.id);
  console.log({ticket})
  expect(ticket!.title).toBe(updateTitle)
})
