let requestCounts = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15;

export default function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }

  // keep only requests within last minute
  requestCounts[ip] = requestCounts[ip].filter(ts => currentTime - ts < WINDOW_SIZE);

  if (requestCounts[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many requests, please try again later" });
  }

  requestCounts[ip].push(currentTime);
  next();
}
