import express from "express";
import appRouter from "./services/appRouter"
import cors from "cors"
import "dotenv/config"


const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin : "*" ,
    methods : ["GET" , "PUT" , "POST" , "PATCH" , "DELETE"]
}))

app.get("/",(req,res)=>{
    res.send("Server is up and Running")
})
app.use("/api/v1",appRouter)


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})