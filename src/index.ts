import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import { router } from './routes';
const app: express.Application = express();

config();

const port: number | string = process.env.PORT || 3001;
const mongoURL: string = process.env.MONGO_URL || 'mongodb://localhost:27017';
let mongoClient = null;

MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client): void {
  mongoClient = client;
})

// parsing body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.send('hello World!');
});

app.use('/queues', router);


app.listen(port, () => console.log(`Server is runnning on port: ${port}`));

process.on('exit', (code: number): void => {
  // mongoClient.close();
  console.log(`Exit code with ${code}`);
});

process.on('SIGINT', (): void => {
  console.log('Malware Queues interrupt');
  process.exit();
});

