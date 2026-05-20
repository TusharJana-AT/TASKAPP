export const validate=(schema)=>(req,res,next)=>{
    try {
        req.body=schema.parse(req.body)
        next()
    } catch (error) {
      
      if (error.name === "ZodError") {
      error.statusCode = 400;

      error.message = error.issues
        .map((err) => err.message)
        .join(", ");
    }

    return next(error);
    }
}