const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const { test_txt_file } = require('./util');

require('dotenv').config();

async function test() {
  const txt_dir = process.env.OUTPUT_DIRECTORY;

  try {
    if (!fs.existsSync(txt_dir))
      throw new Error("Directory doesn't exist", txt_dir);

    const files = fs.readdirSync(txt_dir);
    let total = 0, passed = 0;

    for (let file of files) {
      if (file.endsWith(".txt")) {
        const txt_path = path.resolve(txt_dir, file);
        const result = await test_txt_file(txt_path);
        total++;
        if (result) {
          passed++;
          logger.info(`passed: ${txt_path}`)
        }
        else {
          logger.error(`failed: ${txt_path}`)
        }
      }
    }

    logger.info("\n----------------------------\n")
    logger.info(`${passed} files passed; total: ${total} files`)
  }
  catch (e) {
    logger.error(e);
  }
}

test();