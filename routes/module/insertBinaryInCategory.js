module.exports = function(list){
    var lists = ["sports","activity","writing","study","exhibition","music","movie","diy","volunteer","picture","game","cooking","coffee","nail","car","interior","concert","etc"];
    var param = new Object();
    var count = 0;
    var key = new Array();
    for(var i = 0; i < list.length; i++){
        for(var j = 0; j < lists.length; j++){
                if(lists[j]== list[i]){
                    key[count] = j;
                    count = count + 1;
                }
        }
    }
    for(var i = 0; i < key.length; i++){
        for(var j = 0; j < lists.length; j++){
                if(key[i] == j){
                    param[lists[j]] = 1;
                }
                else if(param[lists[j]] != 1)
                    param[lists[j]] = 0;
                }
            }
            return param;
        }