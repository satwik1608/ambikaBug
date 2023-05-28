const Room = require('../model/room');
const mongoose = require('mongoose');
//get all rooms 
const getallrooms = async(req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 }) //newest come first;

        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
//post a room
const createroom = async(req, res) => {
        try {
            const { name, maxcount, phonenumber, rentperday, url1, url2, url3, type, description } = req.body;
            const imageurl = [url1, url2, url3];
            const currentbooking = [];
            const newroom = await Room.create({ name, maxcount, phonenumber, rentperday, imageurl, currentbooking, type, description });
            res.status(200).json(newroom);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }

    }
    //get a roomdetail
const getroomdetail = async(req, res) => {
        try {
            const id = req.params.id;
            const roomdetail = await Room.findById(id);
            res.status(200).json(roomdetail);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    //update a room
const updateroom = async(req, res) => {
    const id = req.params.id;
    const hotel = await Room.findById(id);
    const c = hotel.maxcount - 1;
    const room = await Room.findByIdAndUpdate(id, { maxcount: c }, {
        new: true
    });
    res.status(200).json(room);
}
module.exports = { getallrooms, createroom, getroomdetail, updateroom }