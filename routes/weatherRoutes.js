const WeatherController = require('../controllers/WeatherController.js');
const authToken = require('../middleware/authToken.js');
module.exports = (app) => {
    app.group("/weathers", (router) => {
        router.get("/data", authToken, WeatherController.getData);
        router.get("/data/:id", authToken, WeatherController.getDataByStationId);
        router.post("/data", authToken, WeatherController.setData);
    });
}