const Joi = require("joi");

const userSchema = Joi.object({
  lastname: Joi.string().max(45).required(),
  firstname: Joi.string().max(45).required(),
  email: Joi.string().email().max(254).required(),
  password: Joi.string().max(254).required(),
  serviceId: Joi.number().integer().allow(null),
  admin: Joi.number().integer().max(1).required(),
});

const validateUser = (req, res, next) => {
  const { lastname, firstname, email, password, serviceId, admin } = req.body;
  const { error } = userSchema.validate(
    { lastname, firstname, email, password, serviceId, admin },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
};
