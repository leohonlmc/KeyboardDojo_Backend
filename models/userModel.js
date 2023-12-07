const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    // const auth = await bcrypt.compare(password, user.password);

    const auth = password === user.password;

    if (auth) {
      return user;
    }

    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", UserSchema);
