var fs = require('fs');

hexo.extend.tag.register('minecraft', require('./lib/render_schematic'), {ends: true, async: true});

hexo.extend.generator.register('minecraft.css', function(local){
    return {
        path: 'css/minecraft.css',
        data: function(){
            return fs.createReadStream(__dirname + '/css/minecraft.css')
        }
    }
});

hexo.extend.generator.register('minecraft.images', function(local){
    return {
        path: 'images/SchematicSprite.png',
        data: function(){
            return fs.createReadStream(__dirname + '/images/SchematicSprite.png')
        }
    }
});