import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

import pt from 'date-fns/locale/pt';
import Notification from '../schemas/Notification';

import { isBefore, parseISO, startOfHour, format, subHours } from 'date-fns';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
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
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate invalid' });
    }

    const { provider_id, date } = req.body;

    const checkProvider = User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!checkProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with provider' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permitted' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date
      }
    });

    if (checkAvailability) {
      return res
        .status(401)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userID,
      provider_id,
      date
    });

    const user = await User.findByPk(req.userID);

    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const { userID } = req;
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      where: { canceled_at: null },
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    if (!appointment) {
      res.status(401).json({ error: 'sdds' });
    }

    if (appointment.user_id !== userID) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment"
      });
    }

    const dateSub = subHours(appointment.date, 2);

    if (isBefore(dateSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance'
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
