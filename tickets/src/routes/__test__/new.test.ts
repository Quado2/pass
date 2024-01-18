import {app} from '../../app'
import request from 'supertest'
import { Ticket } from '../../models/tickets';


it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .send({});
 return expect(response.status).not.toEqual(404);

});
it('can only be accessed if the user is signed in', async () => {
  return request(app)
  .post('/api/tickets')
  .send({})
  .expect(401);
});
it('returns status other than 401 if the user is signed in', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({})
  return expect(response.status).not.toEqual(401);
});
it('returns an error if invalid title is passed', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: '1000'
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: '-1000',
    })
    .expect(400);

});
it('returns an error if an invalid price is passed', async () => {
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'Good title',
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    price: -50,
    title: 'Good title'
  })
  .expect(400);
});
it('creates a ticket with valid parameters', async () => {

  let title = "Test title";
  let price = 200.0;
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

   await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title,
    price,
  }).expect(201)


  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0]?.title).toEqual(title);
  expect(tickets[0]?.price).toEqual(price);
});