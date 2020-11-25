const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const defaultAxiosOptions = {
  method: 'GET',
  responseType: 'stream',
};

async function downloadFile(url, targetPath, filename, options = {}) {
  const { data, headers } = await axios({
    ...defaultAxiosOptions,
    ...options,
    url,
  });

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  const writer = fs.createWriteStream(path.join(targetPath, filename), { mode: 0o755 });

  return [data, headers, writer];
}

module.exports = downloadFile;
