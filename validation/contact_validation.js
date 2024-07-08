const { z } = require("zod");

const contactValidationSchema = z.object({
  username: z
    .string({ required_error: "username cannot be empty" })
    .trim()
    .min(3, { message: "username cannot be less than 3 characters" })
    .max(125, { message: "username cannot excede 125 characters" }),

  email: z
    .string({ required_error: "email cannot be empty" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email cannot be less than 3 characters" })
    .max(225, { message: "username cannot excede 225 characters" }),

  message: z
    .string({ required_error: "message is required" })
    .trim()
    .min(1, { message: "message is required" })
    .max(1024, { message: "username cannot excede 1024 characters" }),
});

module.exports = contactValidationSchema;
