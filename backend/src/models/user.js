const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["Admin", "HR", "Manager", "Employee"],
    default: "Employee",
  },
  profileImage: { type: String },

  // Employment Details
  employeeId: { type: String, unique: true }, // Custom ID (e.g., "EMP-001")
  department: {
    type: String,
    enum: ["IT", "HR", "Finance", "Operations", "Marketing"],
  },
  position: { type: String }, // e.g., "Software Engineer"
  hireDate: { type: Date },
  reportsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Manager reference
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Intern"],
  },
  status: {
    type: String,
    enum: ["Active", "On Leave", "Terminated"],
    default: "Active",
  },

  // Personal Details
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  contactNumber: { type: String },
  emergencyContact: {
    name: { type: String },
    relationship: { type: String },
    phone: { type: String },
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },

  // Work Schedule & Leave
  workSchedule: {
    startTime: { type: String }, // e.g., "09:00 AM"
    endTime: { type: String }, // e.g., "05:00 PM"
    timeZone: { type: String }, // e.g., "UTC+5:30"
  },
  leaveBalance: {
    annual: { type: Number, default: 12 }, // Days
    sick: { type: Number, default: 6 },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

// Auto-update 'updatedAt' on save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
