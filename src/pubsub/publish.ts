import { Request, Response } from 'express';
import { QueueMessages } from '../interfaces';
import { publishToQueue } from '../queues/rabbitmq';

export const publish = {
  postMsg: async (req: Request, res: Response): Promise<any> => {
    const _queues = req.body as QueueMessages;
    await publishToQueue(_queues.queueNames, _queues.payload);
    try {
      return res.status(204);
    } catch (error) {
      return res.status(500).json({ status: false, onError: error.message });
    }
  }
}
