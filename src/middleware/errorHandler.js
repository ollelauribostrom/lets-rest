export default (
  { status = 500, message = 'Something went wrong!' },
  req,
  res,
  next,
) => res.status(status).json({ message });
