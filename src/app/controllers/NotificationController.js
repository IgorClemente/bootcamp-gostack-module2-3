import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const { userID } = req;

    const checkIsProvider = await User.findOne({
      where: { id: userID, provider: true }
    });

    if (!checkIsProvider) {
      res.status(401).json({ error: 'Only provider can load notifications' });
    }

    const notification = await Notification.find({
      user: userID
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    res.json(notification);
  }

  async update(req, res) {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        read: true
      },
      { new: true }
    );

    res.json(notification);
  }
}

export default new NotificationController();
