$(document).foundation();

var canvas = new fabric.Canvas('canvas');

var flagPhoto = false;
var fabricPhoto = null;

canvas.on({
    "mouse:down": function (o) {
            var pointer = canvas.getPointer(o.e);
            console.info("Mouse Coords: "+pointer.x+" "+pointer.y);
    },
    "touch:longpress": function (ev) {
            console.info("Touch Coords: "+ev.self.x+" "+ev.self.y);
    },
});


window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.setHeight(window.innerHeight*0.55);
    canvas.setWidth(window.innerWidth);
    canvas.renderAll();
  }

  // resize on init
resizeCanvas();

hiddenButtons();

function hiddenButtons(){
  document.getElementById("colTools1").removeAttribute("data-open");
  document.getElementById("colTools2").removeAttribute("data-open");
  document.getElementById("colTools3").removeAttribute("data-open");
  document.getElementById("colTools4").removeAttribute("data-open");

  document.getElementById("fillBtnFiltros").style.fill = "gray";
  document.getElementById("fillBtnFiltrosRectangle").style.fill = "white";
  document.getElementById("fillBtnEmoticons").style.fill = "gray";
  document.getElementById("fillBtnEmoticonsInside").style.fill = "white";
  document.getElementById("fillBtnLabels").style.fill = "gray";
  document.getElementById("fillBtnPencils").style.fill = "gray";
  document.getElementById("fillBtnPencilsOval1").style.fill = "gray";
  document.getElementById("fillBtnPencilsOval2").style.fill = "gray";
  document.getElementById("fillBtnPencilsOval3").style.fill = "gray";
  document.getElementById("fillBtnPencilsOval4").style.fill = "gray";
  document.getElementById("fillBtnPencilsOval5").style.fill = "gray";
  document.getElementById("pencilBarra1").style.fill = "white";
  document.getElementById("pencilBarra2").style.fill = "white";
  document.getElementById("pencilBarra3").style.fill = "gray";

  document.getElementById("btnLabels").disabled = true; 
  document.getElementById("btnEmoticons").disabled = true;
  document.getElementById("btnPencils").disabled = true;
  document.getElementById("btnFilters").disabled = true; 

}
function dishiddenButtons(){
  document.getElementById("colTools1").setAttribute("data-open","menuFilters");
  document.getElementById("colTools2").setAttribute("data-open","menuEmoticons");
  document.getElementById("colTools3").setAttribute("data-open","menuLabels");
  document.getElementById("colTools4").setAttribute("data-open","menuPencils");

  document.getElementById("fillBtnFiltros").style.fill = "#5C6BC0";
  document.getElementById("fillBtnFiltrosRectangle").style.fill = "#21212";
  document.getElementById("fillBtnEmoticons").style.fill = "#FFC10E";
  document.getElementById("fillBtnEmoticonsInside").style.fill = "#333333";
  document.getElementById("fillBtnLabels").style.fill = "#F6A623";
  document.getElementById("fillBtnPencils").style.fill = "#FC5454";
  document.getElementById("fillBtnPencilsOval1").style.fill = "#6CBE45";
  document.getElementById("fillBtnPencilsOval2").style.fill = "#F7EC23";
  document.getElementById("fillBtnPencilsOval3").style.fill = "#EE2435";
  document.getElementById("fillBtnPencilsOval4").style.fill = "#71D0F6";
  document.getElementById("fillBtnPencilsOval5").style.fill = "#9C6FB0";
  document.getElementById("pencilBarra1").style.fill = "#000000";
  document.getElementById("pencilBarra2").style.fill = "#000000";
  document.getElementById("pencilBarra3").style.fill = "#DB8F27";

  document.getElementById("btnPencils").disabled = false;
  document.getElementById("btnFilters").disabled = false; 
  document.getElementById("btnLabels").disabled = false; 
  document.getElementById("btnEmoticons").disabled = false;

}

