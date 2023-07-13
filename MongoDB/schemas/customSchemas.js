const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String, // String is shorthand for {type: String}
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },

  //callback doesn't work
  findCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};

//static methods
todoSchema.statics = {
  findByWord: function () {
    return this.find({ title: /mongoose/i });
  },
};

//query helper
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ description: new RegExp(language, "i") }); //new RegExp object used for dynamic value
  },
};

module.exports = todoSchema;
