const express = require("express")
const cors = require("cors")
const Redis = require("redis");
const axios = require("axios")





const app = express();

app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const redisClient = Redis.createClient(
);



app.get("/posts",async (req,res)=>{


    redisClient.get("posts",async (error,posts)=>{
        console.log("ok");
        if(error) console.log(error);
        if(posts != null){
           return res.json(JSON.parse(posts))
        }else{
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
        redisClient.setex("posts",3600 ,JSON.stringify(data))
        return res.json(data);
        }
        
    })
})







app.listen(3000,()=>{
    console.log("Server connect");
})