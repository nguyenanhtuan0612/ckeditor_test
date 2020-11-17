const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');


app.set("view engine", "ejs"); //set view engine
app.set("views", "./views"); //set view folder

app.use(express.static("./public")); //set static location

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/upload',multipartMiddleware,(req,res)=>{
    try {
        fs.readFile(req.files.upload.path, function (err, data) {
            var newPath = __dirname + '/public/images/' + req.files.upload.name;
            fs.writeFile(newPath, data, function (err) {
                if (err) console.log({err: err});
                else {
                    console.log(req.files.upload.originalFilename);
                //     imgl = '/images/req.files.upload.originalFilename';
                //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
                //    res.status(201).send(img);
                 
                    let fileName = req.files.upload.name;
                    let url = '/images/'+fileName;                    
                    let msg = 'Upload successfully';
                    let funcNum = req.query.CKEditorFuncNum;
                    console.log({url,msg,funcNum});
                   
                    res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
                }
            });
        });
       } catch (error) {
           console.log(error.message);
       }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
