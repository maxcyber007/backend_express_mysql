const db=require("../config/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.login=(req,res)=>{

    const {username,password}=req.body;

    db.query(
        "SELECT * FROM tbl_users WHERE username=?",
        [username],
        async(err,result)=>{

            if(result.length==0){
                return res.status(401).json({
                    message:"Username incorrect"
                });
            }

            const user=result[0];

            const match=await bcrypt.compare(password,user.password);

            if(!match){

                return res.status(401).json({
                    message:"Password incorrect"
                });

            }

            const token=jwt.sign({

                id:user.id,
                username:user.username

            },process.env.JWT_SECRET,{expiresIn:"1d"});

            res.json({
                token
            });

        }
    );

}