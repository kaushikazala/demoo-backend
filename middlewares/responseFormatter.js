// Response formatting middleware to standardize API output
export const responseFormatter = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    // If body already has the standard structure, bypass formatting
    if (
      body &&
      typeof body === 'object' &&
      'data' in body &&
      'status' in body &&
      'error' in body
    ) {
      return originalJson.call(this, body);
    }

    const statusCode = res.statusCode || 200;
    let formattedBody;

    if (statusCode >= 400) {
      // Error formatting
      let errorMsg = 'An error occurred';
      if (body) {
        if (body.error) {
          errorMsg = body.error;
        } else if (body.message) {
          errorMsg = body.message;
        } else if (typeof body === 'string') {
          errorMsg = body;
        } else {
          errorMsg = JSON.stringify(body);
        }
      }
      formattedBody = {
        data: null,
        status: statusCode,
        error: errorMsg,
      };
    } else {
      // Success formatting
      formattedBody = {
        data: body || {},
        status: statusCode,
        error: null,
      };
    }

    return originalJson.call(this, formattedBody);
  };

  next();
};

// Global asynchronous error handler
export const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  const statusCode = err.status || (res.statusCode >= 400 ? res.statusCode : 500);
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};
