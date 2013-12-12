var express = require('express');
var fs = require('fs');
var app = express();

var read = function(filename){
    return fs.readFileSync(filename, 'utf-8');
};

app.get(/^(.*)$/, function(req, res){
    var uri = req.params[0];
    
    if( uri === '/' ){
        res.send( read('dist/pages/index.html') );
        return;
    }

    //remove starting slash if there's one
    uri = uri.charAt(0) === '/' ? uri.replace('/','') : uri;

    if( fs.existsSync(uri) ){
        res.send( read('dist/'+uri) );
        return;
    }

    res.send( read('dist/pages/404.html') );
});

app.listen(process.env.PORT || 3000);