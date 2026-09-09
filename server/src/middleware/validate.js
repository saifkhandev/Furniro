import { z } from 'zod';

// General validation helpers
export const validate = (schema) => async (req, res, next) => {
  try {
    // Combine body, params, query based on schema definitions
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    // Attach parsed values to req for downstream use
    if (parsed.body) req.validatedBody = parsed.body;
    if (parsed.params) req.validatedParams = parsed.params;
    if (parsed.query) req.validatedQuery = parsed.query;

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

export default validate;