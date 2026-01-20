const express = require("express");
const cors = require("cors");
require("dotenv").config();

const drive = require("./googleDrive");

const app = express();
app.use(cors());
app.use(express.json());

/* Health check – spinner ke liye */
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend connected" });
});

/* Google Drive files list */
app.get("/api/files", async (req, res) => {
  try {
    const response = await drive.files.list({
      pageSize: 50,
      fields: "files(id, name, mimeType, size)"
    });
    res.json(response.data.files);
  } catch (e) {
    res.status(500).json({ error: "Drive access failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running");
});
