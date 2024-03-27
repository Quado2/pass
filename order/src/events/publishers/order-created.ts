import { BasePublisher, OrderCreatedEvent, Subjects } from "@qdtickets/common";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}