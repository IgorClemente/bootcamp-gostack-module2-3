import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fail' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(401).json({ error: 'Use already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
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

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fail' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userID);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({ error: 'Use already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { name, avatar } = await User.findByPk(req.userID, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    });
    console.log('FORM BODY', name, avatar, req.userID, email);
    return res.json({
      id: req.userID,
      email,
      name,
      avatar
    });
  }
}

export default new UserController();
