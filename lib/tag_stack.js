"use strict"
var maketag = require('hexo-util').htmlTag

function TagStack(){
    this.arr = [];
    this.str = "";
    this.cur = null;
    this.needclose = false;
}

TagStack.prototype.append = function(tag, attrs, content){
    if(this.needclose) this.str += '</' + this.cur + '>';
    this.cur = tag;

    this.str += makeTag(tag, attrs, content);
    if(!content){
        this.needclose = true;
    }
}

TagStack.prototype.push = function(){
    this.arr.push(this.cur);
    this.needclose = false;
}

TagStack.prototype.pop = function(){
    this.str += '</' + this.arr.pop() + '>';
}

TagStack.prototype.write = function(content){
    this.str += content;
}

TagStack.prototype.string = function(){
    while(this.level.length > 0) this.pop();
    return this.str;
}

TagStack.prototype.level = function(){
    return this.arr.length;
}

TagStack.prototype.clear = function(){
    this.arr = [];
    this.str = "";
    this.cur = null;
    this.needclose = false;
}

module.exports = TagStack;