const Joi = require("joi");

const userSchema = Joi.object({
  lastname: Joi.string().max(45).required(),
  firstname: Joi.string().max(45).required(),
  email: Joi.string().email().max(254).required(),
  password: Joi.string().max(254).required(),
  serviceId: Joi.number().integer().allow(null),
  admin: Joi.number().integer().max(1).required(),
});

const decisionSchema = Joi.object({
  title: Joi.string().min(5).max(250).message("Title is required").required(),
  description: Joi.string()
    .min(1)
    .message("Description is required")
    .required(),
  context: Joi.string().min(1).required(),
  utility: Joi.string().min(1).required(),
  pros: Joi.string().min(1).required(),
  cons: Joi.string().min(1).required(),
  impacted: Joi.array().min(0),
  experts: Joi.array().min(0),
  firstDate: Joi.date().required(),
  dateOpinion: Joi.date().required(),
  dateFirstDecision: Joi.date().required(),
  dateEndConflict: Joi.date().required(),
  dateFinaleDecision: Joi.date().required(),
});

const validateUser = (req, res, next) => {
  const { lastname, firstname, email, password, serviceId, admin } = req.body;

  const { error } = decisionSchema.validate(
    { lastname, firstname, email, password, serviceId, admin },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateDecision = (req, res, next) => {
  const { decision } = req.body;

  const { error } = userSchema.validate({ decision }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
  validateDecision,
};
