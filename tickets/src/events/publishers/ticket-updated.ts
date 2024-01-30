import { BasePublisher, Subjects, TicketUpdatedEvents } from "@qdtickets/common";

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvents> {
   readonly subject: Subjects.TicketUpdated =  Subjects.TicketUpdated

}