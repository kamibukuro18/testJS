# PhinaJS Sample Games
Phina.JS is one of Game Engine based on JavaScript. I had tried to create some games on 2D based. These games are puzzle type and maze type.
## Description:
This is one of tutrial for creating some games based on phina.js. In this document, to try creating 2D based breakout games with pazzle and maze. 
## Demo:
I will show you same samples to create 2D based games of pazzle type step by step.  
These demonstrations are confirmed by Microsoft Edge (Ver. 11.0.17763.379), Firefox (Ver. 65.0.2/64 bit) and Google Chrome (Ver. 73.0.3683.86/64 bit) under the condition of Windows 10. It is also supported to the touch events. Then, some Android and iOS are also available to work it.  
[index.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index.html) : Menu for Demo Games  
At the GITHUB above, the files and the folders are as follows:  
- index_Phina_01.html - index_Phina_09_with_sound_effect.html: Each html file is corresponding to each step below.  
- images: It is a folder for providing the background image, tile images and character's graphics.  
- js: It is a folder for main programs.  
- js/maze_02.js: To create the maze for Step-7.  
- js/phina.js, phina.min.js: The main body for phina.js.  
- js/phina_sample_01.js - phina_sample_09_with_sound_effect.js: Each JavaScript file is corresponding to each HTML file.  
- js/stage_01.js: Each stage without enemy is here. It is available to change by using text editor.  
- js/stage_02.js: Each stage with enemy (after stage #8) is here. It is also available to change.  
- sound: It is a folder for providing the sound files.  

In these games, some graphics are downloaded from  [pikasgame](https://dorapika.wixsite.com/pikasgame) and [pipoya](http://blog.pipoya.net/). Then, files for sound effect are downloaded from [Let's Play with Free Sound Effects !](https://taira-komori.jpn.org/).  
### Step-1
As a first step, let's try to display a static character's graphic at center of window.  
[index_Phina_01.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_01.html) : Demo for Step-1
### Step-2
Next is to try moving a static character by arrow keys or mouse click.  
[index_Phina_02.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_02.html) : Demo for Step-2
### Step-3
At the Step-3, try to display a active character's graphic at center of window.  
[index_Phina_03.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_03.html) : Demo for Step-3
### Step-4
At the Step-4, try to display a walking animation for 4 directions by arrow keys or mouse click.  
[index_Phina_04.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_04.html) : Demo for Step-4
### Step-5
At the Step-5, display tiles of walls and boxes. Then, to set the limit of walking at walls.  
[index_Phina_05.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_05.html) : Demo for Step-5
### Step-6
At the Step-6, to set pushing a box. It is 2 type of 2D based game samples, that is without sound effect and with sound effect. If you try again same stage, please click the "A" tile.  
[index_Phina_06.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_06.html) : Demo for Step-6 without sound effect  
[index_Phina_06_with_sound_effect.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_06_with_sound_effect.html) : Demo for Step-6 with sound effect
### Step-7
In this step, try to create game for 2D type of maze with small chang of the sample in Step-6. The algorithm for making maze is based on [Algoful](http://algoful.com/Archive/Algorithm/MazeDig).  
[index_Phina_07.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_07_with_sound_effect.html) : Demo for Step-7
### Step-8
At the Step-8, added some enemies to the sample in Step-6.  
[index_Phina_08.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_08_with_sound_effect.html) : Demo for Step-8
### Step-9
At the last step, some enemies are able to crush by Box.  
[index_Phina_09.html](https://to-fujita.github.io/PhinaJS_Sample_Games/index_Phina_09_with_sound_effect.html) : Demo for Step-9
## Reference:
1. [Phina js](https://phinajs.com/) : Home Page of Phina.js  
2. [pikasgame](https://dorapika.wixsite.com/pikasgame) : Home Page of PIKA's GAME  
3. [pipoya](http://blog.pipoya.net/) : Home Page of Pipoya  
4. [Algoful](http://algoful.com/Archive/Algorithm/MazeDig) : Algorithm for making a maze  
5. [Let's Play with Free Sound Effects !](https://taira-komori.jpn.org/) : Mr. Taira Komori's Home Page  
## Licence:
MIT
## Author:
[T. Fujita](https://github.com/To-Fujita)
