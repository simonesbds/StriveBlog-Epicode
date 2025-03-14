
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Author from './models/Author.js';
import jwt from 'jsonwebtoken';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Author.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new Author({
            nome: profile.name.givenName,
            cognome: profile.name.familyName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          });
          await user.save();
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((obj, done) => done(null, obj));
passport.deserializeUser((obj, done) => done(null, obj));
