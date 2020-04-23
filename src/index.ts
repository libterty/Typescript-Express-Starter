import * as express from 'express';
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('hello World!');
});

app.listen(port, () => console.log(`Server is runnning on port: ${port}`));
