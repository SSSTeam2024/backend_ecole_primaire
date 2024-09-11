const moment = require("moment-timezone");
const axios = require("axios");

const sendSms = async (users, msg) => {
  const timezone = "Africa/Tunis";
  const currentDateTime = moment().tz(timezone).format("DD/MM/YYYY HH:mm");
  const date = currentDateTime.substring(0, 10);
  const time = currentDateTime.substring(11, 16);
  const sender = "SLS Sousse";

  for (let user of users) {
    try {
      let url = `https://app.tunisiesms.tn/Api/Api.aspx?fct=sms&key=F8Y7759dYMdFgkAaUWbxStKLaD13r0kUZF4MROq1Q5TKj8kU7hmryp/-/RThej1BeSezb4M/-/sPX2SYYsDh7gy7A3hxbGBZVcaC&mobile=216${user.phone}&sms=${msg}&sender=${sender}&date=${date}&heure=${time}`;
      const response = await axios.get(url);
      console.log(`Response from ${url}:`, response.data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
  }
};

module.exports = {
  sendSms,
};
