import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Dimensions, AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WIDTH = width;
export const HEIGHT = height;
export const themeColor = "#40006e";

const NOTIFICATION_KEY = "Flashcards:Notifications";

export const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
}

const notificationObj = () => {
  return {
    title: "Reminder for study!",
    body: "Hey! Don't forget to study with flashcards today.",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export const clearLocalNotifications = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export const setLocalNotification = async () => {
  const dataRaw = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const data = JSON.parse(dataRaw);

  if (data === null) {
    const permissionsNotifications = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    if (permissionsNotifications.status === "granted") {
      Notifications.cancelAllScheduledNotificationsAsync();

      // App will notify user every evening 6 pm if the user has not attempted the quiz
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18);
      tomorrow.setMinutes(0);

      const seconds = Math.round(Math.abs(tomorrow - new Date()) / 1000);

      Notifications.scheduleNotificationAsync({
        content: {
          ...notificationObj()
        },
        trigger: {
          seconds: seconds,
          repeats: true,
        },
      });

      // Scheduling notifications only comes when app is in background mode
      // Testing schedule a notification 5 seconds from now
      // Notifications.scheduleNotificationAsync({
      //   content: {
      //     ...notificationObj()
      //   },
      //   trigger: { 
      //     seconds: 5, repeats: true 
      //   },
      // });

      // Testing immediately
      // Notifications.presentNotificationAsync(notificationObj());

      AsyncStorage.setItem(
        NOTIFICATION_KEY,
        JSON.stringify(true)
      );
    }
  }
}