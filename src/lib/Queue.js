import Bee from 'bee-queue';

import redisConfig from '../config/redis';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  add(queue, job) {
    this.queues[queue].bee.createJob(job).save();
  }

  process() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.failuredHandle).process(handle);
    });
  }

  failuredHandle(job, err) {
    console.log(`QUEUE ${job.queue.name} FAILED`, err);
  }
}

export default new Queue();
