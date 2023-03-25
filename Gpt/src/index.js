const { response } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// COPY FROM OPEN AIimport { Configuration, OpenAIApi } from "openai";
const { Configuration ,OpenAIApi } = require("openai");
const OPENAI_API_KEY = "Enter you API key here ";
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

 

// openai.listEngines().then(response=>{
//     console.log(response);
// })

// Express ka json middle ware 
app.use(express.json());

app.get('/demo',(req,res)=>{
    res.json({
        message: "pong",
    });
})

app.post("/chat",(req,res)=>{
    const question = req.body.question;

    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      }).then((response)=>{
        console.log(response);
        return response?.data?.choices?.[0]?.text;
      })
      .then((answer) =>{
        console.log({answer});
        const array = answer?.split("\n").filter((value)=>value)
        .map((value) => value.trim());

        return array; 
      })
      .then((answer)=>{
        res.json({
            answer:answer,
            prompt: question,
        })

        console.log({question});
      })
      ;
    
    // console.log({
    //     question       
    // });
    // res.json({
    //     answer : "pong",
    //     question,
    // });
});

app.listen(3000,(req,res)=>{
    console,console.log("App listens on port no 3000");
})
