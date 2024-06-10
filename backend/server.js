require('dotenv').config()
const express =require('express')
const cors = require('cors')

const app =express()
const mongoose=require('mongoose')
const newsroutes = require('./routes/newsroutes')
const userRoutes = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})
app.use('/api/news',newsroutes) 


app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("connected to DB and Listening on port",process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})

app.get('/',(req,res)=>{
    res.json({msg : 'welcome to the app'});
})

const {GoogleGenerativeAI}=require('@google/generative-ai')

const genAI =new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

app.post('/gemini', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
        history: req.body.history
    }); 
    const msg = req.body.message;

    try {
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        console.error("Error sending message to Generative AI:", error);
        res.status(500).send("Internal Server Error");
    }
});
