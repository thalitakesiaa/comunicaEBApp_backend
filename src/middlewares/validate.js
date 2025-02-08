const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      next(); // Continua para o próximo middleware/controller
    };
  };
  
  module.exports = validate;
  