const service = require('./service')

module.exports = {
  api: async (ctx, next) => {
    // api
    ctx.body = await service.api(ctx)
  },
  error: async (ctx, next) => {
    // error 404 page
    ctx.body = '<h1>404 not found!</h1>'
  }
}
