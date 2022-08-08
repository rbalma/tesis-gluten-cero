require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect to database
connectDB();

const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Router Basic
app.use(`/api/v1`, require('./routers/auth'));
app.use(`/api/v1`, require("./routers/user"));
app.use(`/api/v1`, require("./routers/notice"));
app.use(`/api/v1`, require("./routers/recipe"));
app.use(`/api/v1`, require("./routers/category"));
app.use(`/api/v1`, require("./routers/forum"));
app.use(`/api/v1`, require('./routers/products'));
app.use(`/api/v1`, require('./routers/comment'));
app.use(`/api/v1`, require('./routers/map'));


// archivos estáticos
// app.use(express.static('uploads'));


// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

