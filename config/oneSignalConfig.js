const OneSignal = require("@onesignal/node-onesignal");
const user_key_provider = {
  getToken() {
    return "ZjkwYzM5MWEtMmU3Zi00Mzg0LTg1MDYtNjA1OTk4YmI5MGY3";
  },
};

const app_key_provider = {
  getToken() {
    return "ODUzOGVlMTgtYjE4Ni00MGJkLWFiYTMtZDUwZDAzZDM3OWMz";
  },
};

// configuration object
let configuration = OneSignal.createConfiguration({
  authMethods: {
    user_key: {
      tokenProvider: user_key_provider,
    },
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});

const oneSignalClient = new OneSignal.DefaultApi(configuration);

module.exports = oneSignalClient;
