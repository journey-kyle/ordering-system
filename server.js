require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conn = require('mysql2').createPool({
        host:process.env.DB_URL,
        user:process.env.DB_ID,
        password:process.env.DB_PW,
        database:process.env.DB_NAME
    }
)

app.use(express.json());

var cors = require('cors');
var parser = require('xml2json');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(cors());

app.listen(process.env.PORT, function(error, result, field){
    if(error) console.log(error)
    else{
        console.log(parser);
        console.log("Listen on port : " + process.env.PORT);
        console.log(process.env.DB_URL);
        console.log(process.env.DB_ID);
        console.log(process.env.DB_PW);
        console.log(process.env.DB_NAME);
        console.log('result : ' + field);
    }
});

app.post('/dupleCompanyNo', (요청, 응답)=>{

    console.log(요청.body.CR_NUM)
    var sql = `SELECT * FROM COMPANY_INFO WHERE CR_NUM = '${요청.body.CR_NUM}';`
    console.log(sql)
    conn.query(sql, function (에러, 결과, 필드) {
        if (에러) {
            응답.send(에러.sqlMessage)
            return console.log(에러)
        }else{
            if(!결과.length) {
                응답.send(결과)
                console.log(결과);
            }
            else {
                응답.send(결과)
                console.log(결과);
            }
        }
        
    })
})