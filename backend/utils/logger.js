export default function logger(req, res, next) {
  console.log({
    method: req.method,
    path: `${req.host}${req.originalUrl}`,
    statusCode: res.statusCode,
    time: new Date().toLocaleString(),
    parameters: req.params,
    query: req.query,
  });

  next();
}
 