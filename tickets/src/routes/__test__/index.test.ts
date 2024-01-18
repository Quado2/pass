import request from 'supertest'
import {app} from '../../app'
import { Ticket } from '../../models/tickets'


it('returns tickets available', async () => {

  const ticket1 = Ticket.build({
    title: "Test title 1",
    price: 100,
    userId: "422"
  })
  await ticket1.save();


  const ticket2 = Ticket.build({
    title: "Test title 2",
    price: 150,
    userId: "4221"
  })
  await ticket2.save();


  const ticket3 = Ticket.build({
    title: "Test title 3",
    price: 120,
    userId: "422"
  })
  await ticket3.save();

  

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(3)
    
})