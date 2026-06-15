import mongoose from 'mongoose';

const assignedUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Assigned user name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Assigned user phone is required'],
  },
  email: {
    type: String,
    required: [true, 'Assigned user email is required'],
  },
  date: {
    type: Date,
    required: [true, 'Assigned date is required'],
  },
}, { _id: false });

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Todo title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Todo description is required'],
    trim: true,
  },
  users: {
    type: [assignedUserSchema],
    validate: {
      validator: function (val) {
        return val.length >= 1 && val.length <= 4;
      },
      message: 'Assigned users must be between 1 and 4',
    },
    required: [true, 'Assigned users are required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner User reference (createdBy) is required'],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Todo', todoSchema);
