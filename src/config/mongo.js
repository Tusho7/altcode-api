import mongoose from "mongoose";

const connectToMongo = () => {
  try {
    const connectionUrl = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/`;
    return mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default connectToMongo;
