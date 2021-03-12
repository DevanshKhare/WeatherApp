const http = require('http');
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempval, orgval) => {
    let temperature = tempval.replace("")
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=Satna&appid=af09221dacbe01b11dd47a1acf697d98")
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata];
                const realTimeData = arrdata.map((val) => replaceVal(homeFile, val)).join("");
                res.write(realTimeData);

            })
            .on("end", (err) => {
                if (err) return console.log("Connection Closed due to an error");
                res.end();
            })

    } else {
        res.end("File Not Found");
    }
}).listen(8000);