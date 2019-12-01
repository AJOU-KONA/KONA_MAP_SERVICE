require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import koaBody from "koa-body";
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from "./lib/jwtMiddleware";
import createFakeData from "./createFakeData";
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { useUnifiedTopology:true, useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log('Connected to MongoDB');
        //createFakeData();
    })
    .catch(e => {
        console.error(e);
    });


const app = new Koa();

const router = new Router();

router.use('/api', api.routes());
app.use(koaBody({multipart: true}));
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());


const buildDirectory = path.resolve(__dirname, '../../map-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
    if(ctx.status === 404 && ctx.path.indexOf('/api') !== 0){
        await send(ctx, 'index.html', {root:buildDirectory});
    }
});

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
});
