import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;