const fs = require('fs');
const parse = require('node-html-parser').parse;
const filepath = 'sprintdemomobile/www/index.html';

fs.readFile(filepath, 'utf8', (err,html)=>{
   if(err){
      throw err;
   }
  //  html = html.replace(/main/g, 'main.bundle');
   let root = parse(html);
   const head = root.querySelector('head');
  //  head.appendChild("<meta http-equiv=\"Content-Security-Policy\" content=\"default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'\" />");
   head.appendChild('<script src="cordova.js"></script>');
   console.log(root.toString());
   fs.writeFile(filepath, root.toString(), function (err) {
      if (err) return console.log(err);
      console.log('index.html appended with cordova script tag')
    });
 });