
import { createExpressServer } from 'routing-controllers';
import Container from 'typedi';
import dotenv from 'dotenv';
import { AuthenticationController } from './controllers/AuthenticationController';
import { mongoClient } from './database/mongoose';
import verifyToken from './middleware/Authentication';


const PORT = 4000;
console.info(`Starting server on http://localhost:${PORT}`);

mongoClient(process.env.MONGO_URL)
const routes = [AuthenticationController];
const app = createExpressServer(
    {
        controllers: routes,
        cors: {
            origin: '*', // (note: do not use this in production)
        }
    }
);

app.listen(PORT);