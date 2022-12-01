import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { randomBytes } from 'crypto'
import compression from 'compression'
import { MongoDBConnect } from './_core/MongoDB'
import config from './_core/config'
import cronparser from 'cron-parser'
import { CronJob } from "cron"
import { bootstrap } from './bootstrap'
import { HTTPFunction } from './HTTPFunction'


var v = JSON.parse(fs.readFileSync(path.join(__dirname, './local.settings.json'), 'utf8'))
process.env = {
    ...process.env,
    ...v
}

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(compression());
app.use("/static", express.static('_static', {
    maxAge: '7d'
}))

function HTTPTrigger(name: string, execueFunction: HTTPFunction) {
    var wrapFunction = async (req, res) => {
        // console.log(`${new Date().toISOString()}: ${req.method}: ${req.url}`)

        try {
            req.body = req.body || {}
            req.params = req.params || {}
            req.query = req.query || {}

            var result = await execueFunction(req)

            Object.keys(result.headers || {}).forEach(k => {
                res.setHeader(k, result.headers[k])
            })
            res.status(result.status || 200).send(result)
        }
        catch (ex) {
            console.error(ex)
            res.status(503).send({
                error: true,
                message: ex.toString(),
                errorData: ex,
                stack: ex.stack
            })
        }
    }
    var route = name;
    (route.match(/\{(.*?)\}/gi) || [])
        .forEach(v => {
            route = route.replace(v, `:${v.substring(1, v.length - 1)}`)
        })
    app.post(`/api/${route}`, wrapFunction)
    console.log(`POST: api/${route}`)
}

export async function main() {
    await Promise.all([
        MongoDBConnect()
    ])
        
    var folder = fs.readdirSync(path.join(__dirname, './api'))
        .filter(e => fs.lstatSync(path.join(__dirname, './api', e)).isDirectory())

        console.log(folder)
    for (var i = 0; i < folder.length; i++) {
        var fol = folder[i]
        var folPath = path.join(__dirname, './api', fol)
        if (fs.existsSync(path.join(folPath, 'index.ts')) || fs.existsSync(path.join(folPath, 'index.js'))) {
            var funcExe = require(path.join(folPath, 'index')).default

            if (!process.env[`${fol}.Disabled`]) {
                console.log(fol)

                HTTPTrigger(fol, funcExe)
            }
        }
    }
    await bootstrap()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()

process.on('uncaughtException', err => {
    console.error(Date.now(), '>> UncaughtException', err);
    // process.exit(1); // mandatory (as per the Node.js docs)
});
process.on('unhandledRejection', err => {
    console.error(Date.now(), '>> UnhandledRejection', err);
    // process.exit(1); // mandatory (as per the Node.js docs)
});