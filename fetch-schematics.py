import json
import re, os
import requests
from bs4 import BeautifulSoup as bs

basic = requests.get('https://minecraft.gamepedia.com/api.php?action=parse&format=json'
                     '&prop=text%7Cmodules%7Cjsconfigvars&title=Template%3ASchematic'
                     '&text=%7B%7B%3ATemplate%3ASchematicSprite%2Fids-basic%7D%7D').json()
basic = bs(basic['parse']['text']['*'])
basic = basic.find_all(class_='schematic')

for elem in basic:
    loc = elem.contents[-1]['style']
    name = elem.next_sibling
    px = re.findall('(?<=-)[0-9]*(?=px)', loc)

    # specific cases
    if '?' in name:
        name = '???, unknown' # there is invalid char in origin of this name
    if name == 'JL, Pu':
        name = 'Pu' # conflict of jl and JL

    elemstr = ['"{name}" : [{x}, {y}],'.format(name=sname.lower().strip(),
                                               x=int(int(px[0])/32), y=int(int(px[1])/32))\
                    for sname in name.split(', ')]
    elemstr = ' '.join(elemstr)

    if elem.previous_sibling is None:
        parent = elem.find_parent('td')
        elemstr += ' // ' + ''.join(parent.find_previous_sibling('td').findAll(text=True))

    print(elemstr)

basic = requests.get('https://minecraft.gamepedia.com/api.php?action=parse&format=json'
                     '&prop=text%7Cmodules%7Cjsconfigvars&title=Template%3ASchematic'
                     '&text=%7B%7B%3ATemplate%3ASchematicSprite%2Fids-redstone%7D%7D').json()
basic = bs(basic['parse']['text']['*'])
basic = basic.find_all(class_='schematic')


for elem in basic:
    loc = elem.contents[-1]['style']
    name = elem.next_sibling
    name = re.sub(r' \([\W\w]+\)', '', name)
    px = re.findall('(?<=-)[0-9]*(?=px)', loc)

    elemstr = ['"{name}" : [{x}, {y}],'.format(name=sname.lower().strip(),
                                               x=int(int(px[0])/32), y=int(int(px[1])/32))\
                    for sname in name.split(', ')]
    elemstr = ' '.join(elemstr)

    if elem.previous_sibling is None:
        parent = elem.find_parent('td')
        elemstr += ' // ' + ''.join(parent.find_previous_sibling('td').findAll(text=True))
        # TODO: Directly remove the second line of the description

    print(elemstr)
