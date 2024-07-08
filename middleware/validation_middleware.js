//await schema.parseAsync(req.body) is the line where you use zod to validate the request body against the defined schema

// here, schema = signUpSchema, next=middleware
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    //console.log(error);
    const status = 400;
    //const message = "fill the input properly";
    //const ExtraDetails = err.errors[0].message;
    const message = err.errors[0].message;
    const extraDetails = "fill the input with correct informations";
    const error = { status, message, extraDetails };
    //res.status(400).json({ message });
    next(error);
  }
};

module.exports = validate;




