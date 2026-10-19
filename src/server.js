import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/prisma.js';

let server;
try {
  await connectDatabase();
  server = app.listen(env.port, () => {
    console.log(`API running at http://localhost:${env.port}`);
  });
} catch (error) {
  console.error('Startup failed. Check MySQL and DATABASE_URL:', error.message);
  await disconnectDatabase();
  process.exit(1);
}

async function shutdown(signal) {
  console.log(`${signal}: shutting down`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
