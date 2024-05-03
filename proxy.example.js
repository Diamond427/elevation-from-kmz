const { HttpsProxyAgent } = require("https-proxy-agent");

const proxys = [
  "http://14aabcc7d92df:96d00b8087@168.158.96.50:12323",
  "http://14a44adef9fa0:9c4adb320d@168.158.96.119:12323",
]

const httpsAgents = proxys.map(proxy => new HttpsProxyAgent(proxy))

module.exports = {
  proxys: proxys,
  httpAgents: httpsAgents,
  getRandomAgent: () => {
    return httpsAgents[Math.floor(Math.random() * httpsAgents.length)]
  }
}