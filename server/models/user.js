const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");


// refresh token for re auth in session.

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});


// users

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  userName: {
    type: String
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  refreshToken: {
    type: [Session],
  },
});



//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
