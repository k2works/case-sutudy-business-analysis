const { series, parallel } = require('gulp');
const core = require('./ops/gulp/tasks/core');
const custom = require('./ops/gulp/tasks/custom');

exports.default = series(
    core.webpackBuildTasks(),
    parallel(
        core.asciidoctorBuildTasks(),
        core.marpBuildTasks(),
        custom.asciidoctorBuildTasks(),
        core.adrBuildTasks(),
    ),
    series(
        parallel(core.webpack.server, core.asciidoctor.server),
        parallel(core.webpack.watch, core.asciidoctor.watch, core.marp.watch,custom.asciidoctor.watch),
    ),
);

exports.build = series(
    core.webpackBuildTasks(),
    parallel(
        core.asciidoctorBuildTasks(),
        core.marpBuildTasks(),
        custom.asciidoctorBuildTasks(),
        core.adrBuildTasks(),
    )
);

exports.docs = series(
    parallel(core.asciidoctorBuildTasks(), core.marpBuildTasks()),
    parallel(core.webpack.watch, core.asciidoctor.watch, core.marp.watch,custom.asciidoctor.watch),
    core.adrBuildTasks(),
    parallel(core.asciidoctor.server, core.asciidoctor.watch, core.marp.watch),
);
exports.slides = series(core.marp.build);