function onPencils(){
  document.getElementById("fillBtnFiltros").style.fill = "gray";
  document.getElementById("fillBtnFiltrosRectangle").style.fill = "white";
  document.getElementById("fillBtnEmoticons").style.fill = "gray";
  document.getElementById("fillBtnEmoticonsInside").style.fill = "white";
  document.getElementById("fillBtnLabels").style.fill = "gray";


}

function offPencils(){
  document.getElementById("fillBtnFiltros").style.fill = "#5C6BC0";
  document.getElementById("fillBtnFiltrosRectangle").style.fill = "#21212";
  document.getElementById("fillBtnEmoticons").style.fill = "#FFC10E";
  document.getElementById("fillBtnEmoticonsInside").style.fill = "#333333";
  document.getElementById("fillBtnLabels").style.fill = "#F6A623";
 
}


$('#btnEmoticons1').click(function(){
  console.log("pickachu");
  fabric.loadSVGFromURL('pika.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 10, top: 100 }).scale(0.2));
    proceed();
  });
  canvas.isDrawingMode = false;
  $('#menuEmoticons').foundation('close');
});

$('#btnEmoticons2').click(function(){
  console.log("Squirtle");
  fabric.loadSVGFromURL('sq.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 100, top: 100 }).scale(0.2));
    proceed();
  });  
  canvas.isDrawingMode = false;
  $('#menuEmoticons').foundation('close');
});

$('#btnEmoticons3').click(function(){
  console.log("charmander");
  fabric.loadSVGFromURL('ch.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 200, top: 100 }).scale(0.2));
    proceed();
  });
  canvas.isDrawingMode = false;
  $('#menuEmoticons').foundation('close');
});

$('#btnEmoticons4').click(function(){
  console.log("Squirtle");
  fabric.loadSVGFromURL('sq.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 10, top: 200 }).scale(0.2));
    proceed();
  });  
  canvas.isDrawingMode = false;
  $('#menuEmoticons').foundation('close');
});

$('#btnEmoticons5').click(function(){
  console.log("Squirtle");
  fabric.loadSVGFromURL('ch.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 100, top: 200 }).scale(0.2));
    proceed();
  });  
  canvas.isDrawingMode = false;
  $('#menuEmoticons').foundation('close');
});

$('#btnEmoticons6').click(function(){
  console.log("Squirtle");
  fabric.loadSVGFromURL('pika.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 200, top: 200 }).scale(0.2));
    proceed();
  });  
  canvas.isDrawingMode = false;
 $('#menuEmoticons').foundation('close');
});

$('#btnLabel1').click(function(){
  console.log("label1");
  fabric.loadSVGFromURL('texto1.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 10, top: 100 }).scale(1.2));
    proceed();
  });
  canvas.isDrawingMode = false;
  $('#menuLabels').foundation('close');
});
 
$('#btnLabel2').click(function(){
  console.log("label2");
  fabric.loadSVGFromURL('texto2.svg', function(ob,op){
    canvas.add(new fabric.PathGroup(ob, op).set({ left: 10, top: 100 }).scale(1.2));
    proceed();
  });
  canvas.isDrawingMode = false;
  $('#menuLabels').foundation('close');
});


var token = "";
$('#shareFB').click(function(e){
  console.log("Facebook");
 /* e.preventDefault();
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
 */
 if(!window.localStorage){alert("This function is not supported by your browser."); return;}
    // to PNG
    window.open(canvas.toDataURL('png'));

});


$('#btnClear').click(function(){
  console.log("btnClear");
  canvas.getActiveObject().remove();
});

$('#btnOk').click(function(){
  console.log("btnOk");
  var img = new Image();
  img.onload = function(){
     canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
              originX: 'left',
              originY: 'top',
              left: 0,
              top: 0
          });
  };
  var objectoActivo = canvas.getActiveObject();

  if (!flagPhoto && (objectoActivo != null)){
      fabricPhoto = objectoActivo;
      console.log("objeto"+objectoActivo);
      objectoActivo.selectable = false;
      canvas.deactivateAll().renderAll();
      flagPhoto = true;
      dishiddenButtons();
  }else if (flagPhoto && (objectoActivo != null)){
      console.log("objeto"+objectoActivo);
      objectoActivo.selectable = false;
      canvas.deactivateAll().renderAll();
  } 

});



