# Hexo-Minecraft-Templates
A plugin for hexo to generate Minecraft related content just like in [MinecraftWiki](https://minecraft.gamepedia.com/).

# Schematic Template
Generate Minecraft schematic blocks table with hexo tags. See official MinecraftWiki [help page](https://minecraft.gamepedia.com/Help:Schematic) and [documentation](https://minecraft.gamepedia.com/Template:Schematic) for usage and block identifing codes.

[Demo here](http://jacobz.top/2017-08/MCTowerWheat/)

## Usage example:
Single Level:
```
{% minecraft caption %}
|AB + T |rd-se! |rd-ew! |SB     |-
|AB     |       |       |rd-!   |-
{% endminecraft %}
```

Multiple Level:
```
{% minecraft caption %}
|----LevelName1|-
|AB + T |rd-se! |rd-ew! |SB     |-
|AB     |       |       |rd-!   |-
|----LevelName2|-
|AB||rd-se!||-
|AB||K|-
{% endminecraft %}
```

# Notes
- Anonymous levels are named as Level1, Level2...
- The blocks before the first level tag are named as Level0

# TODO
- Add argparser and args: label-align, grid-size, is-layer-tansparent ([Format here](https://hexo.io/zh-cn/docs/tag-plugins.html))
- Add link for blocks
- Add display for size and block statistic info
- Add tag option for side/top view
- Add option for border style: none, whole, level
- Clean and minify css
