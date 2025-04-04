const validatePageFormat = (req, res, next) => {
  // If no page parameter is provided, ignore the page property
  if (!req.query.page) {
    req.page = null;
    return next();
  }

  const page = parseInt(req.query.page);

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ message: "Valid 'page' parameter required" });
  }

  req.page = page;
  next();
};

export default validatePageFormat;
