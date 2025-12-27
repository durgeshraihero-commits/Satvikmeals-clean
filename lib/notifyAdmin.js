import axios from "axios";

export async function notifyAdmin(message) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.warn("Telegram env not configured");
      return;
    }

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }
    );
  } catch (err) {
    console.error("Telegram notify error:", err.message);
  }
}
