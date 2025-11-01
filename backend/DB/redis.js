import { createClient } from "redis";

const redisClient =  createClient();

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("Redis Client Connected");
    } catch (error) {
        console.error("Redis Client Connection Error", error);
    }
}
connectRedis(); 

export default redisClient;