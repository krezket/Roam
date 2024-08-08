<!-- UP -->
    addEventListener("keydown", function(e) {
        if (e.keyCode == '38') {
            console.log("moving up")
            vy = -3;
        }
    });
addEventListener("keyup", function(e) {
    if (e.keyCode == '38') vy = 0;
});

<!-- DOWN -->
    addEventListener("keydown", function(e) {
        if (e.keyCode == '40') vy = 3;
    });
addEventListener("keyup", function(e) {
    if (e.keyCode == '40') vy = 0;
});

<!-- RIGHT -->
    addEventListener("keydown", function(e) {
        if (e.keyCode == '39') vx = 3;
    });
addEventListener("keyup", function(e) {
    if (e.keyCode == '39') vx = 0;
});

<!-- LEFT -->
    addEventListener("keydown", function(e) {
        if (e.keyCode == '37') vx = -3;
    });
addEventListener("keyup", function(e) {
    if (e.keyCode == '37') vx = 0;
});
