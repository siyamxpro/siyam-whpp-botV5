
module.exports = {
  config: {
    name: "welcome",
    eventType: ["group-participants.update"],
    version: "1.0.0",
    author: "SIYAM",
    description: "Welcome new group members"
  },

  onStart: async ({ sock, id, participants, action, config }) => {
    try {
      if (action !== "add" || !participants?.length) return;

      const metadata = await sock.groupMetadata(id);
      const groupName = metadata.subject || "এই গ্রুপ";

      const botNumber = sock.user?.id?.split(":")[0]?.split("@")[0];

      for (const participant of participants) {
        const number = participant.split("@")[0];
        const isBot = number === botNumber;

        const text = isBot
          ? `আসসালামু আলাইকুম!\nআমি ${config?.botName || "WhatsApp Bot"}। আমাকে ${groupName} গ্রুপে যুক্ত করার জন্য ধন্যবাদ।\n\nকমান্ড দেখতে ${config?.prefix || ","}help লিখুন।`
          : `🎉 স্বাগতম!\n\n@${number}\nআপনাকে ${groupName} গ্রুপে স্বাগতম। ❤️\n\nগ্রুপের নিয়ম মেনে চলুন এবং সবার সঙ্গে ভালো আচরণ করুন।`;

        await sock.sendMessage(id, {
          text,
          mentions: [participant]
        });
      }
    } catch (error) {
      console.error("[WELCOME EVENT ERROR]", error);
    }
  }
};
