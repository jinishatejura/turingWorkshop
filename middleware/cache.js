const cache = {};
const TTL = 60 * 1000; // 1 minute in milliseconds

// Middleware: serve from cache on GET requests, set X-Cache header
function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;
  const entry = cache[key];

  if (entry) {
    const age = Date.now() - entry.createdAt;
    if (age < TTL) {
      res.set("X-Cache", "HIT");
      return res.json(entry.data);
    }
    // Expired — delete stale entry
    delete cache[key];
  }

  // MISS — let the request continue to the controller
  res.set("X-Cache", "MISS");
  next();
}

// Middleware: invalidate entire cache after successful POST/PUT/PATCH/DELETE
function invalidateCache(req, res, next) {
  const original = res.json.bind(res);

  res.json = function (body) {
    // Only invalidate on success status codes
    if (res.statusCode >= 200 && res.statusCode < 300) {
      Object.keys(cache).forEach((key) => delete cache[key]);
    }
    return original(body);
  };

  next();
}

// Helper used by controllers to store data in the cache
function setCache(key, data) {
  cache[key] = {
    data,
    createdAt: Date.now(),
  };
}

module.exports = { cacheMiddleware, invalidateCache, setCache };
