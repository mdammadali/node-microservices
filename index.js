import app from "./src/app.js";
import databaseConnected from "./src/config/database.js";
import configs from "./src/config/index.js";

async function starter() {
    try {
        await databaseConnected();
        app.listen(configs.port, () => console.log(`API Gateway running on port ${configs.port}`));
    } catch (error) {
        console.error("Error starting the application:", error.message);
        process.exit(1);
    }
}
starter();

process.on('unhandledRejection', (reason, promise) => {
    //   logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optional: gracefully close server and exit process
    app.close(() => process.exit(1));
});
process.on('uncaughtException', (error) => {
    //   logger.error('Uncaught Exception:', error);
    // Optional: gracefully close server and exit process
    // app.close(() => process.exit(1));
});