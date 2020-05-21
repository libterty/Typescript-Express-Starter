import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
const app: express.Application = express();
const port: number | string = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.send('hello World!');
});

app.listen(port, () => console.log(`Server is runnning on port: ${port}`));
