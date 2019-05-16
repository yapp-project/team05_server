module.exports = function(clientToken,meetname){
    var push_data = {
        to: clientToken,
            notification: {
                title : "심모 : 모임장",
                body : meetname+" 모임에 참여인원이 다 찼어요.",
                sound : "default",
                click_action : "FCM_PLUGIN_ACTIVITY",
                icon: "fcm_push_icon"
            },
            priority: "high",
            restricted_package_name:"com.yapp14th.yappapp",
        };
    return push_data;
}