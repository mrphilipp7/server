import { app } from "./app";
import http from "http";
import { connectDB } from "./config/db.config";
import { logger } from "./lib/utils/logger.utils";

const httpServer = http.createServer(app);

//-----MongoDB connection & Express startup-----//

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(8080, () => {
      console.log(`listening on http://localhost:8080 `);
      console.log(`+-------------------------+`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    logger.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
