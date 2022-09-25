require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const path = require('path');

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
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
app.use(
  '/api/recipe-image',
  express.static(path.join(__dirname, '/uploads/recipes/'))
);


// Router Basic
app.use(`/api`, require('./routes/auth.routes'));
app.use(`/api`, require('./routes/user.routes'));
app.use(`/api`, require('./routes/recipe.routes'));
app.use(`/api`, require('./routes/notice.routes'));
app.use(`/api`, require('./routes/category.routes'));
app.use(`/api`, require('./routes/forum.routes'));
app.use(`/api`, require('./routes/products.routes'));
app.use(`/api`, require('./routes/comment.routes'));
app.use(`/api`, require('./routes/map.routes'));

app.get('/', (req, res, next) => {
    res.send('Api running');
  });

// archivos estáticos
// app.use(express.static('uploads'));


// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

