/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const ProgressBar = require('progress');

async function getInstaller() {
  const { cwd, platform } = process;
  if (platform !== 'darwin') {
    return
  }

  const resourcesPath = path.resolve(cwd(), 'resources');

  const fusePkgUrl = `https://space-fuse-asset.s3-us-west-2.amazonaws.com/FUSE+for+macOS+3.11.0.pkg`;
  const { data, headers } = await axios({
    method: 'GET',
    responseType: 'stream',
    url: fusePkgUrl,
  }).catch((error) => {
    console.error(`\nError when trying to download the package: ${fusePkgUrl}`);
    console.error(`Error : ${error.stack || error.message}`);
    process.exit(1);
  });

  const totalLength = headers['content-length'];

  console.log(`Downloading Osx Fuse from ${fusePkgUrl}:`);
  const progressBar = new ProgressBar(`File: FUSE+for+macOS+3.11.0.pkg [:bar] :percent :etas`, {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength, 10),
  });

   if (!fs.existsSync(resourcesPath)) {
     fs.mkdirSync(resourcesPath);
   }
  // save to ./resources/
  const writer = fs.createWriteStream(path.join(resourcesPath, `FuseInstaller.pkg`), { mode: 0o755 });

  data.on('data', (chunk) => (
    progressBar.tick(chunk.length)
  ));

  data.on('error', (error) => {
    data.destroy();
    writer.destroy();

    console.error(`\nError when downloading the Fuse installer binary: ${error.stack || error.message}`);
    process.exit(1);
  });

  writer.on('finish', async () => {
    process.exit(0);
  });

  writer.on('error', (error) => {
    writer.destroy();

    console.error(`\nError when saving the Fuse installer: ${error.stack || error.message}`);
    process.exit(1);
  });

  data.pipe(writer);
}

getInstaller();
