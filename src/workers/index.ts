import * as amqp from 'amqplib/callback_api';
import { Channel, Connection, Message } from 'amqplib/callback_api';

const CONNECTION_URL: string = process.env.CONNECTION_URL || 'amqp://localhost:5627';

amqp.connect(CONNECTION_URL, (err: object, connect: Connection): void => {
  connect.createChannel((err: object, channel: Channel) => {
    channel.consume('user-messages', (msg?: Message) => {
      console.log('....');

      setTimeout((): void => {
        console.log('Message', msg.content.toString());
      }, 4000);

    }, { noAck: true })
  });
});
