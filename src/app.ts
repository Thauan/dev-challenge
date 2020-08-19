import express, { Application } from 'express'
import cors from 'cors'
import routes from './routes'
import LoggerMiddleware from './middlewares/logger';
import bodyParser from 'body-parser'

const app: Application = express();

app.use(LoggerMiddleware);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

export default app;