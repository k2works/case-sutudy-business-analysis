const tasks =  {
    task1: (cb) => {
        // place code for your default task here
        cb();
    }
}

exports.tasks = tasks;

const { series, watch, src, dest } = require('gulp');
const fs = require('fs-extra');
const kroki = require('asciidoctor-kroki');
const browserSync = require('browser-sync').create();

const asciidoctor = {
    clean: async (cb) => {
        await fs.remove("./public/docs/case"); // fs-extraでディレクトリを非同期で削除
        cb(); // コールバック関数を呼び出す
    },
    build: (cb) => {
        const asciidoctor = require("@asciidoctor/core")();
        const krokiRegister = () => {
            const registry = asciidoctor.Extensions.create();
            kroki.register(registry);
            return registry;
        };

        const inputRootDir = "./docs/case";
        const outputRootDir = "./public/docs/case";
        const fileNameList = fs.readdirSync(inputRootDir);
        const docs = fileNameList.filter(RegExp.prototype.test, /.*\.adoc$/);

        docs.map((input) => {
            const file = `${inputRootDir}/${input}`;
            asciidoctor.convertFile(file, {
                safe: "safe",
                extension_registry: krokiRegister(),
                to_dir: outputRootDir,
                mkdirs: true,
            });
        });
        src(`${inputRootDir}/images/*.*`, {encoding: false}).pipe(dest(`${outputRootDir}/images`))
            .on('end', cb); // src.pipeの完了後にcb()を実行
    },
    watch: (cb) => {
        watch("./docs/**/*.adoc", asciidoctor.build);
        cb();
    },
}

exports.asciidoctor = asciidoctor;
exports.asciidoctorBuildTasks = () => {
    return series(asciidoctor.clean, asciidoctor.build);
}

