/*
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var img1 = loadImage('http://www.planwallpaper.com/static/images/wallpaper672898_phFezZz.jpeg');

var img2 = loadImage('https://s-media-cache-ak0.pinimg.com/originals/aa/44/d1/aa44d13171116997771029cb8c410192.png');

var img3 = loadImage('http://cdn.bulbagarden.net/upload/thumb/b/b9/172Pichu.png/250px-172Pichu.png');

var img4 = loadImage('http://orig08.deviantart.net/6fd1/f/2009/351/7/9/togepi_by_xous54.png');

var desiredWidth;
*/

/*  cargar imagenes web to img */

function loadImage(src, onload) {
    var img = new Image();
    img.onload = onload;
    img.src = src;
    return img;
}

/*  imagenes al canvas  */
function main() {
        ctx.drawImage(img1, 0, 0);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(img2, 0, 0);
        ctx.drawImage(img2, 400, 200);
        ctx.drawImage(img3, 800, 600);
        ctx.drawImage(img4, 200, 450);
}

function gotPic(event) {
    var  stringUrl;
    var  stringUrlshort;
    if(event.target.files.length == 1 && 
       event.target.files[0].type.indexOf("image/") == 0) {
        
    //  $("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
      
      stringUrl = URL.createObjectURL(event.target.files[0]);
      console.log(event.target.files[0].name);
      console.log(stringUrl);
      stringUrlshort = stringUrl.substring(5,stringUrl.length);
      console.log(stringUrlshort);
      //$("#yourimage").attr("src",stringUrl);
      var img = new Image;
      img.onload = function() {
          /// set size proportional to image
          canvas.height = canvas.width * (img.height / img.width);

          /// step 1 - resize to 50%
          var oc = document.createElement('canvas'),
              octx = oc.getContext('2d');

          oc.width = img.width * 0.5;
          oc.height = img.height * 0.5;
          octx.drawImage(img, 0, 0, oc.width, oc.height);

          /// step 2 - resize 50% of step 1
          octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

          /// step 3, resize to final size
          ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
          0, 0, canvas.width, canvas.height);
          
          URL.revokeObjectURL(img.src);
      }
      img.src = stringUrl;
      document.getElementById('btnCameraCanvas').style.visibility = 'hidden';

    }
}