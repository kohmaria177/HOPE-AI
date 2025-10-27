import { MatchResult } from '../types';

// This is a simulation. In a real app, this would interact with a backend service
// to schedule and send messages via the LINE Messaging API.
const sendLineReminder = (scholarshipName: string, message: string) => {
  console.log(`[LINE NOTIFICATION SIMULATION]
> Scholarship: ${scholarshipName}
> Message: ${message}
-----------------------------------`);
};

export const scheduleLineReminders = (results: MatchResult[]): void => {
  console.log("Scheduling LINE deadline reminders...");

  results.forEach(scholarship => {
    const deadline = new Date(scholarship.deadline);
    const now = new Date();

    // Reminder 3 days before
    const reminder3Days = new Date(deadline);
    reminder3Days.setDate(deadline.getDate() - 3);

    if (reminder3Days > now) {
      const message = `奨学金「${scholarship.name}」の申請締切が3日後（${scholarship.deadline}）に迫っています。準備は進んでいますか？`;
      // In a real app, you would schedule this with a cron job or a service like AWS Lambda + EventBridge.
      // For this simulation, we'll just log it after a short delay to simulate an async call.
      setTimeout(() => sendLineReminder(scholarship.name, message), 1000);
    }

    // Reminder 1 day before
    const reminder1Day = new Date(deadline);
    reminder1Day.setDate(deadline.getDate() - 1);

    if (reminder1Day > now) {
      const message = `【最終リマインダー】奨学金「${scholarship.name}」の申請締切は明日（${scholarship.deadline}）です！書類の提出を忘れないようにしましょう。`;
      setTimeout(() => sendLineReminder(scholarship.name, message), 1500);
    }
  });
};
