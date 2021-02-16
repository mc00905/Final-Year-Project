import rateLimit from 'express-rate-limit';

const windowMs = 900000 // 15 mins in ms;
const max = 100 // max requests per unit time - low value for testing
const message = `Rate limit exceeded`;
const headers = true; // add X-RateLimit (and related) headers

export const rateLimiter = rateLimit({
    windowMs, max, message, headers
})