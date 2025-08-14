import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🌪️  Server is listening on port ${PORT}`);
});
