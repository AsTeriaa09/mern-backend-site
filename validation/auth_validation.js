const { z } = require("zod");

//creating an object schema for reg
const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username cannot be empty" })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(25, { message: "Username cannot excede 25 characters" }),

  email: z
    .string({ required_error: "Email cannot be empty" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must be atleast 3 characters long" })
    .max(255, { message: "email cannot excede 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(11, { message: "phone number must be atleast 11 characters" }),

  password: z
    .string({ required_error: "password cannot be empty" })
    .trim()
    .min(6, { message: "password must be atleast 6 characters" })
    .max(1024, { message: "password cannot excede 1024 characters" }),
});

//creating an object schema
const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be empty" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must be atleast 3 characters long" })
    .max(255, { message: "email cannot excede 255 characters" }),

  password: z
    .string({ required_error: "password cannot be empty" })
    .trim()
    .min(6, { message: "password must be atleast 6 characters" })
    .max(1024, { message: "password cannot excede 1024 characters" }),
});

module.exports = { signUpSchema, LoginSchema };


