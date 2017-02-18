module.exports = function (app) {
    let controller = app.controllers.index;

    app.route('/')
        .get(controller.getRoute);
};
