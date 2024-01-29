import { BasePublisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

  publish(data: TicketCreatedEvent["data"]): Promise<void> {

    return new Promise((resolve, reject) => {
        this.client.publish(this.subject, JSON.stringify(data), (err) => {
          if(err) reject(err);
          console.log("Ticket event published for subject: ", this.subject)
          resolve();
        })
   
    })
   
  }

}