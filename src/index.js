import { configDotenv } from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/database/index.js";

configDotenv();

const connectServer = () => {
  app.listen(process.env.PORT, () =>
    console.log(
      ` ⚙️  Server is up at http://localhost:${process.env.PORT} ⚙️ \n`
    )
  );
};

try {
  await connectDB();
  connectServer();
} catch (error) {
  console.log("something went wrong in server connection");
}
