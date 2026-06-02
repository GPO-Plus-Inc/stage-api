const mongoose = require("mongoose");

const zohoConnectionSchema = new mongoose.Schema({

 organization_id:{
  type:mongoose.Schema.Types.ObjectId,
  required:true
 },

 client_id:String,
 client_secret:String,
 refresh_token:String,
 api_domain:String

},{timestamps:true});

module.exports = mongoose.model("zohoConnection",zohoConnectionSchema);