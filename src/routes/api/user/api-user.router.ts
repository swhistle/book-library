import { Router } from 'express';
import passport from 'passport';

import { UserModel } from '../../../models/user/user.model';
import { Request } from 'express-serve-static-core';

const router = Router();

router.get('/login', (req, res) => {
    res.send('login');
});

router.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/api/user/login',
        },
    ),
    (req, res) => {
        console.log('req.user: ', req.user);
        res.redirect('/')
    });

router.post('/signup',
    async (req: Request, res) => {
        if (req.isAuthenticated()) {
            if (req.session) {
                return res.redirect('/');
            }
        }

        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400);
            res.send('Bad request');
            return;
        }

        const user = await UserModel.findOne({username: username});

        if (user) {
            res.status(409);
            res.send('A user with this username exists!');
            return;
        }

        const newUser = new UserModel({username, password});

        try {
            await newUser.save();

            res.status(201);
            res.send(`You are registered successfully! Your username: ${username}`);
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', (req: Request, res, next) => {
        console.log('req.isAuthenticated()', req.isAuthenticated());
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if (req.session) {
                // @ts-ignore
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.redirect('/api/user/login');
        }
        next();
    },
    (req, res) => {
        res.send(`user: ${req.user}`);
    });

export default router;