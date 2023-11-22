/// register
const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("INSIDE REGISTER FUNCTION");
  const { username, email, password } = req.body;
  //check already existing user-findOne().since its sa funvtion
  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      res.status(406).json("user already exists... please login");
    } else {
      // register user
      const newUser = new users({
        username,
        email,
        password,
        image: "",
        github: "",
        linkedin: "",
      });

      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`error transcation failed!!:${err}`);
  }
};

// login

exports.login = async (req, res) => {
  console.log("inside login function");
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // token
      const token = jwt.sign({userId:existingUser._id},"SecretKey123")
      res.status(200).json({ existingUser,role:"user", token});
    } else {
      res.status(404).json("Incorrect email/password");
    }
  } catch (error) {
    res.status(401).json(`error transcation failed!!:${error}`);
  }
};

// profile Update
exports.updateProfile=async(req,res)=>{
  const profileImage = req.files.filename
  const {username, email, password,github,linkedin} =req.body
  const userId= req.payload
  try {
    
    const updatingUser = await users.findByIdAndUpdate({_id:userId},{
      username,email, password,profileImage,github,linkedin
    },{new:true})
    res.status(200).json(updatingUser);

  } catch (error) {
    res.status(401).json(error);

  }
}
