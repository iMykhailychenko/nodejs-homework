const errorWrapper = func => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    res.status(err.message === 'Not found' ? 404 : 500).send({
      massage: err.message || 'Internal error',
    });
  }
};

export default errorWrapper;
