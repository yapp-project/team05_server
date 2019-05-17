module.exports = function(row,word,meetId){
    var keywordBinary = new Array();
    console.log("word "+ word + "row " + row);
    var sql = "UPDATE keywordnums SET keywordCount = keywordCount + 1 WHERE keyword = '";
    var query = "INSERT INTO keywordnums (keyword,keywordCount,fk_meet_Id) values ('";
    if(Object.keys(row).length != 0){
        for(var i = 0; i < Object.keys(row).length; i++){
            if(i == Object.keys(row).length -1)
                sql = sql.concat(row[i].keyword + "';");
            else
                sql = sql.concat(row[i].keyword +"' or keyword = '");
        }
        for(var i = 0; i < Object.keys(row).length; i++){
            for(var j = 1; j < word.length; j++){
                if(row[i].keyword == word[j])
                    keywordBinary[j] = 1;
                else if(keywordBinary[j] != 1 && row[i].keyword != word[j])
                    keywordBinary[j] = 0;
             }
        }
        for(var i = 1; i < word.length; i++){
            if(keywordBinary[i] == 0){
                if(i == word.length -1)
                    query = query.concat(word[i] + "',1,"+meetId+");");
                else
                    query = query.concat(word[i] + "',1,"+meetId+"),('");
            }
        }
        var sqlquery = new Array();
        sqlquery.push(query);
        sqlquery.push(sql);
    }
    else{
        for(var i = 1; i < word.length; i++){
            if(i == word.length -1)
                query = query.concat(word[i] + "',1,"+meetId+");");
            else
                query = query.concat(word[i] + "',1,"+meetId+"),('");
        }
        var sqlquery = new Array();
        sqlquery.push(query);
    }
    
    console.log(sqlquery);
    return sqlquery;

}