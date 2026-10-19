export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
}
