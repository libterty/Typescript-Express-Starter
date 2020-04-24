import { MessageQueue } from '../queues/rabbitmq';


export class Publish {
  _conn?: any;

  public constructor() {
    this._conn = new MessageQueue('localhost', '5627', '123', [], 1);
  }

  public addTask(queue: [], task: string): Promise<void> {
    return this._conn.send(queue, task);
  }
}
