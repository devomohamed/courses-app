const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function validateEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Test the email against the regex pattern
        return emailRegex.test(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
