const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

async function get_kmz_response(local_kmz_path) {
  let data = new FormData();
  data.append(
    "uploaded_file_1",
    fs.createReadStream(
      local_kmz_path
    )
  );
  data.append("units", "metric");
  data.append("convert_format", "text");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.gpsvisualizer.com/convert?output_elevation",
    headers: {
      Cookie: "ip=188.43.253.77; ip_key=53077",
      ...data.getHeaders(),
    },
    data: data,
  };
  return await axios.request(config).then((d) => d.data);
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
