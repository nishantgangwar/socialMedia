const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: { type: String, trim: true, trim: true, required: true },
  hashed_password: { type: String, required: true },
  salt: String,
  created: { type: Date, default: Date.now },
  updated: Date,
});

// virtual Field

userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable for called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encrypt a password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
        return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
