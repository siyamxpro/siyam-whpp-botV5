/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

class Cache {
  constructor(defaultTTL = 60000) {
    this.data = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, value, ttl = this.defaultTTL) {
    this.data.set(key, {
      value,
      expiresAt: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.data.get(key);

    if (!item) return undefined;

    if (Date.now() > item.expiresAt) {
      this.data.delete(key);
      return undefined;
    }

    return item.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    return this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }
}

module.exports = Cache;
