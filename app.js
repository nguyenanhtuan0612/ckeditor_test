const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const { callAPI } = require('./helper/services');


app.set("view engine", "ejs"); //set view engine
app.set("views", "./views"); //set view folder

app.use(express.static("./public")); //set static location

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/files', async function (req, res) {
    const url = 'http://10.0.0.47:3002/kong/media/api/v1/asset/picture';
    const { data } = await callAPI(url,'GET');
    res.send(data)
})

app.post('/upload',multipartMiddleware,async (req,res)=>{
    try {
        const url = 'http://10.0.0.47:3002/kong/media/api/v1/upload/image';
        const { data } = await callAPI(url,'POST');
        let uri = data.uri;                    
        let msg = 'Upload successfully';
        let funcNum = req.query.CKEditorFuncNum;
        console.log({uri,msg,funcNum});
                   
        res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+uri+"','"+msg+"');</script>");
       } catch (error) {
           console.log(error.message);
       }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
