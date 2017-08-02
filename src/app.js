$(document).foundation();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var img1 = loadImage('http://www.planwallpaper.com/static/images/wallpaper672898_phFezZz.jpeg');

var img2 = loadImage('https://s-media-cache-ak0.pinimg.com/originals/aa/44/d1/aa44d13171116997771029cb8c410192.png');

var img3 = loadImage('http://cdn.bulbagarden.net/upload/thumb/b/b9/172Pichu.png/250px-172Pichu.png');

var img4 = loadImage('http://orig08.deviantart.net/6fd1/f/2009/351/7/9/togepi_by_xous54.png');

var desiredWidth;


$(document).ready(function() {
    console.log('onReady');
	$("#takePictureField").on("change",gotPic);
	//$("#yourimage").load(getSwatches);
	desiredWidth = window.innerWidth;
    if(!("url" in window) && ("webkitURL" in window)) {
        window.URL = window.webkitURL;   
    }
	
});

function gotPic(event) {
    var  stringUrl;
    var  stringUrlshort;
    if(event.target.files.length == 1 && 
       event.target.files[0].type.indexOf("image/") == 0) {
        
    //	$("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
    	
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
      document.getElementById('btnCamera').style.visibility = 'hidden';

    }
}



function main() {
        ctx.drawImage(img1, 0, 0);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(img2, 0, 0);
        ctx.drawImage(img2, 400, 200);
        ctx.drawImage(img3, 800, 600);
        ctx.drawImage(img4, 200, 450);
}

function loadImage(src, onload) {
    var img = new Image();
    img.onload = onload;
    img.src = src;
    return img;
}
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}
    
$('#btn2').click(function(){
  console.log("charmander");
});
$('#btn3').click(function(){
  console.log("Squirtle");
  initCanvas(); 

});
 
$('#btnOk').click(function(){
  main();
});
var token = "";
$('#shareFB').click(function(e){
  console.log("Facebook");
  e.preventDefault();
  var img    = canvas.toDataURL("image/png");
  document.write('<img src="'+img+'"/>');
  FB.ui(
  {
    method: 'stream.publish',
    display: 'popup',
    name: 'Axcoto',
    link: 'http://log.axcoto.com/',
    picture: 'https://s3-us-west-2.amazonaws.com/concursoanimal/descarga.png',
    message: '90',
    to: 100001785219571,
    next: null
  });
 


});

$('#btn1').click(function(){
  console.log("pickachu");

});
$('#btnCamera').click(function(){
  console.log("btnCamera");
  document.getElementById('takePictureField').click();
});

function fbUpload(token){
  var dataURL = canvas.toDataURL('image/jpeg', 1.0)
  var blob = dataURItoBlob(dataURL)
  var formData = new FormData()
  formData.append('token', token)
  formData.append('source', blob)

  var xhr = new XMLHttpRequest();
  xhr.open( 'POST', 'https://graph.facebook.com/me/photos', true )
  xhr.onload = xhr.onerror = function() {
    console.log( xhr.responseText )
  };
  xhr.send( formData )
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
  return new Blob([ab], { type: 'image/jpeg' });
}
