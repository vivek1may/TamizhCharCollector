var mousePressed = false;
var lastX, lastY;
var ctx;


$(document).ready(function() {
    $('a').click(function() {
   
    var curr_char = $(this).text();
    console.log(curr_char);
    $('#tchar').text(curr_char);
    toggleblocks();
    });

    
});


function scroll_pause(){
    // sctollTop_length = $(window).scrollTop();
    $("body").css("overflow", "hidden");

  }
  
  function scroll_resume(){
    $("body").css("overflow", "visible");

    // $(window).scrollTop(sctollTop_length);
  }

function InitThis() {
  
    ctx = document.getElementById('myCanvas').getContext("2d");
    canvas = document.getElementById('myCanvas');
    $('#myCanvas').mousedown(function (e) {
        scroll_pause();
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            scroll_pause();
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        scroll_pause();
        mousePressed = false;
    });
	    $('#myCanvas').mouseleave(function (e) {
        scroll_resume();    
        mousePressed = false;
    });

    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        Draw(touch.pageX - $(this).offset().left, touch.pageY - $(this).offset().top, true);
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
      }, false);


    // Set up touch events for mobile, etc
    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    }, false);

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        };
    }
    
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}
	
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function sendImg(){
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL();
    var dataChar = $('#tchar').text();
    if (dataChar ===''){
        alert("Please select a character");
    }
    else{
        data = {'imgData':dataURL,'tchar':dataChar};
        // console.log(data);
        $.ajax({
            type: "POST",
            url: "/tamil_letters/image_data",
            data: data,
            success: function(data) {
              console.log('message', data.message);
            },
            error: function(jqXHR, textStatus, err) {
                alert('text status '+textStatus+', err '+err)
            }
        });
    }
   
    clearArea();
    
    
}

function toggleblocks(){
    console.log('toggle');
    $('.charblock').toggle();
    $('.canvasblock').toggle();
}