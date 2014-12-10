RosUI = {
    init: function() {
        // init rosbridge
        RosUI.ros.init(function() {
            // init navigation
            RosUI.navigation.init();

            RosUI.expressions.init();
            RosUI.motors.init();
            RosUI.animations.init();
            RosUI.interaction.init();

            init_interaction();
            init_motors();
        });
    },
    topics: {}
};

$(document).ready(function () {
    RosUI.init();
});
