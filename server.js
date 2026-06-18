import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from /public
app.use(express.static(path.join(__dirname, "public")));

// Data-driven portfolio. Add your real artwork here.
const portfolio = [
  { id: 1, title: "Golden Hour", medium: "Acrylic on canvas", year: 2025, img: "https://picsum.photos/seed/art1/800/1000" },
  { id: 2, title: "Static Bloom", medium: "Digital illustration", year: 2025, img: "https://picsum.photos/seed/art2/800/1000" },
  { id: 3, title: "Quiet Noise", medium: "Charcoal study", year: 2024, img: "https://picsum.photos/seed/art3/800/1000" },
  { id: 4, title: "Neon Folklore", medium: "Mixed media", year: 2024, img: "https://picsum.photos/seed/art4/800/1000" },
  { id: 5, title: "Tidewater", medium: "Watercolor", year: 2023, img: "https://picsum.photos/seed/art5/800/1000" },
  { id: 6, title: "Afterglow", medium: "Oil on panel", year: 2023, img: "https://picsum.photos/seed/art6/800/1000" }
];

app.get("/api/portfolio", (req, res) => res.json(portfolio));

app.listen(PORT, () => console.log(`Creator profile running at http://localhost:${PORT}`));
