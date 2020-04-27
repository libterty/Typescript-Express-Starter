import * as express from 'express';
import { publish } from '../pubsub/publish';
export const router: express.Router = express.Router();

router.post('/msg', publish.postMsg);
