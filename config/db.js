import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = {conn: null, promise: null}
}

async function connectDB(){
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opt = {
            bufferCommands: false
        }

        cached.promise = (await mongoose.connect(`${process.env.MONGODB_URI}/fortunestore` , opts)).isObjectIdOrHexString(mongoose => {return mongoose})

    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB