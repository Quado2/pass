import { app } from "../../app";
import { Ticket } from "../../models/ticket"
import request from "supertest";


async function buildTicket(title: string, price: number) {
  const ticket = Ticket.build({
    title,
    price
  })

  await ticket.save();
  return ticket;
}

it("Fetches orders for a particular user", async ()=> {

  // Create three tickets
  const ticket1 = await buildTicket("Concert", 300);
  const ticket2 = await buildTicket("Music Festival", 200);
  const ticket3 = await buildTicket("Cinema", 500);

  // Create one order as user 1
  const userOne = global.signin();
  const userTwo = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ticketId: ticket1.id})
    .expect(201)

  // Create two orders as user 2
  const {body: orderOne} = await request(app)
  .post("/api/orders")
  .set("Cookie", userTwo)
  .send({ticketId: ticket2.id})
  .expect(201)

  const {body: orderTwo} = await request(app)
  .post("/api/orders")
  .set("Cookie", userTwo)
  .send({ticketId: ticket3.id})
  .expect(201)

  // Make request to get orders for user #2
  const {body: user2Orders} = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200)

    expect(user2Orders.length).toEqual(2);
    expect(user2Orders[0].id).toEqual(orderOne.id);
    expect(user2Orders[1].id).toEqual(orderTwo.id);
    expect(user2Orders[0].ticket.id).toEqual(ticket2.id)
  
  


})