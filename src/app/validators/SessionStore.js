import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.email().required(),
      password: Yup.password()
        .min(6)
        .required()
    });

    await schema.validate(req.body, { abortEarly: false });

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validate invalid', messages: err.inner });
  }
};
