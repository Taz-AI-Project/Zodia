import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  id: { type: String, required: true },
  score: { type: Number },
  values: [{ type: Number }],
  sparseValues: [{ type: Number }],
  metadata: {
    content: {
      type: String,
      required: true,
    },
  },
});

const logSchema = new mongoose.Schema(
  {
    userZodiac: {
      type: String,
      required: true,
    },
    userQuery: {
      type: String,
      required: true,
    },
    pineconeQueryResult: [resultSchema],
    embedding: [{ type: Number, required: true }],
    quoteRecommendation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Log', logSchema);
