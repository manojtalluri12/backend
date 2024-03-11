const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require('./model')
const cors=require('cors')
const app = express();

mongoose
  .connect(
    "mongodb+srv://manojkumarcse123:DGQeSSAjcXwAKZw8@cluster0.l7tuz8c.mongodb.net/"
  )
  .then(() => {
    console.log("db connected");
  });
app.use(express.json());
app.use(cors({
    origin:"*"
}))
app.post("/addtask", async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new TaskSchema({
      todo: todo,
    });
    await newData.save();
    return res.json(await TaskSchema.find());
  } catch (error) {
    console.log(error);
  }
});
app.get('/gettask',async(req,res)=>{
    try {
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error);
    }
})

app.patch('/edit/:id',async(req,res)=>{
  const {todo}=req.body
  try {
    await TaskSchema.findByIdAndUpdate(req.params.id,{todo})
    return res.json(await TaskSchema.find())
  } catch (error) {
    console.log(error);
  }
})
app.listen("5000", () => {
  console.log("server is starting.....");
});
