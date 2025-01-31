import passport from 'passport';
import LocalStrategy from 'passport-local';
import bycrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import pool from './db.js';

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
    },
    
    asyncHandler(async (username, password, done) => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return done(null, false, { message: 'Incorrect username or password.'});
        }

        const user = result.rows[0];

        const match = await bycrypt.compare(password, user.password);
        if(!match) {
            return done(null, false, { message: 'Incorrect username or password.'});
        }

        return done(null, user);
    })
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(asyncHandler(async (id, done) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length > 0) {
        done(null, result.rows[0]);
    } else {
        done(new Error('User not found'), null);
    }
}));

export default passport;