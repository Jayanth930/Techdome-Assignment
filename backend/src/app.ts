import express from "express";
import appRouter from "./services/appRouter"
import cors from "cors"
import "dotenv/config"


const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin : "*" ,
    methods : ["GET" , "PUT" , "POST" , "PATCH" , "DELETE"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}))


app.use("/api/v1",appRouter)


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})