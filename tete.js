
const fs = require('fs')
const ping = require('ping');


                
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
        const tablets = await readIPsFromFile('iptablets.txt'); 

        for (let i = 0; i < tablets.length; i++) {
            const isAlive = await ping.promise.probe(tablets[i]);
            const message = isAlive.alive ? `Tablet está online: ${tablets[i]}` : `IP está offline: ${tablets[i]}`;
            console.log(message);
        }
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
})();