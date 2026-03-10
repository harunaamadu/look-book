import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

console.log("Connecting to:", process.env.TURSO_DATABASE_URL);

try {
  const result = await client.execute(
    "INSERT INTO HeroSlide (id, title, subtitle, image, link, \"order\") VALUES ('test1', 'Test', 'Sub', 'img.jpg', '/', 1)"
  );
  console.log("SUCCESS:", result);
} catch (e) {
  console.log("ERROR:", e.message);
}