import express from 'express';
import cors from 'cors';
import validateEnv from './utils/validate.env';
import { env } from './config/env.config';
import ocrRoutes from "./routes/uploadRoute";

const app = express();

validateEnv();

app.use(
    cors({
        origin: env.CLIENT_URL,
    })
);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api', ocrRoutes);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});