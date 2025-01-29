import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import pool from '../config/db.js';


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

});