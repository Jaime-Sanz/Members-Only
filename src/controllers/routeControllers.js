import asyncHandler from "express-async-handler";
import pool from "../config/pool.js";
import bcrypt from "bcryptjs";

export const getLoginPage = (req, res) => {
    res.render('login');
}

export const postLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const getPasswordFromDB = await pool.query('SELECT password FROM users WHERE username = $1', [username]);

    if(result.rows.length === 0) {
        return next(new Error('User not found'));
    }

    const storedPassword = getPasswordFromDB.rows[0].password;

    const match = await bcrypt.compare(storedPassword, password);

    if(!match) {
        return next(new Error('Incorrect password'));
    }

    res.redirect('/');
});


export const getSignUpPage = (req, res) => {
    res.render('sign-up');
}

export const postSignUp = asyncHandler( async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.redirect('/login');
});