import { BaseListener , TicketCreatedEvent, Subjects} from "@qdtickets/common";
import { Message } from "node-nats-streaming";


export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  queueGroupName: string = 'ticket-created-qg'
  readonly subject = Subjects.TicketCreated;
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(`Message received: #${msg.getSequence()}- ${msg.getSubject()} width data:
    Id: ${data.id}
    Title: ${data.title}
    Price: ${data.price}
    UserId: ${data.userId}
    
    `)
    

    msg.ack()
  }
  
}