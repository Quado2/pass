import { BasePublisher, OrderCancelledEvent, Subjects } from "@qdtickets/common";

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}