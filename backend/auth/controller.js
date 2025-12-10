

import { User, Count } from "./model.js";
import express from "express";
import bcrypt from "bcrypt";
import validaor from "validator";
import jwt from "jsonwebtoken";
import { requireAdmin, requireAuth, requireAuthJWT } from "./middlewire.js";
import { oauth2Client } from "../utils/googleClient.js";
import axios from "axios";
import { multer_upload } from "../utils/socket.js";
import { error } from "console";

export const authRouter = express.Router();

authRouter.get("/test", (req, res, next) => {
    res.status(200).json({ "msg": "ok" });
    next();
});

const createToken = (_id, username) => {
    return jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

async function hashy(pass) {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(pass, salt);
    return hashpass;
}


function checkEmail(email) {
    if (!validaor.isEmail(email))
        throw Error("This is not a valid email");
    return true;
}


const Register = async (req, response, nect) => {

    const { email, password } = req.body;

    try {
        const exist = await User.findOne({ username: email });
        if (exist) throw Error("Email already exists");
        const hashedpassword = await hashy(password);
        const user = await User.create({ username: email, password: hashedpassword, photo: `http://localhost:4000/profile-photo-${email}.jpg` });
        const token = createToken(user._id);
        response.status(200).json({ email, token });
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


const Login = async (request, response, next) => {
    console.log("login");
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ username: email });
        if (!user) throw Error('Incorrect email');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw Error('Incorrect password');

        const token = createToken(user._id);
        response.status(200).json({ email, token });


    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

const Init = (req, res, next) => {
    res.status(200).json({ message: "OK" });
    console.log("backend init");
    next();
}

const GoogleLogin = async (req, res, next) => {
    console.log("google login");

    try {

        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name } = userRes.data;


        let user = await User.findOne({ username: email });
        const dummy = await hashy(process.env.DUMMY_PASS);
        if (!user) user = await User.create({ username: email, password: dummy, photo: `http://localhost:4000/profile-photo-${email}.jpg` });


        const token = createToken(user._id, user.username);

        res.status(200).json({ token, email });


    } catch (err) {
        console.log("there", new Date().toLocaleString());

        res.status(400).json({ error: err.message });
    }

}

const Profile = async (req, res, next) => {

    try {
        const response = await User.findOne({ username: req.username })
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const UpdateProfile = async (req, res, next) => {
    console.log('update profile');
    try {
        console.log(req.body);
        console.log(req.file);

        await User.updateOne({ username: req.username }, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        })

        const saved_user = await User.findOne({ username: req.username })

        res.status(200).json(saved_user)

    } catch (err) {
        res.status(400).json({ error: 'aha' })
    }
}


const FirebaseRegister = async (req, res, next) => {

    try {
        let user = req.body;
        const hashedpassword = await hashy("Aa12345678");
        let real_user = await User.findOne({ username: user.email });

        if (!real_user) {
            real_user = User({
                username: user.email,
                password: hashedpassword,
                name: user.displayName,
                photo: user.photoURL
            })
        }
        else {
            real_user.name = user.displayName;
            real_user.photo = user.photoURL;
        }


        await real_user.save();



        //console.dir(real_user)
        res.status(200).json({ user: real_user })

    } catch (err) {
        res.status(400).json({ error: err.message })
    } finally {
        console.log("firebase register")

    }
}

const VisitCount = async (req, res, next) => {

    try {
        let { name } = req.body
        let doc = await Count.findOne({ name })
        if (!doc) doc = Count({ name, count: 0 })
        doc.count++;
        doc = await doc.save();
        res.status(200).json({ count: doc.count })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const FetchUsers = async (req, res, next) => {
    console.log("fetch users")
    try {
        let users = await User.find({});
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const ChangeRole = async (req, res, next) => {

    try {
        let { username, role } = req.body
        let user = await User.findOne({ username })
        user.role = role;
        await user.save()
        res.status(200).json({ user })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


const DeleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ################################## routes    ############################


authRouter.post("/count", VisitCount)
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/google", GoogleLogin);
authRouter.post("/fb-register", requireAuth, FirebaseRegister);
authRouter.get("/users", requireAuth, requireAdmin, FetchUsers);
authRouter.post("/change-role", requireAuth, requireAdmin, ChangeRole)
authRouter.delete("/user/:id", requireAuth, requireAdmin, DeleteUser)



// authRouter.get( "/init", requireAuthJWT, Init );
// authRouter.get( "/profile", requireAuthJWT, Profile );
// authRouter.patch( "/profile", requireAuthJWT, multer_upload.single('photo'), UpdateProfile )


