const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//viewengine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        console.log(files);
        res.render("index", { files: files });
    })
})

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return res.status(404).send("File not found");
        }
        res.render('show', { data: data, filename: req.params.filename });
    });

})

app.get("/delete/:filename", (req,res)=>{
    fs.rm(`./files/${req.params.filename}`, (err)=>{
        if(err){
            console.log("Deleting error:", err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect("/");
    })
})

app.get("/edit/:filename", (req,res)=>{
    res.render('edit',{filename: req.params.filename});
})

app.post("/edit", (req,res)=>{
    console.log(req.body);
    let names = req.body.new.split(' ');
    let camelCasedVar = names.map((name,index)=>{
        if(index===0) return name.toLowerCase();
        return name.charAt(0).toUpperCase()+ name.slice(1).toLowerCase();
    }).join('');
    fs.rename(`./files/${req.body.previous}`, `./files/${camelCasedVar}`, (err)=>{
        if(err){
            console.log("Rename error:", err);
            return res.status(500).send("Error renaming file");
        }
        res.redirect("/");
    })
})

app.post("/create", (req, res) => {
    console.log(req.body);
    let words = req.body.title.split(' ');
    let camelCasedVar = words
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');

    fs.writeFile(`./files/${camelCasedVar}.txt`, req.body.description, (err) => {
        console.log("ERROR!");
    })
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("running");
})