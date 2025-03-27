
import express from 'express'
import { createBooking } from "../controller/booking.controller.js";
import checkAuth from '../middleware/authcheck.js';

const router = express.Router();

router.post("/",checkAuth, createBooking);

export default router;
