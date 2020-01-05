import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] }
      ]
    });

    if (!user) {
      res.status(401).json({ error: 'User does not exists' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Invalid password' });
    }

    const { id, name, avatar, provider } = user;

    res.json({
      user: {
        id,
        name,
        email,
        avatar,
        provider
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expires
      })
    });
  }
}

export default new SessionController();
