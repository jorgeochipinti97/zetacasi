import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 15 * 60, // Per 15 minutes
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip); // Consume 1 point per request
    next();
  } catch (rejRes) {
    res.status(429).json({ message: 'Has excedido el límite de solicitudes. Por favor, inténtalo de nuevo en 15 minutos.' });
  }
};

export default rateLimiterMiddleware;