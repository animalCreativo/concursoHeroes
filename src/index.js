var page = require('page')
var yo = require('yo-yo')
var empty = require('empty-element')

var main = document.getElementById('main-container')

page('/',function(ctx,next){
	var el = yo `<article>
					<section class="redesSociales"> 
					<div id ="rowShareFacebook" class="row align-center align-middle">
						<div id = "columnShareFacebook" class="columns">
							<button id="shareFB" class="button"> </button>
						</div>	
				    </div>	
		            </section>
		            <section class="fondo">                
	                 	<div class="row align-center" id="camera">
					    	<div id="calloutCamera" class="callout alert">
					        	<a id="btnCameraCanvas" class="button"></a> 
					        	<canvas id="canvas"></canvas>
					      	</div>
					      	<div class="reveal" id="menuEmoticons" data-reveal data-closable>
								<div class="row">
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons1" class="button"></a>
								  </div>
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons2" class="button"></a>
								  </div>
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons3" class="button"></a>
								  </div>
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons4" class="button"></a>
								  </div>
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons5" class="button"></a>
								  </div>
								  <div class="small-4 large-3 columns">
									<a id="btnEmoticons6" class="button"></a>
								  </div>
								</div>

						      	<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonEmoticons">
						   			<span aria-hidden="true">x</span>
						  	  	</button>
						  	</div>
						   	<div class="reveal" id="menuLabels" data-reveal>
						   		<div class="row">
								  <div class="small-6 large-6 columns">
									<a id="btnLabel1" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnLabel2" class="button"></a>
								  </div>
								</div>
						      	<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonLabels">
						   			<span aria-hidden="true">x</span>
						  	  	</button>
						  	</div>
						  	<div class="reveal" id="menuFilters" data-reveal>
						   		<div class="row">
								  <div class="small-6 large-6 columns">
									<a id="btnFilter1" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnFilter2" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnFilter3" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnFilter4" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnFilter5" class="button"></a>
								  </div>
								  <div class="small-6 large-6 columns">
									<a id="btnFilter6" class="button"></a>
								  </div>
								</div>
						      	<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonFilters">
						   			<span aria-hidden="true">x</span>
						  	  	</button>
						  	</div>
						  		<div class="reveal" id="menuPencils" data-reveal>
						   		<div class="row">
								  <div class="small-4 large-4 columns">
									<a id="btnColor1" class="button"></a>
								  </div>
								  <div class="small-4 large-4 columns">
									<a id="btnColor2" class="button"></a>
								  </div>
								  <div class="small-4 large-4 columns">
									<a id="btnColor3" class="button"></a>
								  </div>
								  <div class="small-4 large-4 columns">
									<a id="btnColor4" class="button"></a>
								  </div>
								  <div class="small-4 large-4 columns">
									<a id="btnColor5" class="button"></a>
								  </div>
								  <div class="small-4 large-4 columns">
									<a id="btnColor6" class="button"></a>
								  </div>
								</div>
						      	<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonPencils">
						   			<span aria-hidden="true">x</span>
						  	  	</button>
						  	</div>

					    </div>
	                	<div class="row align-center" id="panel">
					    	<div id="calloutPanel" class="callout primary">
					      		<div class="expanded button-group" id="controles"  >
					      			<button id="btnClear" class="button">  </button>
						      		<input type="file" capture="camera" accept="image/*" id="takePictureField" style="display: none;" />
						      		<button class="button" id = "btnCamera" type="button" value="Camara" onclick="document.getElementById('takePictureField').click();">  </button>
						      		<button id="btnOk" class="button">  </button> 
					      		</div>
					        	<div class="row" id="tools" >
					        		<div id="colTools1" class="column small-3" data-open="menuFilters"> 
					        		  		
									         <svg id ="btnFilters"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    
									         <defs>
										        <circle id="path-1" cx="256" cy="256" r="256"/>
										    </defs>
										    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										        <g id="Artboard-3" transform="translate(-2411.000000, -702.000000)">
										            <g id="filter" transform="translate(2411.000000, 702.000000)">
										                <mask fill="white">
										                    <use xlink:href="#path-1"/>
										                </mask>
										                <use id="fillBtnFiltros" fill="#5C6BC0" xlink:href="#path-1"/>
										                <g id="Group" mask="url(#mask-2)">
										                    <g transform="translate(49.000000, 67.000000)">
										                        <g transform="translate(0.000000, 106.000000)">
										                            <polygon id="fillBtnFiltrosRectangle" fill="#212121" points="17.8 299.8 0.4 282.4 232 51 249.5 68.4"/>
										                            <rect id="fillBtnFiltros1" fill="#F5F5F5" transform="translate(266.074325, 34.336595) rotate(45.000000) translate(-266.074325, -34.336595) " x="253.774443" y="-1.5130612" width="24.5997641" height="71.6993124"/>
										                        </g>
										                        <g transform="translate(161.000000, 0.000000)">
										                            <polygon id="Shape" fill="#F5F5F5" points="48.3 0.9 59.6 11.1 74.4 7.6 68.2 21.5 76.2 34.5 61 32.9 51.1 44.5 48 29.6 33.9 23.7 47.1 16.1"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="18 74.4 14.3 79.3 16.2 85.1 10.4 83.1 5.5 86.8 5.6 80.6 0.6 77.1 6.4 75.3 8.3 69.4 11.8 74.5"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="59.8 123.8 53.9 131.5 57 140.8 47.8 137.6 40 143.4 40.2 133.7 32.2 128 41.5 125.2 44.5 115.9 50 123.9"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="100.9 93.9 97.2 98.8 99.1 104.6 93.3 102.6 88.4 106.3 88.5 100.1 83.5 96.5 89.4 94.7 91.2 88.9 94.7 93.9"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="136.5 38.6 130.6 46.4 133.7 55.6 124.5 52.4 116.7 58.2 116.9 48.5 109 42.8 118.3 40 121.2 30.7 126.8 38.7"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="205.8 20.7 200 34.8 208.3 47.5 193.1 46.4 183.6 58.2 180 43.4 165.7 38 178.7 30 179.5 14.8 191.1 24.6"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="171.1 97.4 167.4 102.3 169.3 108.2 163.5 106.2 158.6 109.8 158.7 103.7 153.7 100.1 159.6 98.3 161.4 92.5 164.9 97.5"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="244.5 85.2 240.8 90.1 242.8 95.9 237 93.9 232 97.6 232.1 91.4 227.1 87.9 233 86.1 234.8 80.2 238.4 85.2"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="176.1 148.2 170.3 156 173.4 165.2 164.2 162 156.4 167.8 156.5 158.1 148.6 152.4 157.9 149.6 160.8 140.3 166.4 148.3"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="256.1 148.1 249.3 161.7 256.7 175 241.6 172.8 231.3 183.9 228.7 168.9 214.9 162.5 228.4 155.4 230.3 140.3 241.2 151"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="159.7 205.8 158.5 221 170.3 230.6 155.5 234.2 150.1 248.4 142.1 235.4 126.9 234.6 136.8 223 132.8 208.3 146.9 214.1"/>
										                            <polygon id="Shape" fill="#FFFFFF" points="235.8 221.2 230 229 233.1 238.2 223.9 235.1 216.1 240.9 216.2 231.1 208.3 225.5 217.6 222.6 220.5 213.4 226.1 221.3"/>
										                        </g>
										                    </g>
										                </g>
										            </g>
										        </g>
										    </g>

											</svg>
								
					        		</div>
  									<div id="colTools2" class="column small-3" data-open="menuEmoticons" > 
	  									 <svg id ="btnEmoticons"  height="60px" width="60px" viewBox="0 0 127 127" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										
	  									     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										        <g id="Artboard-3" transform="translate(-1782.000000, -1176.000000)">
										            <g id="emoticon" transform="translate(1782.000000, 1176.000000)">
										                <circle id="fillBtnEmoticons" fill="#FFC10E" cx="63.5" cy="63.417" r="63.333"/>
										                <path d="M44.256,43.721 C49.7490241,43.721 54.202,39.5218787 54.202,34.342 C54.202,29.1621213 49.7490241,24.963 44.256,24.963 C38.7629759,24.963 34.31,29.1621213 34.31,34.342 C34.31,39.5218787 38.7629759,43.721 44.256,43.721 Z M63.499,114.677 C79.1325244,114.677 91.806,102.108737 91.806,86.605 C91.806,71.1012625 79.1325244,58.533 63.499,58.533 C47.8654756,58.533 35.192,71.1012625 35.192,86.605 C35.192,102.108737 47.8654756,114.677 63.499,114.677 Z M81.86,50.954 C91.0351065,50.954 98.473,43.5161065 98.473,34.341 C98.473,25.1658935 91.0351065,17.728 81.86,17.728 C72.6848935,17.728 65.247,25.1658935 65.247,34.341 C65.247,43.5161065 72.6848935,50.954 81.86,50.954 Z" id="fillBtnEmoticonsInside" fill="#333333"/>
										            </g>
										        </g>
										    </g>
										</svg>
  									</div>
  									<div id="colTools3" class="column small-3" data-open="menuLabels"> 
  								
  								     <svg id ="btnLabels"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <circle id="path-1" cx="256" cy="256" r="256"/>
											    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g id="Artboard-3" transform="translate(-1589.000000, -530.000000)">
											            <g id="text" transform="translate(1589.000000, 530.000000)">
											                <mask id="mask-2" fill="white">
											                    <use xlink:href="#path-1"/>
											                </mask>
											                <use id="fillBtnLabels" fill="#F6A623" xlink:href="#path-1"/>
											                <path d="M338.544218,145.5 L273.857143,145.5 L273.857143,366 L322.809524,378.25 L322.809524,390.5 L188.190476,390.5 L188.190476,378.25 L237.142857,366 L237.142857,145.5 L172.455782,145.5 L163.714286,206.75 L139.238095,206.75 L139.238095,121 L157.595238,121 L353.404762,121 L371.761905,121 L371.761905,206.75 L347.285714,206.75 L338.544218,145.5 Z" id="Combined-Shape" fill="#FFFFFF" mask="url(#mask-2)"/>
											            </g>
											        </g>
											    </g>
											</svg>
					        		   
					        		</div>
  									<div id="colTools4" class="column small-3" data-open="menuPencils"> 
  									    <svg id ="btnPencils"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										        <g id="Artboard-3" transform="translate(-2462.000000, -1285.000000)">
										            <g id="pencil" transform="translate(2462.000000, 1285.000000)">
										                <circle id="fillBtnPencils" fill="#FC5454" cx="256" cy="256" r="256"/>
										                <g id="Painting_Tools" transform="translate(132.000000, 128.000000)">
										                    <g id="Painting_Tools_1_">
										                        <g id="Pallet">
										                            <path d="M226.947,121.323 C187.947,116.823 142.947,188.823 115.114,135.489 C98.175,103.031 158.705,87.411 173.114,58.823 C199.197,7.073 136.665,0.597 127.566,0.597 C57.204,0.597 0.164,57.637 0.164,127.999 C0.164,198.361 57.204,255.401 127.566,255.401 C176.683,255.401 219.301,227.602 240.564,186.883 C250.683,162.947 253.567,124.395 226.947,121.323 Z" id="Shape" fill="#F1F2F2"/>
										                            <circle id="fillBtnPencilsOval1" fill="#6CBE45" cx="107.802" cy="34.23" r="20.978"/>
										                            <circle id="fillBtnPencilsOval2" fill="#F7EC23" cx="42.947" cy="90.323" r="20.978"/>
										                            <circle id="fillBtnPencilsOval3" fill="#EE2435" cx="42.947" cy="170.823" r="20.978"/>
										                            <circle id="fillBtnPencilsOval4" fill="#71D0F6" cx="119.694" cy="225.823" r="20.978"/>
										                            <circle id="fillBtnPencilsOval5" fill="#9C6FB0" cx="202.947" cy="181.823" r="20.978"/>
										                        </g>
										                        <g id="Brush" transform="translate(75.000000, 43.000000)">
										                            <path d="M152.268,18.259 C157.888,12.219 161.516,6.308 160.331,5.122 C159.146,3.936 157.204,1.996 156.018,0.809 C154.832,-0.378 148.92,3.251 142.881,8.872 L40.58,104.072 C34.541,109.692 31.54,116.231 33.912,118.603 C36.284,120.975 40.165,124.857 42.537,127.228 C44.909,129.6 51.448,126.599 57.068,120.56 L152.268,18.259 Z" id="pencilBarra1" fill="#000000"/>
										                            <path d="M46.884,114.255 C40.978,108.35 31.3,108.453 25.265,114.486 L35.958,125.18 L46.651,135.873 C52.687,129.84 52.79,120.161 46.884,114.255 Z" id="pencilBarra2" fill="#000000"/>
										                            <path d="M25.469,114.689 C25.469,114.689 -6.306,125.509 1.744,159.8 C1.744,159.8 8.827,154.661 18.648,154.778 C42.374,155.139 46.855,136.076 46.855,136.076 L25.469,114.689 Z" id="pencilBarra3" fill="#DB8F27"/>
										                        </g>
										                    </g>
										                </g>
										            </g>
										        </g>
										    </g>   

										</svg>
									
  									</div>

  									
					        	</div>
					    	</div>
					    </div>
					 
	                </section>
	                  
                  </article>
	            `
	empty(main).appendChild(el)
})

page()
