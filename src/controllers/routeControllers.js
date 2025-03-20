import asyncHandler from "express-async-handler";
import pool from "../config/pool.js";
import bcrypt from "bcryptjs";

export const getHomePage = asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY timestamp DESC');
    

    res.render('homepage', {messages: rows });
});

export const getLoginPage = (req, res) => {
    res.render('login');
}

export const getCreateMessage = (req, res) => {
    res.render('create-message');
}

export const postCreateMessage = asyncHandler( async (req, res) => {
    const { post } = req.body;

    await pool.query('INSERT INTO messages (text) VALUES ($1)', [post]);
    
    res.redirect('/');
});

export const postSecretMessage = async (req, res) => {
    const { username } = req.user;
    const updateMember = true;

    await pool.query('UPDATE users SET is_member = $1 WHERE username = $2', [updateMember, username]);


    res.redirect('/');
}

export const getSignUpPage = (req, res) => {
    res.render('sign-up');
}

export const postLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

export const postSignUp = asyncHandler( async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.redirect('/login');
});