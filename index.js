
const fs = require('fs')
const ping = require('ping');
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require('path')
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
const port = 3005

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));

app.engine('handlebars', exphbs.engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true, // Habilita o acesso a propriedades do protótipo
        allowProtoMethodsByDefault: true
    }
})
)

app.get("/", function(req,res){
    res.render('tablets.handlebars',{layout: false});
})



function readIPsFromFile(filePath) {
                    return new Promise((resolve, reject) => {
                        fs.readFile(filePath, 'utf8', (err, data) => {
                            if (err) {
                return reject(err);
            }
        
            const ips = data.split('\n').map(ip => ip.trim()).filter(ip => ip);
            resolve(ips);
        });
    });
}


(async () => {
    try {
        const tablets = await readIPsFromFile('ipColetor.txt'); 

        for (let i = 0; i < tablets.length; i++) {
            const isAlive = await ping.promise.probe(tablets[i]);
            const message = isAlive.alive ? `Tablet está online: ${tablets[i]}` : `IP está offline: ${tablets[i]}`;
            console.log(message);
        }
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
})();



console.log("servidor rodando na porta:" +port)
app.listen(port)