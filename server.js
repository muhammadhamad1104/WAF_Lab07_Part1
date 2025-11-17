// server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const rateLimitMiddleware = require('./middlewares/rateLimiter');
const logMiddleware = require('./middlewares/logger');

const useRemote = process.env.USE_REMOTE === 'true';
const mongoURI = useRemote ? process.env.MONGO_URI_REMORT : process.env.MONGO_URI_LOCAL;

const apiProductRoutes = require('./routes/api/productRoutes');
const viewProductPages = require('./routes/view/productPages');

const seedProducts = require('./seed/seedProducts');

const app = express();

// parsers for JSON & HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares (Task-6)
app.use(rateLimitMiddleware);
app.use(logMiddleware);  // writes logs.txt same as your Task-6 usage. :contentReference[oaicite:5]{index=5}

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// REST routes under /api
app.use('/api', apiProductRoutes);
// EJS pages
app.use('/', viewProductPages);

// boot
(async () => {
    await connectDB(mongoURI);
    await seedProducts(); // drop & reinsert dataset
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
});
})();
