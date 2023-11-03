const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionSchema = new Schema(
  {
    id: { type: Number, required: [true, "ID number is required"] },
    title: { type: String, required: [true, "title is required"] },
    sport: { type: String, required: [true, "sport is required"] },
    catagory: { type: Number, required: [true, "title is required"] },
    host: { type: String, required: [true, "host is required"] },
    contact: { type: String, required: [true, "email is required"] },
    details: { type: String, required: [true, "Details are required"] },
    where: { type: String, required: [true, "Location is required"] },
    when: { type: Date, required: [true, "Date is required"] },
    start: { type: Schema.Types.Mixed, required: [true, "Date is required"] },
    end: { type: Schema.Types.Mixed, required: [true, "Date is required"] },
    image: { type: String },
  },
  { timestamps: true }
);

// Collection name is connections in the database
module.exports = mongoose.model("Connection", connectionSchema);
