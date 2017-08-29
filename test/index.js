var render = require('../lib/render_schematic');

var content = "\
|----LevelName1|-\
|AB + T |rd-se! |rd-ew! |SB     |-\
|AB     |       |       |rd-!   |-\
|----LevelName2|-\
|AB||rd-se!||-\
|AB||K|-\
";

var singleLevel = "\
|AB + T |rd-se! |rd-ew! |SB     |-\
|AB     |       |       |rd-!   |-\
"

var result = render(['test'], singleLevel);
console.log(result);