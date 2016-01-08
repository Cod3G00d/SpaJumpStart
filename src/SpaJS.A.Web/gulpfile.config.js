'use strict';
var GulpConfig = (function () {
    function gulpConfig() {

        this.bowerDir = './bower_components';
        this.targetViewsDir = './Views/Home/Index.cshtml';
    }

    return gulpConfig;
})();
module.exports = GulpConfig;
