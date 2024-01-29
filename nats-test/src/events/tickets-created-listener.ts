import { BaseListener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";


export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  queueGroupName: string = 'ticket-created-qg'
  readonly subject = Subjects.TicketCreated;
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(`Message received: #${msg.getSequence()}- ${msg.getSubject()} width data:
    Id: ${data.id}
    Title: ${data.title}
    Price: ${data.price}`)

    msg.ack()
  }
  
}