import * as amqp from 'amqplib/callback_api';
import { Channel, Connection, Message } from 'amqplib/callback_api';

const CONNECTION_URL: string = 'amqp://vrcttfts:H_tbtOMjjx46CtQcioQCsaXmpFyd8f4C@cougar.rmq.cloudamqp.com/vrcttfts' || 'amqp://localhost:5627';
let ch = null;

amqp.connect(CONNECTION_URL, (err?: string, connection?: Connection): void => {
  connection.createChannel((err?: string, channel?: Channel): void => {
    ch = channel
    channel.consume('user-messages', (msg?: Message) => {
      console.log('....');

      setTimeout((): void => {
        console.log('Message', msg.content.toString());
      }, 4000);

    }, { noAck: true })
  });
});

export const publishToQueue = async (queueName: string, data: any): Promise<void> => {
  ch.sendToQueue(queueName, new Buffer(data));
};

// process.on('exit', (code: number): void => {
//   ch.clo
//   console.log(`Closing RabbitMQ Channel`);
// });
