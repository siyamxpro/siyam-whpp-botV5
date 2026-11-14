/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

class TaskQueue {
  constructor() {
    this.tasks = [];
    this.running = false;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running) return;

    this.running = true;

    while (this.tasks.length > 0) {
      const item = this.tasks.shift();

      try {
        const result = await item.task();
        item.resolve(result);
      } catch (error) {
        item.reject(error);
      }
    }

    this.running = false;
  }

  get size() {
    return this.tasks.length;
  }

  clear() {
    this.tasks = [];
  }
}

module.exports = TaskQueue;
