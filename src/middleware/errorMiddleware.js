export default function notFound(req, res) {
    const error = new Error(`Not Found - ${req.url}`);
    res.status(404).json({ message: error.message });
  }
  
  export default function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
  