import { TicketCreatedEvent, Subjects, BasePublisher } from "@qdtickets/common";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

}