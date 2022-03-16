import * as express from 'express'
import * as cors from 'cors'
import * as session from "express-session";
import * as connectRedis from 'connect-redis'
import {createClient} from "redis";

import "reflect-metadata"
import {createConnection} from "typeorm";

//import authRouter from "./components/auth/router";
import * as dbConfig from "../ormconfig"
import authRouter from "./components/auth/router";

const PORT = 5050
const RedisStore = connectRedis(session)

createConnection(dbConfig.dbOptions).then(async () => {

    const app = express()

    const options: cors.CorsOptions = {
        allowedHeaders:[
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token'
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }

    app.use(express.json())
    app.use(cors(options))

    app.use(session({
        secret: process.env.SECRET_WORD,
        store: new RedisStore({client: createClient(6379, 'localhost')}),
        resave: false,
        saveUninitialized: false
        })
    )

    app.use('/auth', authRouter)

    app.listen(PORT)
    console.log(`App is running on port ${PORT}...`)
})
