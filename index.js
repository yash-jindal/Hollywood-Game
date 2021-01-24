const express = require("express");
const bodyParser = require("body-parser");
const moviesNames = require('movies-names');
const _ = require('lodash');

// const ejsLint = require('ejs-lint');


const app = express();

var hollywood = "";
var found ="";
var chance=7;
var win = ["You are on fire!", "Nailed it!", "Making Streak is your habbit. Let's have an another shot.", "Hollywood is beneath you!", "Rockin' Awesome"]
var required=0;
var a=0;
var b=0;
var c=0;
var alphabets = "";
var newmovie;
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",function(req,res){
  hollywood = "";
  found ="";
  alphabets = "";
   chance=7;
   required=0;
   a=0;
   b=0;
  c=0;
  res.render("movie");

});

app.post("/", function(req,res){
  hollywood = "";
found ="";
alphabets = "";
chance=7;
required=0;
a=0;
b=0;
c=0;
  res.redirect("/");
});

app.get("/start", function(req,res){
  while(1){
    newmovie = moviesNames.random();
    if(newmovie.year>=2000){
      break;
    }
  }
  
  var movie = newmovie.title;
  
   movie = _.upperCase(movie)
   
  movie = String(movie);

  hollywood = hollywood + movie;

  
  for(var i=0;i<movie.length;i++){ 

    if(movie[i]==="A" || movie[i]==="E" || movie[i]==="I" || movie[i]==="O" || movie[i]==="U"){
        a++;
    }else if(movie[i]===" "){ 
          b++;
      }else if(movie[i]<"A" || movie[i]>"Z"){
            c++;
      }else{
      required++;
    }
    
}

if(required===0){
  res.redirect("/start");
}

  res.render("start", {movieName: movie, chances:chance, flag:"0", character:alphabets});
});

app.post("/start",function(req,res){
  var c=0;
var enter = req.body.char;
alphabets = alphabets + enter;
if(req.body.char === "" || req.body.char==="A" || req.body.char==="E" || req.body.char==="I" || req.body.char==="O" || req.body.char==="U"){
  res.render("start", {movieName: hollywood, chances:chance, flag:"1", found:found, character:alphabets});
}
else{
  if(found.search(enter)<0){
    for(var i=0;i<hollywood.length;i++){
      if(enter===hollywood[i]){
        found = found + hollywood[i];
        c++;
        
      }
    }
  }
 
  
  if(found.length === required){
    var r = Math.floor(Math.random() * 5);
    res.render("win", {quote:win[r], movieName: hollywood});
  }else{
    if(c>0 || found.search(enter)>=0){
      res.render("start", {movieName: hollywood, chances:chance, flag:"1", found:found, character:alphabets});
    }
    else{
      chance--;
      if(chance===0){
        res.render("lose", {movieName: hollywood});
      }else{
        res.render("start", {movieName: hollywood, chances:chance, flag:"1", found:found, character:alphabets});
      }
      
    }
  }


}
});






app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on port 3000");
});
