var render = require('../lib/render_schematic');

var content = "\
|----LevelName1|-\
|AB + T |rd-se! |rd-ew! |SB     |-\
|AB     |       |       |rd-!   |-\
|----LevelName2|-\
|AB||rd-se!||-\
|AB||K|-\
";

var result = render(['test'], content);