$('#btnCamera').click(function(){
  console.log("btnCamera");
  flagPhoto = false;
  hiddenButtons();
  filtersReboot();
  document.getElementById('takePictureField').click();
});
/*
$('#btnCameraCanvas').click(function(){
  console.log("btnCameraCanvas");
  document.getElementById('takePictureField').click();
});
*/


var filters = [
    new fabric.Image.filters.Grayscale(),       // grayscale    0
    new fabric.Image.filters.Sepia2(),          // sepia        1
    new fabric.Image.filters.Invert(),          // invert       2
    new fabric.Image.filters.Convolute({        // emboss       3
        matrix: [ 1, 1, 1,
                 1, 0.7, -1,
                 -1, -1, -1 ]
    }),
    new fabric.Image.filters.Convolute({        // sharpen      4
        matrix: [  0, -1, 0,
                -1, 5, -1,
                0, -1, 0 ]
    }),
    new fabric.Image.filters.Convolute({        // blur         5
        matrix: [ 1/9, 1/9, 1/9,
                1/9, 1/9, 1/9,
                1/9, 1/9, 1/9 ]
    })
];

var flagBtnFilter1 = false;
var flagBtnFilter2 = false;
var flagBtnFilter3 = false;
var flagBtnFilter4 = false;
var flagBtnFilter5 = false;
var flagBtnFilter6 = false;

function filtersReboot(){
  var x1 = document.getElementById("btnFilter1");
  var x2 = document.getElementById("btnFilter2");
  var x3 = document.getElementById("btnFilter3");
  var x4 = document.getElementById("btnFilter4");
  var x5 = document.getElementById("btnFilter5");
  var x6 = document.getElementById("btnFilter6");
  x1.style.backgroundColor = "transparent";
  x2.style.backgroundColor = "transparent";
  x3.style.backgroundColor = "transparent";
  x4.style.backgroundColor = "transparent";
  x5.style.backgroundColor = "transparent";
  x6.style.backgroundColor = "transparent";
  flagBtnFilter1 = false;
  flagBtnFilter2 = false;
  flagBtnFilter3 = false;
  flagBtnFilter4 = false;
  flagBtnFilter5 = false;
  flagBtnFilter6 = false;
}



$('#btnFilter1').click(function(){
 // console.log("btnFilter1");
  filter = 0;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter1");
    if (!flagBtnFilter1){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter1 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter1 = false;
    }
  }
  $('#menuFilters').foundation('close');
});

$('#btnFilter2').click(function(){
 // console.log("btnFilter2");
  filter = 1;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter2");
    if (!flagBtnFilter2){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter2 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter2 = false;
    }
  }

  $('#menuFilters').foundation('close');
});


$('#btnFilter3').click(function(){
  //console.log("btnFilter3");
  filter = 2;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter3");
    if (!flagBtnFilter3){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter3 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter3 = false;
    }
  }

  $('#menuFilters').foundation('close');
});

$('#btnFilter4').click(function(){
 // console.log("btnFilter4");
  filter = 3;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter4");
    if (!flagBtnFilter4){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter4 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter4 = false;
    }
  }

  $('#menuFilters').foundation('close');
});

$('#btnFilter5').click(function(){
  //console.log("btnFilter5");
  filter = 4;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter5");
    if (!flagBtnFilter5){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter5 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter5 = false;
    }
  }

  $('#menuFilters').foundation('close');
});

$('#btnFilter6').click(function(){
  //console.log("btnFilter6");
  filter = 5;
  if (flagPhoto && (fabricPhoto != null )){
    
    var x = document.getElementById("btnFilter6");
    if (!flagBtnFilter6){
      fabricPhoto.filters[filter] =  filters[filter] ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "green";
      flagBtnFilter6 = true;
    }else{
      fabricPhoto.filters[filter] =  null ;
      fabricPhoto.applyFilters(function () {
       canvas.renderAll();
      });
      x.style.backgroundColor = "transparent";
      flagBtnFilter6 = false;
    }
  }

  $('#menuFilters').foundation('close');
});

