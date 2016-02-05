# Project 1: Connect Four

### Technology
In my Connect Four game, I used a combination of preset HTML elements and element attributes like IDs and classes, CSS styling, basic jQuery DOM accessing and manipulation, and JavaScript logic and functions. 

### Approach
Originally, my approach was to hard-code every div into the HTML and pre-set every one with a class specifying its row, column, and diagonal, in order to make the Javascript part as simple as possible. At the last minute, I decided to change the basis of the Javascript and dynamically create the board, in order to allow you to make it bigger or smaller. 

My original idea involved a very simple function to check for a win: for-looping through the "rows", "columns", and "diagonals" arrays to check if there were four adjacent elements with the same color. It was only about 10 lines long and took one argument. I wanted to keep the same simplicity of this win-checking function, so after the function that creates the board is invoked, I use jQuery to make "row" and "column" arrays from the HTML elements that were just created. However, creating a "diagonals" array is more complicated, so instead I looped through the "rows" array (due to its visual similarity to the game board).

### Struggles
My first approach was very straightforward and there weren't many challenges, but I would say converting the whole program setup after I had already finished most of the details I was trying to put in was a bit of an obstacle. It took some time to figure out and prevented me from implementing other extra features like a computer/AI.

I'm also getting a lot more comfortable with CSS, but sometimes even with div containers around everything (literally everything in my HTML), the alignment doesn't really work exactly how I want it to.

### Unsolved Problems
There aren't necessarily any problems in the program, as it works fine, but I wasn't able to add a player-vs-computer option in like I originally wanted to.