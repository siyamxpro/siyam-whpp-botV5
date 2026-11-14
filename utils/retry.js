/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

async function retry(fn, options = {}) {
  const retries = options.retries ?? 3;
  const delay = options.delay ?? 1000;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;

      if (attempt === retries) break;

      await new Promise(resolve =>
        setTimeout(resolve, delay * (attempt + 1))
      );
    }
  }

  throw lastError;
}

module.exports = retry;
