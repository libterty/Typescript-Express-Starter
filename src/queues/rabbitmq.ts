import * as amqp from 'amqplib';
import { Channel, Connection, Options } from 'amqplib';
import AssertQueue = Options.AssertQueue;
let amqpConn: null = null;
const amqpURL = process.env.CLOUDAMQP_URL || 'amqp://localhost:5627';

export class MessageQueue {
  _url?: string;
  _queues: Array<any>;
  _prefetch?: number;
  _connection?: Connection;
  _channel?: Channel;
  emit: any;

  public constructor(private host: string, private user: string, private password: string, public queues: Array<any>, public prefetch: number) {
    this._url = amqpURL;
    this._queues = queues || ['default'];
    this._prefetch = prefetch;
  }

  public connect(): ReturnType<any> {
    return amqp.connect(this._url)
      .then(connection => (this._connection = connection).createChannel())
      .then(channel => {
        this._channel = channel;
        channel.prefetch(this._prefetch);
        let promises: any = [];

        for (let queue of this._queues) {
          promises.push(
            channel
              .assertQueue(queue, { durable: true })
              .then((result: ReturnType<any>) => channel.consume(result.queue, (message: ReturnType<any>): void => {
                if (message !== null) {
                  this.emit('messageReceived', JSON.parse(message.content), result.queue, message);
                }
              }, { noAck: false }))
          );
        }
        return Promise.all(promises);
      })
  }

  public send(queue: string, message) {
    let messageBuffer = new Buffer(JSON.stringify(message));

    return this._channel
        .assertQueue(queue, { durable: true})
        .then(result => this._channel.sendToQueue(result.queue, messageBuffer, { persistent: true }));

  }
}
