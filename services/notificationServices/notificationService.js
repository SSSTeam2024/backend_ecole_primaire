const OneSignal = require("@onesignal/node-onesignal");

const oneSignalClient = require("../../config/oneSignalConfig");

const user_key_provider = {
  getToken() {
    return process.env.ONESIGNAL_USER_AUTH_KEY;
  },
};

const app_key_provider = {
  getToken() {
    return process.env.ONESIGNAL_APP_AUTH_KEY;
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

const client = new OneSignal.DefaultApi(configuration);

const sendNotification = async (notificationData) => {
  try {
    const notification = new OneSignal.Notification();
    notification.app_id = process.env.ONESIGNAL_APP_ID;
    // notification.big_picture = image;

    notification.contents = {
      en: notificationData.body,
    };

    notification.priority = 5;

    // required for Huawei
    notification.headings = {
      en: notificationData.title,
    };

    // notification.included_segments = ["All"];
    notification.include_player_ids = ["1ee60f73-95d6-4a20-af09-206aad30f557"]; // subscription ids

    // notification.large_icon = image;
    // notification.small_icon = image;

    const result = await client.createNotification(notification);

    if (result)
      return {
        msg: "notification sent successfully",
        count: result.recipients,
      };
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};

module.exports = {
  sendNotification,
};