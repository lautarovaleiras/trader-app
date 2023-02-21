import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection} from 'typeorm';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes'

const PORT = process.env.PORT || 3000;
const app = express();
createConnection();

// middlewares

app.use(cors());
app.use(morgan('dev'));

// para poder interperetar los datos que vienen al servidor en formato json
app.use(express.json());

// routes

app.use(userRoutes);
app.use(authRoutes);
app.use(accountRoutes);

app.listen(3000);
console.log('Server on Port', PORT); 