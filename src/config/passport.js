import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from './pool.js';

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT id, username, password, is_member FROM users WHERE username = $1", [username]);
        const user = rows[0];

        if(!user) {
            return done(null, false, { message: "User not found"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return done(null, false, { message: 'Incorrect password'});
        }

        const sanitizedUser = {
          id: user.id,
          username: user.username,
          is_member: user.is_member
        }

        return done(null, sanitizedUser);
      } catch(err) {
        return done(err);
      }
    })
  );

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

export default passport;