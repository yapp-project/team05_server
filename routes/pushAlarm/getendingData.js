module.exports = function(clientToken,meetcaptain,meetname){
    var push_data = {
        registration_ids: clientToken,
                
            notification: {
                title : "심모",
                body : meetcaptain + " 님이 "+meetname +" 모임을 마감했어요.",
                sound : "default",
                click_action : "FCM_PLUGIN_ACTIVITY",
                icon: "fcm_push_icon"
            },
            priority: "high",
            restricted_package_name:"com.yapp14th.yappapp",
        };
    return push_data;
}
