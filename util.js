const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const readline = require("readline");

async function get_kmz_response(local_kmz_path) {
  let data = new FormData();
  data.append(
    "uploaded_file_1",
    fs.createReadStream(
      local_kmz_path
    )
  );
  data.append('units', 'metric');
  data.append('convert_format', 'text');
  data.append('remote_data', '');
  data.append('submitted', 'Convert & add elevation');
  data.append('convert_delimiter', 'tab');
  data.append('add_elevation', 'auto');
  data.append('profile_x', 'distance');
  data.append('profile_y', 'altitude');

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.gpsvisualizer.com/convert?output_elevation",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
    // proxy: proxys[0]
  };
  return await axios(config).then((d) => d.data);
}

async function download(source, path) {
  const ws = fs.createWriteStream(path);
  await axios({
    method: "get",
    url: source,
    responseType: "stream"
  }).then(res => res.data.pipe(ws))
}

async function test_txt_file(path) {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    return line.includes("altitude");
    // check only the first line
  }
}

module.exports = {
  get_kmz_response,
  download,
  test_txt_file
};
