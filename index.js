const express = require("express");
const app = express();
const port =8080 ;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));


app.listen(port,()=>{
    console.log("listening to port 8080");
}); 



let posts=[
    {
        id :uuidv4(),
        username:"lapu",
        content :"hii i ma new in webdev "
    },

     {
        id :uuidv4(),
        username:"sony",
        content :"i complet my internship "
    },

     {
         id :uuidv4(),
        username:"adam",
        content :" i want to know about marine engineering "
    },

     {
        id :uuidv4(),
        username:"rohit",
        content :" i want to hit sixes "
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{    
   res.render("new.ejs");
});    

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content} =req.body ;
    let id =uuidv4();
    posts.push({id ,username,content});
    // res.send("post requesti send ")
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    // res.send("request working");
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    if(!post){
        res.render("error.ejs",{id});
    }else{
        res.render("show.ejs",{post});
    }
      
});

app.patch("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let Newcontent =req.body.content ; 
    let post = posts.find((p)=> id === p.id);
    post.content =Newcontent;
    console.log(post);
    console.log(Newcontent);
    // res.send("patch receved");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params ;
    let post = posts.find((p)=> id === p.id);
      res.render("edit.ejs",{post});
});

app.delete("/post/:id",(req,res)=>{
    let {id} =req.params ;
    // let post = posts.find((p)=> id === p.id);
    posts =posts.filter((p)=> id !==p.id);
    // res.send("delete success");
    res.redirect("/posts");
});