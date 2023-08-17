const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  time_stamp: String,
  author: String,
  description: String,
  content: String,
  cover_image_src: String,
  photo_credit: String
})

const Plan = new Schema({
  plan_name: String,
  description: String,
  price: String,
  features: Array,
  icon_url: String
})

exports.BlogPost = mongoose.model("post", BlogPost);
exports.Plan = mongoose.model("plan", Plan);