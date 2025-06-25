import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/qr.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "qr.html"));
});

// QR generation as image (SVG stream)
app.get("/generate-qr", (req, res) => {
  const text = req.query.data;
  if (!text) {
    return res.status(400).send("No data provided");
  }

  try {
    const qr_svg = qr.image(text, { type: 'svg' });
    res.type('svg');
    qr_svg.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate QR code.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
