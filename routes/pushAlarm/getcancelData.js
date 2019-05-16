module.exports = function(clientToken,meetcaptain,cancel){
    var push_data = {
        registration_ids: clientToken,
                
            notification: {
                title : "심모",
                body : meetcaptain + " 님이 모임을 취소했어요." + "\n이유 : " + cancel,
                sound : "default",
                click_action : "FCM_PLUGIN_ACTIVITY",
                icon: "fcm_push_icon"
            },
            priority: "high",
            restricted_package_name:"com.yapp14th.yappapp",
        };
    return push_data;
}