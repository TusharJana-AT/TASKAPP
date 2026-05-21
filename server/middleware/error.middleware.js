import { messages } from "../messages/index.js";
import { response } from "../utils/response.util.js";

export const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  return response(res, {
    statusCode: err.statusCode || 500,
    message: err.message || messages.general.INTERNAL_SERVER_ERROR,
    error: err,
  });
};
