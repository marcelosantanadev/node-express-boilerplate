module.exports = function (app) {
    let controller = {}
        , handleError = app.utils.handleError;


    controller.getRoute = function (req, res) {
        return res.render('index', {});
    };

    return controller;
};