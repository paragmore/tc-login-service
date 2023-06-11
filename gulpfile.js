const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("serve", () => {
  nodemon({
    script: "dist/server.js",
    ext: "js",
    watch:'./',
    env: {
      PORT: process.env.PORT || "8000",
      HOST: process.env.HOST || "0.0.0.0"
    },
    ignore: ["./node_modules/**"],
  }).on("restart", () => {
    console.log("SERVER RESTARTING");
  });
});

gulp.task('default', gulp.series('build', 'serve'));

