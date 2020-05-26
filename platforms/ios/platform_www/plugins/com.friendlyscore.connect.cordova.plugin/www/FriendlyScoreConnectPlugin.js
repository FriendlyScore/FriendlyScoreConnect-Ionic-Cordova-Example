cordova.define("com.friendlyscore.connect.cordova.plugin.FriendlyScoreConnectPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.startFriendlyScoreConnect = function (arg0, success, error) {
    exec(success, error, 'FriendlyScoreConnectPlugin', 'startFriendlyScoreConnect', [arg0]);
};

});
