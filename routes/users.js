const express = require('express')
const routerUser = express.Router()
const fs = require("fs")

const userJson = require('../user.json')

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.route('/profile')
    .get((req, res) => {
        res.json(userJson)
    })

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
routerUser.route('/login')
  .post((req, res) => {
    const user = req.body

    const { username, password } = user

    let name = userJson.username
    let pass = userJson.password

    if(username === name && password === pass){
        res.json({
            status: true,
            message: "User Is valid"
        })
    }
    else if (username !== name){
        res.json({
            status: false,
            message: "User Name is invalid"
        })
    }
    else if (password !== pass){
        res.json({
            status: false,
            message: "Password is invalid"
        })
    }
  });

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.route("/logout/:username")
    .get((req,res) => {
        let username = req.params.username
        res.send(`<b>${username} successfully logout.<b>`)
    });

module.exports = routerUser;