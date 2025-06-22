const ngrok = require("ngrok");
const dotenv = require("dotenv");

dotenv.config({ path: ".development.env" });
if (!process.env.NGROK_AUTH_TOKEN) {
  console.error("❌ NGROK_AUTH_TOKEN is required in .development.env");
  process.exit(1);
}
const PORT = process.env.PORT || 3000;

(async function () {
  try {
    const url = await ngrok.connect({
      addr: PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN, // You'll need to add this to your .development.env
    });

    console.log("🚀 Ngrok tunnel is running!");
    console.log("📡 Forwarding:", url);
    console.log("🔗 Use this URL for webhook testing");

    // Keep the process running
    process.on("SIGINT", async () => {
      await ngrok.kill();
      process.exit();
    });
  } catch (err) {
    console.error("❌ Error starting ngrok:", err);
    process.exit(1);
  }
})();
