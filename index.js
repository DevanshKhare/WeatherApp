const http = require('http');
const fs = require('fs');
var requests = require('requests');
const port = process.env.PORT || 8000;

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempval, orgval) => {
    let temperature = tempval.replace("{%tempval%}", (orgval.main.temp - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmin%}", (orgval.main.temp_min - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmax%}", (orgval.main.temp_max - 273.15).toFixed(2));
    temperature = temperature.replace("{%location%}", orgval.name);
    temperature = temperature.replace("{%country%}", orgval.sys.country);
    return temperature;

}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=Satna&appid=af09221dacbe01b11dd47a1acf697d98")
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata]
                console.log(arrdata);
                // console.log(arrdata[0].main.temp);
                const realTimeData = arrdata.map((val) => replaceVal(homeFile, val)).join("");
                res.write(realTimeData);
                // console.log(realTimeData);


            })
            .on("end", (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                // console.log("end");
            });
    } else {
        res.end("File Not found");
    }


}).listen(port, "127.0.0.1");