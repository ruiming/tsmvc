import 'reflect-metadata'
import './utils/config'
import * as Koa from 'koa'
import { IncomingMessage, ServerResponse } from 'http'
import * as config from 'config'
import * as logger from 'koa-logger'
import { useKoaServer, useContainer as useContainerForRoute } from 'routing-controllers'
import { Container } from 'typedi'
import { useContainer as useContainerForOrm } from 'typeorm'
import { database } from './libraries/database'

const app = new Koa()

useContainerForRoute(Container)
useContainerForOrm(Container)

app.use(logger())

useKoaServer(app, {
  controllers: [`${__dirname}/controllers/*{js,ts}`]
})

export const connection = database().then(async c => {
  return new Promise<(req: IncomingMessage, res: ServerResponse) => void>(resolve => {
    app.listen(config.port, () => {
      console.log(`[APP] Listen on ${config.port} in ${config.env} enviroment`)
      resolve(app.callback())
    })
  })
})
