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
In routes, there are routers that communicate with front end by request. For example in ./user/index.js, router get front-end's post request "login", and implement login function in ./user/user.js.
    
./user/index.js
    const Router = require('koa-router');
    const user = new Router();
    const userCtrl = require('./user');
    
    user.post('/login', userCtrl.login);
    ...
    
    
./user/user.js
    ...
    exports.login = async (ctx) => {
      const { email, password } = ctx.request.body;
      ''' Implement Login '''
      ctx.status = 204;
    };
    ...



## Tools We've Used
* Node.js
* MySQL
