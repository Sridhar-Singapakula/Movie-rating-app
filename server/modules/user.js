const mongoose=  require("mongoose")
const Joi =require("joi")
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const userSchema= new mongoose.Schema({
     firstName:{type:String ,required:true,},
     secondName:{type:String ,required:true,},
     email:{type:String ,required:true,},
     Password:{type:String ,required:true,}
})
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "xhtdtfygugu", {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate= (data) => {
   const schema=Joi.object({
      firstName:Joi.string().required().label("first Name"),
      secondName:Joi.string().required().label("second Name"),
      email:Joi.string().email().required().label("Email"),
      Password: passwordComplexity().required().label("Password"),
   });
   return schema.validate(data);
};

module.exports={User,validate};