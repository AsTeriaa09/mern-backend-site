const errorMiddleware = (err, req, res, next) => {
  const Status = err.status || 500;
  const message = err.message || "backend error";
  const ExtraDetails = err.extraDetails || "backend error";

  return res.status(Status).json({ message ,ExtraDetails});
};

module.exports = errorMiddleware;
