const router = require('express').Router()
const clientRoutes =  require('./clientRoutes')
const api=  require('./api')

router.use('/api', api)
router.use('/', clientRoutes)

module.exports = router