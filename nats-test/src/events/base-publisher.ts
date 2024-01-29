import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects
  data: any
}

export abstract class BasePublisher <T extends Event> {
  abstract subject: T['subject'];
  abstract publish( data: T['data']): void;
  client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }
}