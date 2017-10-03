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
import * as path from 'path'

const app = new Koa()

app.use(require('koa-nunjucks-2')({
  ext: 'njk',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))

app.use(require('koa-error')({
  engine: 'nunjucks',
  template: path.join(__dirname, 'views', 'error.njk')
}))
app.use(logger())

useContainerForRoute(Container)
useContainerForOrm(Container)

app.use(async (ctx, next) => {
  console.log(ctx.url)
  await next()
  console.log(ctx.url)
})

useKoaServer(app, {
  controllers: [`${__dirname}/controllers/*{js,ts}`],
  defaultErrorHandler: false
})

export const connection = database().then(async c => {
  return new Promise<(req: IncomingMessage, res: ServerResponse) => void>(resolve => {
    app.listen(config.port, () => {
      console.log(`[APP] Listen on ${config.port} in ${config.env} enviroment`)
      resolve(app.callback())
    })
  })
})
