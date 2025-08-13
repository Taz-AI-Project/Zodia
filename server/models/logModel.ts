import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    userSign: {
      type: String,
      required: true,
    },
    userQuery: {
      type: String,
      required: true,
    },
    allQuoteRecommendations: [
      {
        type: String,
        required: true,
      },
    ],
    embedding: {
      type: String,
      required: true,
    },
    finalQuote: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Log', logSchema);
