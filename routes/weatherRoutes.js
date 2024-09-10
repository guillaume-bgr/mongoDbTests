const WeatherController = require('../controllers/WeatherController.js');
module.exports = (app) => {
    app.group("/weathers", (router) => {
        router.get("/data", WeatherController.getData);
        router.get("/data/:id", WeatherController.getDataByStationId);
        router.post("/data", WeatherController.setData);
    });
}