import mongoose from "mongoose";

const connectionDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/Expense-Tracker")
    .then(() => {
      console.log("mongoDB is connected");
    })
    .catch((e) => {
      console.log("DB is not connected");
    });
}

export default connectionDB;
