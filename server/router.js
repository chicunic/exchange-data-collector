const router = require('koa-router')()
const controller = require('./controller')

module.exports = (app) => {
  router.get('/api', controller.api)

  router.get('/*', controller.error)

  app.use(router.routes())
    .use(router.allowedMethods())
}
