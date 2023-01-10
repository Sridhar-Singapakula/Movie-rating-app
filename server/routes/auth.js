const router=require("express").Router();
const Joi = require("joi")
const bcrypt = require("bcrypt");
const { User } = require("../modules/user");


router.post("/", async (req,res)=>{
    try {
        const {error} =validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        
        const user = await User.findOne({email:req.body.email});
        if(!user)
            return res.status(400).send({message:"user does not exists"});
        const validPassword= await bcrypt.compare(req.body.Password,user.Password);
        if(!validPassword){
            return res.status(400).send({ message: "Invalid Email or Password" });
        }
        const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
        
    } catch (error) {
        res.status(500).send("Internal Server error")
    }
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		Password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports=router