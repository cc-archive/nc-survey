
<!-- Paste this code into an external JavaScript file named: scrollWin.js  -->

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Travis Beckham :: http://www.squidfingers.com | http://www.podlob.com */

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//
// Coded by Travis Beckham
// http://www.squidfingers.com | http://www.podlob.com
// If want to use this code, feel free to do so, but please leave this message intact.
//
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// --- version date: 02/04/03 ---------------------------------------------------------
/*

If you use a DOCTYPE that puts Explorer 6 in standards compliant mode, some properties
of document.body are reassigned to document.documentElement. In Explorer 5 the
properties still belong to document.body. Checking if the documentElement exists is not
enough, since it exists in all W3C DOM compatible browsers, so we also have to see if
it has the property we are trying to access.
For more info on this topic visit http://www.xs4all.nl/~ppk/js/doctypes.html

*/
var ScrollWin = {
  w3c : document.getElementById,
    iex : document.all,
      scrollLoop : false,
        scrollInterval : null, // setInterval id
	  currentBlock : null,   // object reference
	    getWindowHeight : function(){
	        if(this.iex) return (document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.clientHeight;
		    else return window.innerHeight;
		      },
		        getScrollLeft : function(){
			    if(this.iex) return (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
			        else return window.pageXOffset;
				  },
				    getScrollTop : function(){
				        if(this.iex) return (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
					    else return window.pageYOffset;
					      },
					        getElementYpos : function(el){
						    var y = 0;
						        while(el.offsetParent){
							      y += el.offsetTop
							            el = el.offsetParent;
								        }
									    return y;
									      },
									        scroll : function(num){
										    if(!this.w3c){
										          location.href = "#"+this.anchorName+num;
											        return;
												    }
												        if(this.scrollLoop){
													      clearInterval(this.scrollInterval);
													            this.scrollLoop = false;
														          this.scrollInterval = null;
															      }
															          if(this.currentBlock != null) this.currentBlock.className = this.offClassName;
																      this.currentBlock = document.getElementById(this.blockName+num);
																          this.currentBlock.className = this.onClassName;
																	      var doc = document.getElementById(this.containerName);
																	          var documentHeight = this.getElementYpos(doc) + doc.offsetHeight;
																		      var windowHeight = this.getWindowHeight();
																		          var ypos = this.getElementYpos(this.currentBlock);
																			      if(ypos > documentHeight - windowHeight) ypos = documentHeight - windowHeight;
																			          this.scrollTo(0,ypos);
																				    },
																				      scrollTo : function(x,y){
																				          if(this.scrollLoop){
																					        var left = this.getScrollLeft();
																						      var top = this.getScrollTop();
																						            if(Math.abs(left-x) <= 1 && Math.abs(top-y) <= 1){
																							            window.scrollTo(x,y);
																								            clearInterval(this.scrollInterval);
																									            this.scrollLoop = false;
																										            this.scrollInterval = null;
																											          }else{
																												          window.scrollTo(left+(x-left)/2, top+(y-top)/2);
																													        }
																														    }else{
																														          this.scrollInterval = setInterval("ScrollWin.scrollTo("+x+","+y+")",100);
																															        this.scrollLoop = true;
																																    }
																																      }
																																      };

																																      // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
																																      /*
																																      using the following line, IE/PC returns an incorrect number when getting the document height.
																																      var document_height = document.all ? document.body.offsetHeight : window.document.height;
																																      To fix this problem, a container div is wrapped around the content so the correct height
																																      can be determined.
																																      */

																																      // Edit these variables

																																      ScrollWin.containerName = "container"; // The id name of the div containing the content
																																      ScrollWin.anchorName    = "anchor";    // The alpha portion of the anchor names
																																      ScrollWin.blockName     = "block";     // The alpha portion of the content blocks
																																      ScrollWin.onClassName   = "active";    // The CSS class name for the 'on' state
																																      ScrollWin.offClassName  = "visited";   // The CSS class name for the 'off' state



																																      <!-- Paste this code into an external JavaScript file named: popUp.js  -->

																																      /* This script and many more are available free online at
																																      The JavaScript Source :: http://javascript.internet.com
																																      Created by: Travis Beckham :: http://www.squidfingers.com | http://www.podlob.com */

																																      /* Created by Jeremy Keith
																																        http://domscripting.com */
																																	function doPopups() {
																																	  if (!document.getElementsByTagName) return false;
																																	    var links=document.getElementsByTagName("a");
																																	      for (var i=0; i < links.length; i++) {
																																	          if (links[i].className.match("popup")) {
																																		        links[i].onclick=function() {
																																			        // Below - to open a full-sized window, just use: window.open(this.href);
																																				        window.open(this.href, "", "top=40,left=40,width=550,height=450");
																																					        return false;
																																						      }
																																						          }
																																							    }
																																							    }
																																							    window.onload=doPopups;



																																							    <!-- Paste this code into the CSS section of your HTML document
																																							         that will hold the text to be displayed.  -->

																																								 #container{
																																								   text-align: left;
																																								     background-color: #faf7ec;
																																								       width: 500px;
																																								         margin: 20px auto 0 auto;
																																									   padding: 0;
																																									   }
																																									   #block0, #block1, #block2, #block3, #block4, #block5 {
																																									     border-top: solid 1px #785a3c;
																																									       margin: 0;
																																									         padding: 10px;
																																										 }
																																										 .active {
																																										   background-color: #fff;
																																										   }
																																										   .visited {
																																										     background-color: #ede7da;
																																										     }
																																										     #block0, #block0.active, #block0.visited {
																																										       text-align: center;
																																										         background-color: #a0dcf8;
																																											   border-top: none;
																																											     border-bottom: solid 4px #785a3c;
																																											     }



																																											     <!-- Paste this code into the HEAD section of your HTML document
																																											          that will hold the text to be displayed.
																																												       You may need to change the path of the file.  -->

																																												       <script type="text/javascript" src="scrollWin.js"></script>



																																												       <!-- Paste this code into the BODY section of your HTML document
																																												            that will hold the text to be displayed.  -->

																																													    <div align="center">
																																													    <div id="container">
																																													      <a name="anchor0"></a>
																																													        <div id="block0">
																																														    <a href="javascript:ScrollWin.scroll('1')">Section 1</a> |
																																														        <a href="javascript:ScrollWin.scroll('2')">Section 2</a> |
																																															    <a href="javascript:ScrollWin.scroll('3')">Section 3</a> |
																																															        <a href="javascript:ScrollWin.scroll('4')">Section 4</a> |
																																																    <a href="javascript:ScrollWin.scroll('5')">Section 5</a>
																																																      </div>
																																																        <a name="anchor1"></a>
																																																	  <div id="block1">
																																																	      <h3><a href="#" onclick="javascript:ScrollWin.scroll('0'); return false;">Back to top</a>   Section 1</h3>
																																																	          <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
																																																		    </div>
																																																		      <a name="anchor2"></a>
																																																		        <div id="block2">
																																																			    <h3><a href="#" onclick="javascript:ScrollWin.scroll('0'); return false;">Back to top</a>   Section 2</h3>
																																																			        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
																																																				  </div>
																																																				    <a name="anchor3"></a>
																																																				      <div id="block3">
																																																				          <h3><a href="#" onclick="javascript:ScrollWin.scroll('0'); return false;">Back to top</a>   Section 3</h3>
																																																					      <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
																																																					        </div>
																																																						  <a name="anchor4"></a>
																																																						    <div id="block4">
																																																						        <h3><a href="#" onclick="javascript:ScrollWin.scroll('0'); return false;">Back to top</a>   Section 4</h3>
																																																							    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
																																																							      </div>
																																																							        <a name="anchor5"></a>
																																																								  <div id="block5">
																																																								      <h3><a href="#" onclick="javascript:ScrollWin.scroll('0'); return false;">Back to top</a>   Section 5</h3>
																																																								          <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
																																																									    </div>
																																																									    </div>
																																																									    </div>
																																																									    <p><div align="center">
																																																									    <font face="arial, helvetica" size"-2">Free JavaScripts provided<br>
																																																									    by <a href="http://javascriptsource.com">The JavaScript Source</a></font>
																																																									    </div><p>



																																																									    <!-- Paste this code into the HEAD section of your HTML document
																																																									         that will be used to call the scroll document.  -->

																																																										 <script type="text/javascript" src="popUp.js"></script>



																																																										 <!-- Paste this code into the BODY section of your HTML document
																																																										      that will be used to call the scroll document.  -->

																																																										      <a href="scrollWin.html" class="popup">Demonstrate the script here!</a>



