import mongoose from 'mongoose';

const rateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  count: { type: Number, required: true },
  expireAt: { type: Date, required: true },
});

rateLimitSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit = mongoose.model('RateLimit', rateLimitSchema);

export default RateLimit;
