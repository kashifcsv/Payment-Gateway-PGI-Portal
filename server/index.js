const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const compression = require("compression");
const app = express();
const mime = require("mime");

// app.use(function(request, response){
//     if(!request.secure){
//         response.redirect("https://" + request.headers.host + request.url);
//     }
// });

// var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
// app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
//FOR KAI OS APP Manifest File

function getHostedManifest(req, res) {
  var url = "hosted-manifest.webapp";

  fs.readFile(url, function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end("File not found.");
    }

    res.setHeader("Content-Type", "application/x-web-app-manifest+json webapp"); //Solution!
    res.writeHead(200);
    res.end(data);
  });

  // resp.setHeader("Content-Type", "application/x-web-app-manifest+json webapp");
  // resp.json(hostedManifest);
}

function getManifestData(req, res) {
  var url = "build/manifest.json";

  fs.readFile(url, function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end("File not found.");
    }

    res.setHeader("Content-Type", "application/x-web-app-manifest+json"); //Solution!
    res.writeHead(200);
    res.end(data);
  });

  // resp.setHeader("Content-Type", "application/x-web-app-manifest+json webapp");
  // resp.json(hostedManifest);
}

function getMetaData(req, res) {
  var url = "metadata.json";

  fs.readFile(url, function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end("File not found.");
    }

    res.setHeader("Content-Type", "application/x-web-app-manifest+json"); //Solution!
    res.writeHead(200);
    res.end(data);
  });

  // resp.setHeader("Content-Type", "application/x-web-app-manifest+json webapp");
  // resp.json(hostedManifest);
}

app.use(function (req, res, next) {
  // static folder: css
  if (
    req.url.indexOf("/css/") === 0 ||
    req.url.indexOf("/js/") === 0 ||
    req.url.indexOf("/static/") === 0 ||
    req.url.indexOf("/images/") === 0
  ) {
    res.setHeader("Cache-Control", "public, max-age=31556952"); // 4 days
    res.setHeader("Expires", new Date(Date.now() + 31556952000).toUTCString());
  }
  next();
});

app.use(function (req, res, next) {
  //if (req.secure && req.url.indexOf('/signin') === 0) {
  //    console.log("SECURE REQ");
  // request was via https, so do no special handling

  //        res.redirect('http://' + req.headers.host + req.url);

  //} else {
  // console.log("UNSECURE REQ");
  next();
  // }
});

app.use(compression());
// app.use(express.static(__dirname + '/build/css', { maxAge: 86400000 }));
// app.use(express.static(__dirname + '/build/js', { maxAge: 86400000 }));
// app.use(express.static(__dirname + '/build/images', { maxAge: 86400000 }));
// app.use(express.static(__dirname + '/css', { maxAge: 86400000 }));
// app.use(express.static(__dirname + '/js', { maxAge: 86400000 }));
//app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static(path.join(__dirname, 'sometvlanding')));

// const sslOptions = {
//     key: fs.readFileSync('G:/xampp/htdocs/sometv/cert/cert.key'),
//     cert: fs.readFileSync('G:/xampp/htdocs/sometv/cert/cert.crt')
// };
//
const sslOptions = {
  key: fs.readFileSync("/data/somewebsite/ssl-certs/some-ssl.key"),
  cert: fs.readFileSync("/data/somewebsite/ssl-certs/some-lhr.crt"),
  secureProtocol: "TLSv1_2_method",
};

// app.get("/*", function(request, response){
//     response.redirect("https://" + request.headers.host + request.url);
// });
app.get("/OneSignalSDKWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build/onesignal", "OneSignalSDKWorker.js"));
});
app.get("/hosted-manifest", getHostedManifest);
app.get("/hosted-manifest.webapp", getHostedManifest);
app.get("/metadata.json", getMetaData);
app.get("/manifest.json", getManifestData);
app.get("/", (req, res) => {
  // res.send("<!doctype html>\n" +
  //    "<title>some TV</title>\n" +
  //    "<style>\n" +
  //    "  body { text-align: center; padding: 150px; }\n" +
  //    "  h1 { font-size: 50px; }\n" +
  //    "  body { font: 20px Helvetica, sans-serif; color: #333; }\n" +
  //    "  article { display: block; text-align: left; width: 650px; margin: 0 auto; }\n" +
  //    "  a { color: #dc8100; text-decoration: none; }\n" +
  //    "  a:hover { color: #333; text-decoration: none; }\n" +
  //    "</style>\n" +
  //    "\n" +
  //    "<article>\n" +
  //   "    <h1>some TV</h1>\n" +
  //    "    <div>\n" +
  //    "        <p>Download some TV Application using below link</p><br><a href='http://sometv.com/apps'>Download</a>" +
  //    "    </div>\n" +
  //    "</article>")
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  //res.sendFile(path.join(__dirname, 'sometvlanding', 'index.html'));
  if (req.get("user-agent").toLowerCase().indexOf("kaios") !== -1) {
    console.log("Kai OS User", req.get("user-agent").toLowerCase());
    res.sendFile(path.join(__dirname, "build", "index.html"));
  } else {
    console.log("NOT Kai OS User", req.get("user-agent").toLowerCase());
    res.sendFile(path.join(__dirname, "sometvlanding", "index.html"));
  }
});

const route = (req, res) => {
  if (req.get("user-agent").toLowerCase().indexOf("kaios") !== -1) {
    console.log("Kai OS User", req.get("user-agent").toLowerCase());
    res.sendFile(path.join(__dirname, "build", "index.html"));
  } else {
    console.log("NOT Kai OS User", req.get("user-agent").toLowerCase());
    res.sendFile(path.join(__dirname, "sometvlanding", "index.html"));
  }
};

app.get(
  [
    "/search/:keyword",
    "/view/:keyword",
    "/movie/:keyword",
    "/live-tv",
    "/program/:keyword",
    "/episode/:keyword",
  ],
  (req, res) => {
    route(req, res);
  }
);

app.use(express.static(path.join(__dirname, "build")));
app.use("/landing", express.static(path.join(__dirname, "sometvlanding")));
//app.get("/.well-known/comi-validation/", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "build/onesignal", "OneSignalSDKWorker.js"));
//});
app.listen(80, () => {
  console.log("Sever start listening on Port 80");
});
https.createServer(sslOptions, app).listen(443, () => {
  console.log("Server start listening on Port 443");
});
