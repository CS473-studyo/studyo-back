<p align="center">
<img src="https://github.com/CS473-studyo/studyo-front/blob/develop/public/Logo.png" width="40%"/>
<br/>
<img src="https://img.shields.io/badge/node-12.16.1-brightgreen" />
</p>
<p>This project is for the Milestone 4: High-Fi Prototype of <b>KAIST CS473 Introduction to Social Computing</b>.<p/>

# studyo-back
Start studyo-back with:
```
npm start
```

## database
Database consists of 3 folder : ./migrations, ./models, ./seeders



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
- [Node.js](https://nodejs.org)
- [MySQL](https://www.mysql.com)
