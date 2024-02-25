import mongoose from "mongoose";

export async function connect() {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } =
      process.env;

    const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

    // Recursive function to attempt connection with retry
    const connectWithRetry = () => {
      mongoose.connect(url);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB connected successfully");
      });

      connection.on("error", (err) => {
        console.error(
          "MongoDB connection error. Retrying connection in 5 seconds. Error: ",
          err
        );
        // Retry connection after 5 seconds
        setTimeout(connectWithRetry, 5000);
      });
    };

    // Initial connection attempt
    connectWithRetry();
  } catch (error) {
    console.error("Something goes wrong!");
    console.error(error);
  }
}
