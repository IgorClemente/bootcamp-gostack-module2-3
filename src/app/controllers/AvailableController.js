import AvailableService from '../services/AvailableService';

import Cache from '../../lib/Cache';

class AvailableController {
  async index(req, res) {
    const cached = await Cache.get('providers');

    if (cached) {
      return res.json(cached);
    }

    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const available = await AvailableService.run({
      date: searchDate,
      provider_id: req.params.providerId
    });

    await Cache.set('providers', available);

    return res.json(available);
  }
}

export default new AvailableController();
