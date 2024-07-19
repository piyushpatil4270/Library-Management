const bodyParser = require("body-parser")
const express=require("express")
const http=require("http")
const cors=require("cors")
const Book=require("./models/Book")
const Return=require("./models/Return")

const sequelize=require("./utils/database")

const app=express()



const server=http.createServer(app)
app.use(bodyParser.json())
app.use(cors())
sequelize.sync()
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err))




app.get("/admin/returns",async(req,res,next)=>{
  const returns = await Return.findAll()
  res.json(returns)
})
app.post("/admin/createBook",async(req,res,next)=>{
    const {title}=req.body
    console.log(title)
    const createTime = new Date();
  
    const returnTime = new Date(createTime.getTime() + (60 * 60 * 1000));

    
    const newBook = await Book.create({
        title,
        issueTime:createTime,
        returnTime,
        fine: 0 
    });
    res.json(newBook);
})

app.get("/admin/books",async(req,res,next)=>{
  const books=await Book.findAll()
  res.json(books)
})


app.post("/admin/delete",async(req,res,next)=>{
  const id=req.body.id
  const book=await Book.findByPk(id)
  const returnTime = new Date()
  await Return.create({
    title:book.title,
    returnTime:returnTime,
    fine:book.fine
  })
  await Book.destroy({
    where: {
        id: id
    }
})
res.json("Book deleted successfully")
})


async function updateFines() {
    try {
      const books = await Book.findAll();
      const currentTime = new Date();
  
      books.forEach(async (book) => {
        const createTime = new Date(book.issueTime);
        const hoursElapsed = Math.floor((currentTime - createTime) / (1000 * 60 * 60));
        const newFine = hoursElapsed * 100; 
        await book.update({ fine: newFine });
      });
    } catch (error) {
      console.error('Error updating fines:', error);
    }
  }
  
  setInterval(updateFines, 60 * 60 * 1000);

server.listen(5500,()=>console.log("Server started on port 5500"))