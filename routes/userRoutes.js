const UserController = require('../controllers/UserController.js');
module.exports = (app) => {
    app.group("/users", (router) => {
        router.post("/login", UserController.login);
        router.post("/register", UserController.register);
    });
}