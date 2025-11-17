//middlewares.rateLimiter.js
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    points: 10,
    duration: 60
});

const rateLimitMiddleware = (req, res, next) => {
    limiter.consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).json({error: 'Too Many Requests! Please try again later.'}));
};

module.exports = rateLimitMiddleware;