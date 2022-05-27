const { check, validationResult } = require('express-validator/check');
module.exports = function (app, model, controller) {
    
    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validator/index')(model);
    
    /*Start: MLM routing*/
    app.get('/',  controller.mlm.view);
    app.get('/getMlm',  controller.mlm.getMlm);
    app.get('/add', controller.mlm.add);
    app.post('/checkDuplicate',  controller.mlm.checkDuplicate);
    app.post('/saveMlm', validation.admin.addMlm, middleware.admin.email, controller.mlm.save);
    app.get('/edit/:id', controller.mlm.edit);
    app.post('/updateMlm/:id', validation.admin.addMlm,controller.mlm.update);
    app.get('/delete/:id',  controller.mlm.delete);
   
    
   } 