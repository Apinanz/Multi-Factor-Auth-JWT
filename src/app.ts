
import { createExpressServer } from 'routing-controllers';
import Container from 'typedi';
import dotenv from 'dotenv';
import { AuthenticationController } from './controllers/AuthenticationController';

const PORT = 4000;
console.info(`Starting server on http://localhost:${PORT}`);
const routes = [AuthenticationController]; // To be changed soon

const app = createExpressServer(
    {
        controllers: routes,
        cors: {
            origin: '*', // (note: do not use this in production)
        }
    }
);

app.listen(PORT);