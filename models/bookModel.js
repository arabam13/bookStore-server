import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    grade: { type: Number, required: true, minmum: 0, maximum: 5 },
  },
  {
    timestamps: true,
  }
);

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [ratingSchema],
    averageRating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", bookSchema);
export default BookModel;
