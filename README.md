# Welcome to krpano-tools-vtour-xml

This project is used to rename **krpano tour.xml** scenes and generate texts hotspots based in hotspots existents.
Made by my own.

**Feel free to contribute**

## Install dependences
This project use `node-xml2js`

In project folder execute:
 
	 $ npm install

## Rename Title Scenes

Copy `tour.xml` into root project folder.

### 1 - Generate scenes.json with the command bellow:

	 $ node scenes.js e
		
### 2 - Open and edit title into scenes.json (generate previously) 
	{ scenes: 
	   [ { name: 'scene_1', title: 'Entrada Principal' },
	     { name: 'scene_2', title: 'Área Comum' }, ...
#### Example	     
Edit this: `title: 'Entrada Principal'` to  `title: 'Entrada Principal 2'`

### 3 - Import scenes.json and generate tour_modificado.xml
After edit `scenes.json` using command bellow:
	
	 $ node scenes.js i

This command generate `tour_modificado.xml` and keep the original file `tour.xml` .

 ## Generate texts hotspots based in hotspots existents
 Copy `tour.xml` into root project folder and execute the command bellow:
	 
	  $ node hotspot.js
	  
This command generate `tour_modificado.xml` and keep the original file `tour.xml` .

## Tips
put &lt;br&gt; to use <br> into xml code.

## Contact
Any questions or suggestions contact me.

**Twitter:** @alexishida

**Telegram:** @alexishida

**E-mail:** alexishida@gmail.com