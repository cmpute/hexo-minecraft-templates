const nutil = require('util');
var util = require('hexo-util')
var stack = require('./tag_stack')
var identifiers = require('./identifiers')
var TagCount = 0; // Used to distinguish different tag blocks

function parseContent(contents){
    var nullLevelName = 'Level%d';
    var nullLevelCount = 0;

    var blocks = contents.split("|");
    var skipFirst = blocks[0] == '';

    var blockObject = {null: []};
    var currentRow = [];
    var currentLevel = null;
    for(var block in blocks){
        if(skipFirst){
            skipFirst = false;
            continue;
        }
        block = blocks[block].trim();
        if(block.startsWith('----')){
            currentLevel = block.substr(4);
            if(currentLevel == ''){
                nullLevelCount++;
                currentLevel = nutil.format(nullLevelName, nullLevelCount);
            }
            blockObject[currentLevel] = []
            continue;
        }
        else if(block == '-'){
            if(currentRow != 0) blockObject[currentLevel].push(currentRow);
            currentRow = [];
        }
        else{
            // First row has key null 
            currentRow.push(block);
        }
    }

    return blockObject;
}

module.exports = hexo => {
    return function render(args, contents){
        var caption = args[0];
        const {config} = hexo;
        var result = '<link rel="stylesheet" href="' + config.root + 'css/minecraft.css" type="text/css">';

        blockObject = parseContent(contents);

        var html = new stack();
        
        // Compute size
        var minWidth = 0;
        var minHeight = 0;
        for(var level in blockObject){
            var maxRowLength = Math.max.apply(null, blockObject[level].map((arr) => arr.length));
            if(maxRowLength > minWidth) minWidth = maxRowLength;
            if(blockObject[level].length > minHeight) minHeight = blockObject[level].length;
        }

        // Generate contents
        html.append('p'); html.push();
        html.append('div', {class: "layered-blueprint",
                            style:"min-height:" + minHeight*32 + "px;width:"+ minWidth*32 + "px"});
        html.push();
        var firstLevel = true;
        var singleLevel = false;
        for(var level in blockObject){
            var levelname = level;
            // Deal with first 'null' level
            if(level == 'null'){
                if(Object.keys(blockObject).length == 1)
                    singleLevel = true;
                else if(blockObject[level].length != 0)
                    levelname = 'Level0';
                else
                    continue;
            }

            // Generate level label
            if(!singleLevel){
                var inputid = 'mc_schematic_' + util.slugize(caption) + '_' + TagCount + '_' + util.slugize(level);
                html.append('input', {type: 'radio', id: inputid,
                                    class: 'layered-blueprint-radio',
                                    name: caption + '_' + TagCount, checked: firstLevel});
                html.append('label', {for: inputid, class: 'layered-blueprint-tab'}, levelname);
                if(firstLevel) firstLevel = false;
            }

            // Generate table
            html.append('div', {class: "layered-blueprint-layer"}); html.push();
            html.append('table', {class: 'schematic', cellspacing: "0", cellpadding:"0", style:"margin:0; line-height:0"}); html.push();
            html.append('tbody'); html.push();
            for(var blockRow in blockObject[level]){
                blockRow = blockObject[level][blockRow];
                html.append('tr'); html.push();
                for(var block in blockRow){
                    block = blockRow[block];
                    if(block == '') html.append('td', {style: "width:32px;height:32px"}); 
                    else{
                        html.append('td'); html.push();
                        html.append('div'); html.push();

                        // Multiple blocks in one grid
                        block = block.split('+');
                        for(var blocklayer in block){
                            blocklayer = block[blocklayer].trim();
                            if(blocklayer.toLowerCase() in identifiers){
                                var offset = identifiers[blocklayer.toLowerCase()];
                                html.append('span', {class: "sprite schematic-sprite",
                                                    style: "background-position:-" + offset[0]*32 + "px -" + offset[1]*32 + "px;"}, '<br/>');
                            }
                            else{
                                html.append('span', {class: "text"}, blocklayer);
                            }
                        }
                        html.pop(); // </div>
                        html.pop(); // </td>
                    }
                }
                html.pop(); // </tr>
            }
            html.pop(); // </tbody>
            html.pop(); // </table>
            html.pop(); // </div>
        }
        html.pop(); // </div>
        html.pop(); // </p>

        TagCount += 1;
        result += html.string();
        return result;
    }
}