const axios = require("axios");

// Configuration
const ONE_SIGNAL_APP_ID = "c8d38c85-d908-46a7-b874-9063a017a32f"; // Replace with your OneSignal App ID
const ONE_SIGNAL_API_KEY = "ODUzOGVlMTgtYjE4Ni00MGJkLWFiYTMtZDUwZDAzZDM3OWMz"; // Replace with your OneSignal REST API Key

// Axios request configuration
const config = {
  headers: {
    Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
    "Content-Type": "application/json",
  },
};
const sendNotification = async (notifications) => {
  try {
    for (const notificationData of notifications) {
      const notification = {
        app_id: ONE_SIGNAL_APP_ID, // Optional if initialized in headers, but good practice to include it here
        contents: { en: notificationData.contents }, // Message content
        headings: { en: notificationData.title }, // Optional: Title of the notification
        //included_segments: ["6bd69aa3-49ac-4b93-aae9-5da362a16107"], // Target audience (e.g., 'All', 'Active Users', 'Subscribed Users')
        include_player_ids: notificationData.users,
        //url: "https://example.com", // Optional: URL to open when notification is clicked
        data: {
          key: notificationData.key,
          notificationId: notificationData.notificationId,
          // studentId: notificationData.studentId,
        }, // Optional: Custom data to send with the notification
        //ios_badgeType: "Increase", // Optional: Badge increment (only for iOS)
        //ios_badgeCount: 1, // Optional: Badge count (only for iOS)
        //android_accent_color: "#FF0000", // Optional: Accent color for Android
        //android_sound: "notification_sound.mp3", // Optional: Custom sound for Android
        // Additional fields can be added as needed
      };

      // Sending the notification
      axios
        .post(
          "https://onesignal.com/api/v1/notifications",
          notification,
          config
        )
        .then((response) => {
          console.log("Notification sent successfully:", response.data);
        })
        .catch((error) => {
          console.error(
            "Error sending notification:",
            error.response ? error.response.data : error.message
          );
        });
    }
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};

module.exports = {
  sendNotification,
};
