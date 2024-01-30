import mongoose from 'mongoose';
import natsClient from './nats-client';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI must be defined")
  }

  try {
    await natsClient.connect('ticketing', 'adfkj', 'http://nats-srv:4222')
    natsClient.client.on('close', () => {
      console.log("Shutting down NAT");
      process.exit();
    })
    process.on('SIGINT', () => natsClient.client.close());
    process.on('SIGTERM', () => natsClient.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
