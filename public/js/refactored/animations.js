RosUI.animations = {
    init: function() {

    },

    loadPage: function() {
        console.log('animations page load');
        var blenderMessage, blinkMessage, treeMessage;

        blenderMessage = new ROSLIB.Message({data: 'Animations'});
        RosUI.ros.topics.cmdBlender.publish(blenderMessage);

        blinkMessage = new ROSLIB.Message({data: 'dmitry:stop'});
        RosUI.ros.topics.cmdBllink.publish(blinkMessage);

        treeMessage = new ROSLIB.Message({data: 'btree_off'});
        RosUI.ros.topics.cmdTree.publish(treeMessage);

        RoboInterface.set_expression("happy", 0);
        RoboInterface.pointHead({yaw: 0, pitch: 0, roll: 0});

        $('[data-cmd="stop"]').click();
    }
};