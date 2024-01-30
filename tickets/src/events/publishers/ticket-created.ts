import { BasePublisher, Subjects, TicketCreatedEvent } from "@qdtickets/common";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated =  Subjects.TicketCreated

}