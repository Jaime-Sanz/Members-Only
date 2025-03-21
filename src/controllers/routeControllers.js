import asyncHandler from "express-async-handler";
import pool from "../config/pool.js";
import bcrypt from "bcryptjs";

export const getHomePage = asyncHandler(async (req, res) => {
    const { rows } = await pool.query("SELECT messages.id, messages.text, users.username, TO_CHAR(messages.timestamp, 'MM/DD/YYYY HH12:MI AM') AS timestamp FROM messages JOIN users ON messages.user_id = users.id ORDER BY timestamp DESC");
    

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
    const { id } = req.user;

    await pool.query('INSERT INTO messages (text, user_id) VALUES ($1, $2)', [post, id]);
    
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