const FtpDeploy = require("ftp-deploy");
const pjson = require("./package.json");

var ftpDeploy = new FtpDeploy();
var config = {
  user: "dev",
  // Password optional, prompted if none given
  password: "F1&dB7pX2yJ8lvH6q",
  host: "212.80.219.12",
  port: 21,
  localRoot: "./dist/",
  remoteRoot: `/www/playable.spinswin.space/${pjson.name}`,
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ["*", "**/*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err));
