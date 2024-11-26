import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';
import servicesRouter from './routes/services.js';
import smsRouter from './routes/sms.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/sms', smsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});