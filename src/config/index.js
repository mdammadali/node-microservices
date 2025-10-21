import dotenv from 'dotenv';
dotenv.config();

const baseConfig = {
    port: process.env.PORT || 8080,
    mongoDBUri: 'mongodb://localhost:27017/microservices',
}
const configs = {
    ...baseConfig
}
export default configs