var flagbtnPencils = false;

$('#btnEmoticons').click(function(){
  console.log("btnEmoticons");
  if (flagbtnPencils){
    flagbtnPencils = false;
    canvas.isDrawingMode = false;
    offPencils();
  }
});
$('#btnFilters').click(function(){
  console.log("btnFilters");
  if (flagbtnPencils){
    flagbtnPencils = false;
    canvas.isDrawingMode = false;
    offPencils();
  }
});
$('#btnLabels').click(function(){
  console.log("btnLabels");
  if (flagbtnPencils){
    flagbtnPencils = false;
    canvas.isDrawingMode = false;
    offPencils();
  }
});

$('#btnPencils').click(function(){
 console.log("btnPencils");

});

$('#closeButtonEmoticons').click(function(){
  console.log("btnExit");
  
 $('#menuEmoticons').foundation('close');
});

$('#closeButtonLabels').click(function(){
  console.log("btnExit");
 $('#menuLabels').foundation('close');
});

$('#closeButtonPencils').click(function(){
  console.log("btnExit");
 $('#menuPencils').foundation('close');
});

$('#closeButtonFilters').click(function(){
  console.log("btnExit");
 $('#menuFilters').foundation('close');
});



$('#btnColor1').click(function(){
  console.log("btnColor1");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#2196F3";
  canvas.freeDrawingBrush.width = "8";
  if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }

  $('#menuPencils').foundation('close');


});
$('#btnColor2').click(function(){
  console.log("btnColor2");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#9C27B0";
  canvas.freeDrawingBrush.width = "8";
   if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }
  $('#menuPencils').foundation('close');
});


$('#btnColor3').click(function(){
  console.log("btnColor3");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#F44336";
  canvas.freeDrawingBrush.width = "8";
  if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }
  $('#menuPencils').foundation('close');
});
$('#btnColor4').click(function(){
  console.log("btnColor4");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#3F51B5";
  canvas.freeDrawingBrush.width = "8";
  if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }
  $('#menuPencils').foundation('close');
});
$('#btnColor5').click(function(){
  console.log("btnColor5");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#FFFFFF";
  canvas.freeDrawingBrush.width = "8";
  if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }

  $('#menuPencils').foundation('close');
});
$('#btnColor6').click(function(){
  console.log("btnColor6");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#8BC34A";
  canvas.freeDrawingBrush.width = "8";
  if (!flagbtnPencils){
    flagbtnPencils = true;
    onPencils();
  }

  $('#menuPencils').foundation('close');
});
$(document).ready(function() {
    console.log('onReady');
  $("#takePictureField").on("change",gotPic);

  desiredWidth = window.innerWidth;
    if(!("url" in window) && ("webkitURL" in window)) {
        window.URL = window.webkitURL;   
    }
  
});

function gotPic(event) {

  if(event.target.files.length == 1 && 
       event.target.files[0].type.indexOf("image/") == 0) {

      stringUrl = URL.createObjectURL(event.target.files[0]);
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (f) {
        var data = f.target.result;                    
        fabric.Image.fromURL(data, function (img) {
          if (isMobile){
            var oImg = img.set({left: 200, top: 30, angle: 90,width: img.width, height:img.height}).scale(0.5);
          }else {
            var oImg = img.set({left: 200, top: 30, angle: 0,width: img.width, height:img.height}).scale(0.5); 
          }
          canvas.add(oImg).renderAll();
          var a = canvas.setActiveObject(oImg);
          var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
          
        });
      };
      reader.readAsDataURL(file);
      document.getElementById('btnCameraCanvas').style.visibility = 'hidden';
      canvas.clear() ;
      canvas.isDrawingMode = false;
      x = document.getElementById("btnFilters");
      flagbtnPencils = false;
      hiddenButtons();

    }
}

 var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true; 


/*  CANVAS TO IMAGE      */

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

/*  IMAGE TO FACEBOOK      */
    
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



