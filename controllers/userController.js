const { validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { findUserByField } = require('../models/User');
const fs = require ('fs')

let findUserByEmail = function (email){
    let todosUsuarios = this.getUsers();
    let userFoundTeste = todosUsuarios.find( oneUser => oneUser.email === email );
    return userFoundTeste;
}

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

        let userExists = User.findUserByField("email", req.body.email);
        
        if (userExists){
            return res.render("cadastrar", {
                errors: {
                    email:{
                        msg: "Este email já está sendo utilizado"
                    }
                },
                oldData: req.body
            });

        }

        let userToCreate = {
            ...req.body,
            psw: bcrypt.hashSync(req.body.psw, 10),
            avatar: req.file.filename

        }
        
        let userCreated = User.create(userToCreate);

        return res.redirect("logar")
    },

    profile:(req, res) => {
        return res.render("profile")
    },

    login: (req, res) => {
        return res.render("logar")
    },

    
    loginProcess: (req, res) =>{

        let userToLogin = User.findUserByField('email', req.body.email);

        if(findUserByEmail === (req.body.email)) {
            return res.send("Email está ok")
        }

        return res.send(req.body)
        
    },
    
}

module.exports = controller;
