var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer');
const fs = require ('fs')
const { check } = require('express-validator');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() +'.jpg')
    }
})

const uploadFile = multer({ storage })


const validations = [
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





//Formulário do registo
router.get('/cadastrar', userController.register);

//Processar o registro
router.post('/acaoCadastrar', uploadFile.single('avatar'), validations, userController.processRegister);



module.exports = router;



