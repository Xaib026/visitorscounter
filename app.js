const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 5000

const count = {
    count: 0
}

let countFromFile = 0

fs.readFile("count.json", {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        countFromFile = data
    } else {
        console.log(err);
    }
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/count.json")
})

app.get("/addCount",(req,res)=>{
    count.count += 1;
    fs.writeFile("count.json", JSON.stringify(count), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    res.send("Count Added")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})