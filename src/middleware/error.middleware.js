import multer from 'multer';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Request body must be valid JSON' });
  }
  if (err?.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ success: false, message: err.message });
  }
  if (err?.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }
  if (err?.code === 'P2002') {
    return res.status(409).json({ success: false, message: 'Duplicate record' });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal server error' });
}
