This project is for the Milestone 4: High-Fi Prototype of **KAIST CS473 Introduction to Social Computing**.

# studyo-back
Start studyo-back with:
```
npm start
```

## database
migrations

models

seeders

## routes
In routes, there are routers that communicate with front end by request. For example, in ./user/index.js,   

    const Router = require('koa-router');
    const user = new Router();
    const userCtrl = require('./user');
    
    user.post('/register', userCtrl.register);
    user.post('/login', userCtrl.login);
    ...


module.exports = user;
  


## Tools We've Used
* Node.js
* MySQL
