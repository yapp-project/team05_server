module.exports = function(key,connection,meetId){
    var word = key.split('#');
    console.log(word);
    var keywordBinary = new Array();
    var sqlquery = "select keyword from keywordnums where keyword = '" ;
    for(var i = 1; i < word.length; i++){
        if(i == word.length-1)
            sqlquery = sqlquery.concat(word[i] + "';");
        else
            sqlquery = sqlquery.concat(word[i] + "' or keyword = '");
    }
        console.log(sqlquery);
        connection.query(sqlquery, function(error,row,field){
            if(error)console.log(error);
            else{
                var sqlKeyword = require('./writesqlKeyword.js');
                var sql = sqlKeyword(row,word,meetId);
                if(sql.length > 1){
                    connection.query(sql[0],function(err,row,field){
                        if(err)console.log(err);
                        else{
                            connection.query(sql[1],function(err,row,field){
                                if(err)console.log(err);
                            });

                        }
                    });
                }
                else{
                    connection.query(sql[0],function(err,row,field){
                        if(err)console.log(err);
                    });
                }
            }
        });
}