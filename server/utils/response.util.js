
const production = process.env.NODE_ENV === 'prod';

const response = async (res, returnResponse) => {

  let { statusCode, message, data, count, error } = returnResponse;

  // Check if the response status code indicates an internal server error
  if (statusCode === 500) {
    console.error(error);
    
  }

  if (statusCode === 400 && error) {
    // In production, hide specific error messages and show a generic message
    if (production) message = 'Bad request';
  }

  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
    count,
    error,
  });
};

export { response };
