const { validationResult } = require('express-validator');


const controller = {
    register: (req, res) =>{
        return res.render("cadastrar")
    },

    processRegister: (req, res) =>{
        const resultValidations = validationResult(req);

        if (resultValidations.errors.length > 0){
            return res.render("cadastrar", {
                errors: resultValidations.mapped(),
                oldData: req.body
            });    
        }

        return res.send("Ok, as validações passaram")
    },
}

module.exports = controller;
