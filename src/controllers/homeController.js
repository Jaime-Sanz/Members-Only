import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import pool from '../config/db.js';
import { validationResult } from 'express-validator';


export const getHomepage = asyncHandler(async (req, res) => {
    res.render('home')
});

//renders sign up panel for user
export const getSignUp = asyncHandler(async (req, res) => {
    res.render('signup');
});

//handles user login ui and login logic
export const getLogin = asyncHandler(async (req, res) => {
    res.render('login');
});

//handles user sign up request
export const postSignUp = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
        "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4) RETURNING *",
        [full_name, username, hashedPassword, "basic"]
    );

    res.redirect('/login');
});