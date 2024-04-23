const { get_kmz_response, download } = require("./util");
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function download_txt_from_kmz(kmz_path, txt_path) {
  try {
    const data = await get_kmz_response(kmz_path);
    const downloadable = data.match(/display[/]convert.*txt/i);
    if (!downloadable) throw new Error('Fail to fetch resource');
    const href = "https://www.gpsvisualizer.com/" + downloadable;
    await download(href, txt_path)
    console.log(`Saved ${txt_path}`)
  }
  catch (e) {
    console.error(`kmz_path: ${kmz_path}\ntxt_path: ${txt_path}\nerror: ${e}`);
  }
}

async function main() {
  const kmz_dir = process.env.KMZ_FILES_DIRECTORY;
  const output_dir = process.env.OUTPUT_DIRECTORY;

  if (!fs.existsSync(kmz_dir))
    throw new Error("Directory doesn't exist");
  if (!fs.existsSync(output_dir))
    fs.mkdirSync(output_dir);

  const files = fs.readdirSync(kmz_dir);

  for (let file of files) {
    if (file.endsWith(".kmz")) {
      const kmz_path = path.resolve(kmz_dir, file);
      const txt_path = path.resolve(output_dir, file.slice(0, -3) + "txt");

      await download_txt_from_kmz(kmz_path, txt_path)
    }
  }
}

main();