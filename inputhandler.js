<!-- UP -->
addEventListener("keydown", function(e) {
    if (e.keyCode == '40') vy = 5;
});
addEventListener("keyup", function(e) {
    if (e.keyCode == '40') vy = 0;
});

<!-- DOWN -->
addEventListener("keydown", function(e) {
    if (e.keyCode == '38') vy = -5;
});
addEventListener("keyup", function(e) {
    if (e.keyCode == '38') vy = 0;
});

<!-- RIGHT -->
addEventListener("keydown", function(e) {
    if (e.keyCode == '39') vx = 5;
});
addEventListener("keyup", function(e) {
    if (e.keyCode == '39') vx = 0; 
});

<!-- LEFT -->
addEventListener("keydown", function(e) {
   if (e.keyCode == '37') vx = -5; 
});
addEventListener("keyup", function(e) {
    if (e.keyCode == 37) vx = 0;
});

