import asyncHandler from 'express-async-handler';


export const getHomepage = asyncHandler(async (req, res) => {
    res.render('home')
});

export const getSignUp = asyncHandler(async (req, res) => {
    res.render('signup');
})

export const getLogin = asyncHandler(async (req, res) => {
    res.render('login');
})