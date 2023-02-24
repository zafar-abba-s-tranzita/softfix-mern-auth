const express = require("express")
 ,cors = require("cors")
 ,bodyParser = require("body-parser")
 ,cookieParser = require("cookie-parser")
 ,passport = require("passport")
 ,app = express();
  dir = './build',
  indexDir = '/build/index.html'
 , path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./utils/connectdb");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");
const userRouter = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(","): [];

const corsOptions = { origin: function (origin, callback) {
  if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(passport.initialize());

app.use("/users", userRouter);

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static(dir));

app.use((req, res) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  whitelistedDomains = whitelist;
  if (!whitelistedDomains.includes(req.header('origin'))) {
      res.removeHeader("Access-Control-Allow-Origin");
  }
  res.sendFile(path.join(__dirname + indexDir));
});

//health-check api
app.get("/health-check", function (req, res) {
  res.status(200).send({ status: `App is runnig on port: ${server.address().port}` });
});

const server = app.listen(process.env.PORT || 8081, function () {
  console.log("App started at port:", server.address().port, "Server start time", new Date());
});
