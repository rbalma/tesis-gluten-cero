import { PORT } from "./config/config.js";
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import userRoute from './routes/user.routes.js';
import recipeRoute from './routes/recipe.routes.js';
import noticeRoute from './routes/notice.routes.js';
import categoryRoute from './routes/category.routes.js';
import forumRoute from './routes/forum.routes.js';
import productRoute from './routes/products.routes.js';
import commentRoute from './routes/comment.routes.js';
import mapRoute from './routes/map.routes.js';
import donationRoute from './routes/donations.routes.js';


import __dirname from './dirnamePath.js'

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// static files
app.use(
  '/api/user-avatar',
  express.static(path.join(__dirname, '/uploads/avatar/'))
);
app.use(
  '/api/notice-image',
  express.static(path.join(__dirname, '/uploads/notices/'))
);

// Router Basic
app.use(`/api`, authRouter);
app.use(`/api`, userRoute);
app.use(`/api`, recipeRoute);
app.use(`/api`, noticeRoute);
app.use(`/api`, categoryRoute);
app.use(`/api`, forumRoute);
app.use(`/api`, productRoute);
app.use(`/api`, commentRoute);
app.use(`/api`, mapRoute);
app.use(`/api`, donationRoute);

app.get('/', (req, res, next) => {
    res.send('Api running');
  });

// archivos estáticos
// app.use(express.static('uploads'));


// Error Handler
app.use(errorHandler);

const port = PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

