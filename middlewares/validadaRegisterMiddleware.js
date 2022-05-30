const path = require('path');
const { check } = require('express-validator');

module.exports = [
    check('name').notEmpty().withMessage("Tem que escrever o nome!").bail().trim(),

    check('email').notEmpty().withMessage("Tem que escrever o email!").bail().isEmail().withMessage("Digite um formato de email correto").bail().normalizeEmail().bail().trim(),


    check('psw').notEmpty().withMessage("Tem que escrever a senha!").bail().isLength({ min: 6}).withMessage("A senha precisa ter 6 caracteres").bail().trim(),

    check('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg']

        if(!file) {
            throw new Error("Precisa escolher um arquivo")
        }
            
        return true;

    })
];