import * as express from 'express'
import * as cors from 'cors'

import "reflect-metadata";
import {createConnection} from "typeorm";

//import authRouter from "./components/auth/router";

import * as dbConfig from "../ormconfig"

const PORT = 5050

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

   // app.use('/auth', authRouter)

    app.listen(PORT)
    console.log(`App is running on port ${PORT}...`)
})
