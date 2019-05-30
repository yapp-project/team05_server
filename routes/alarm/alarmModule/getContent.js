module.exports = function(result,row){
    if(Object.keys(row).length > 0){
    for(var i = 0; i < Object.keys(result).length; i++){
        for(var j = 0; j < Object.keys(row).length; j++){
            if(result[i].meetId == row[j].meetId){
                result[i].content = result[i].nick+ '님이 모임을 취소했어요. "' + row[j].cancel +'"';
                delete result[i].nick;
            }
        }
    }
    for(var i = 0; i < Object.keys(result).length; i++){
        if(result[i].isEnded == 1&& result[i].flag == 1)
            result[i].content = "모임이 마감되었어요.모임 정보를 확인하세요";
        else if(result[i].isEnded == 0 && result[i].flag == 1)
            result[i].content = "모임인원이 다 찼어요!";
    }
}
else{
    for(var i = 0; i < Object.keys(result).length; i++){
        if(result[i].isEnded == 1&& result[i].flag == 1)
            result[i].content = "모임이 마감되었어요.모임 정보를 확인하세요";
        else if(result[i].isEnded == 0 && result[i].flag == 1)
            result[i].content = "모임인원이 다 찼어요!";
    }
}
    return result;
}