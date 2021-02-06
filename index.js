var Express = require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
var {studentModel}=require("./model/student")
var app = Express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://megha:test123@cluster0.crp2x.mongodb.net/bookdb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.post('/addstudent',async(req,res)=>{
    try{
        var data=req.body;
        var studentData=new studentModel(data);
        var result = await studentData.save();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }
    

});
app.get("/viewall",async(req,res)=>{
    try{
        var result=await studentModel.find().exec();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)
    }
});
app.post("/search",async(req,res)=>{
    try{
        studentModel.find(req.body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.json(data)
            }
        })  
    }
    catch(error){
        res.status(500).send(error)
    }
});
app.post("/delete",async(req,res)=>{
    try{
        studentModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})
            }
        })

    }
    catch(error){
        res.status(500).send(error)
    }
});
app.post("/update",async(req,res)=>{
    try{
        studentModel.findByIdAndUpdate(req.body.id,
            {
                studentname:req.body.studentname,
                rollno:req.body.rollno,
                admissionno:req.body.admissionno,
                college:req.body.college
            },(error,data)=>{
                if(error){
                    throw error
                }
                else{
                    res.json({'status':'success'})
                }
            })
             }
    catch(error){
        res.status(500).send(error)
    }
})

app.listen(process.env.PORT || 3000,function(){
    console.log('Your node js server is running at http://localhost:3000')
});