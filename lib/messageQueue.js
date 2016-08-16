(() => {
'use strict';

  class MessageQueue {

    constructor(kue) {
      this.queue = kue.createQueue();
    }

    on(jobName, handler) {
      this.queue.process(jobName, (job, done) => {
        handler(job.data).then(done);
      });
    }

    push(jobName, data) {
      this.queue.create(jobName, data).save();
    }
  }

  module.exports = function getMessageQueue(kue) {
    return new MessageQueue(kue);
  }

})();
