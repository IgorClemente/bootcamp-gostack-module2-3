import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
      avatar_id: Yup.number().integer()
    });

    await schema.validate(req.body, { abortEarly: false });

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validate invalid', messages: err.inner });
  }
};
