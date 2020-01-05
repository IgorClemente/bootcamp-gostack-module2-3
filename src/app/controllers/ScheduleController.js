import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: { id: req.userID, provider: true }
    });

    if (!checkProvider) {
      res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userID,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
        }
      },
      order: ['date'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    res.json(appointments);
  }
}

export default new ScheduleController();
