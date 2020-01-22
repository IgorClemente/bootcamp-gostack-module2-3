import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

import CreateAppointmentService from '../services/CreateAppointmentService';
import CancelAppointmentService from '../services/CancelAppointmentService';

import Cache from '../../lib/Cache';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const cachedKey = `user:${req.userID}:appointments:${page}`;
    const cached = await Cache.get(cachedKey);

    if (cached) {
      return res.json(cached);
    }

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userID,
        canceled_at: null
      },
      attributes: ['id', 'date', 'canceled_at', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path']
            }
          ]
        }
      ]
    });

    res.json(appointments);
  }

  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment = await CreateAppointmentService.run({
      user_id: req.userID,
      provider_id,
      date
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const { userID: user_id } = req;
    const { id: appointment_id } = req.params;

    const appointment = CancelAppointmentService.run({
      appointment_id,
      user_id
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
