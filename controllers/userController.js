const db=require("../config/db");
const bcrypt=require("bcrypt");

exports.getAll=(req,res)=>{

    db.query(
        "SELECT id,firstname,lastname,username FROM tbl_users",
        (err,result)=>{
            res.json(result);
        }
    );

}

exports.getById=(req,res)=>{

    db.query(
        "SELECT id,firstname,lastname,username FROM tbl_users WHERE id=?",
        [req.params.id],
        (err,result)=>{
            res.json(result[0]);
        }
    );

}

exports.create=async(req,res)=>{

    const{
        firstname,
        lastname,
        username,
        password
    }=req.body;
    console.log(req.body);
    const hash=await bcrypt.hash(password,10);

    db.query(
        "INSERT INTO tbl_users(firstname,lastname,username,password) VALUES(?,?,?,?)",
        [
            firstname,
            lastname,
            username,
            hash
        ],
        ()=>{
            res.json({
                message:"Created"
            });
        }
    );

}

exports.update=async(req,res)=>{

    const{
        firstname,
        lastname,
        username,
        password
    }=req.body;

    const hash=await bcrypt.hash(password,10);

    db.query(
        "UPDATE tbl_users SET firstname=?,lastname=?,username=?,password=? WHERE id=?",
        [
            firstname,
            lastname,
            username,
            hash,
            req.params.id
        ],
        ()=>{
            res.json({
                message:"Updated"
            });
        }
    );

}

exports.remove=(req,res)=>{

    db.query(
        "DELETE FROM tbl_users WHERE id=?",
        [req.params.id],
        ()=>{
            res.json({
                message:"Deleted"
            });
        }
    );

}