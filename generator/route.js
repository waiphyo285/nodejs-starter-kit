/* start generator api */

const routes = require('./generator')

router
    .get('/routings', routes.index)
    .get('/routing/:id', routes.show)
    .get('/routing', routes.showBy)
    .post('/routing', routes.create)
    .put('/routing/:id', routes.update)
    .delete('/routing/:id', routes.delete)

/* end generator api */
