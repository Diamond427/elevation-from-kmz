const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const proxys = require('./proxy');

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

module.exports = {
  get_kmz_response,
  download
};
