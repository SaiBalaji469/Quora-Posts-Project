const { Console } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true}));

app.set("views" ,path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username: "@SaiBalaji",
        content: "I love webDelveloping"
    },
    {
        id:uuidv4(),
        username: "@Mark",
        content: "I love Android Development"
    },
    {
        id:uuidv4(),
        username: "@Tataji",
        content: "Nothing to loose Try again."
    },
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("form.ejs");
});


app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(req);
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id != p.id);
    res.redirect("/posts");
 
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs", {post});
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
    
});

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
    
});


app.listen(port, ()=>{
    console.log(`Server running at ${port}.`)
})