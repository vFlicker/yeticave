import Joi from 'joi';

const imageSchema = Joi.object({
  size: Joi.number()
    .max(5 * 1024 * 1024)
    .messages({ 'number.max': 'Maximum file size is 5 MB' })
    .label('image'),
  mimetype: Joi.string()
    .valid('image/jpeg', 'image/png')
    .messages({ 'any.only': 'Acceptable image types: JPEG, PNG' })
    .label('image'),
})
  .required()
  .messages({ 'any.required': 'Image is a required' });

export const newLotSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(1).required(),
  step: Joi.number().min(1).required(),
  endDate: Joi.date().iso().greater('now'),
  image: imageSchema,
});
