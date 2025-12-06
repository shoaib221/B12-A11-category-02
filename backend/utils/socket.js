import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import multer from "multer";



export const app = express();
app.use(cors());
app.use(express.json());
app.use( express.static('uploads') );

export const server = http.createServer(app);
export const io = new Server( server, {
	cors: "http://localhost:3000"
} );


export const onlineUserMap = {  };
export const my_username="" ;

export const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); },
	filename: function (req, file, cb) {
		cb(null, 'profile-photo' + '-' + req.username+'.jpg'); }
});

export const multer_upload = multer({ storage: storage });

export const message_photo_upload = multer({ storage: multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/messages/'); },
	filename: function (req, file, cb) {
		cb(null,  Date.now()+'-'+file.originalname ); }


})  })

