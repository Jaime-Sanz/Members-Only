import asyncHandler from "express-async-handler";
import pool from "../config/pool.js";
import bcrypt from "bcryptjs";

export const getHomePage = (req, res) => {
    res.render('homepage');
}

export const getLoginPage = (req, res) => {
    res.render('login');
}

export const getSignUpPage = (req, res) => {
    res.render('sign-up');
}

export const postSignUp = asyncHandler( async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.redirect('/login');
});