module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getStation(res, mysql, context, complete) {
        mysql.pool.query("SELECT stationname, address, state, city, zipcode FROM stations", function (error, result, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.data = result;
            console.log(result);
            complete();
        });
    }

    

    return router;
}();