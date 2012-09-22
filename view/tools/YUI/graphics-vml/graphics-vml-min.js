/*
YUI 3.6.0pr3 (build 1)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("graphics-vml",function(b){var k="vmlShape",m=b.Lang,h=m.isNumber,i=m.isArray,e=m.isString,p=b.DOM,q=b.Selector,d=b.config.doc,g=b.AttributeLite,r,a,s,f,j,o,n,c=b.ClassNameManager.getClassName;function l(){}l.prototype={_coordSpaceMultiplier:100,_round:function(t){return Math.round(t*this._coordSpaceMultiplier);},_addToPath:function(t){this._path=this._path||"";if(this._movePath){this._path+=this._movePath;this._movePath=null;}this._path+=t;},_currentX:0,_currentY:0,curveTo:function(z,u,H,G,D,C){var E,A,I,F,v,t,B;this._addToPath(" c "+this._round(z)+", "+this._round(u)+", "+this._round(H)+", "+this._round(G)+", "+this._round(D)+", "+this._round(C));F=Math.max(D,Math.max(z,H));t=Math.max(C,Math.max(u,G));v=Math.min(D,Math.min(z,H));B=Math.min(C,Math.min(u,G));E=Math.abs(F-v);A=Math.abs(t-B);I=[[this._currentX,this._currentY],[z,u],[H,G],[D,C]];this._setCurveBoundingBox(I,E,A);this._currentX=D;this._currentY=C;},quadraticCurveTo:function(A,z,C,B){var u=this._currentX,t=this._currentY,w=u+0.67*(A-u),v=t+0.67*(z-t),E=w+(C-u)*0.34,D=v+(B-t)*0.34;this.curveTo(w,v,E,D,C,B);},drawRect:function(t,z,u,v){this.moveTo(t,z);this.lineTo(t+u,z);this.lineTo(t+u,z+v);this.lineTo(t,z+v);this.lineTo(t,z);this._currentX=t;this._currentY=z;return this;},drawRoundRect:function(t,B,u,z,v,A){this.moveTo(t,B+A);this.lineTo(t,B+z-A);this.quadraticCurveTo(t,B+z,t+v,B+z);this.lineTo(t+u-v,B+z);this.quadraticCurveTo(t+u,B+z,t+u,B+z-A);this.lineTo(t+u,B+A);this.quadraticCurveTo(t+u,B,t+u-v,B);this.lineTo(t+v,B);this.quadraticCurveTo(t,B,t,B+A);return this;},drawCircle:function(u,A,t){var w=0,v=360,z=t*2;v*=65535;this._drawingComplete=false;this._trackSize(u+z,A+z);this.moveTo((u+z),(A+t));this._addToPath(" ae "+this._round(u+t)+", "+this._round(A+t)+", "+this._round(t)+", "+this._round(t)+", "+w+", "+v);return this;},drawEllipse:function(v,D,z,C){var B=0,A=360,u=z*0.5,t=C*0.5;A*=65535;this._drawingComplete=false;this._trackSize(v+z,D+C);this.moveTo((v+z),(D+t));this._addToPath(" ae "+this._round(v+u)+", "+this._round(v+u)+", "+this._round(D+t)+", "+this._round(u)+", "+this._round(t)+", "+B+", "+A);return this;},drawDiamond:function(u,A,z,t){var w=z*0.5,v=t*0.5;this.moveTo(u+w,A);this.lineTo(u+z,A+v);this.lineTo(u+w,A+t);this.lineTo(u,A+v);this.lineTo(u+w,A);return this;},drawWedge:function(u,A,w,v,t){var z=t*2;if(Math.abs(v)>360){v=360;}this._currentX=u;this._currentY=A;w*=-65535;v*=65536;w=Math.round(w);v=Math.round(v);this.moveTo(u,A);this._addToPath(" ae "+this._round(u)+", "+this._round(A)+", "+this._round(t)+" "+this._round(t)+", "+w+", "+v);this._trackSize(z,z);return this;},lineTo:function(y,x,v){var u=arguments,w,t,z=" l ";if(typeof y==="string"||typeof y==="number"){u=[[y,x]];}t=u.length;for(w=0;w<t;++w){z+=" "+this._round(u[w][0])+", "+this._round(u[w][1]);this._trackSize.apply(this,u[w]);this._currentX=u[w][0];this._currentY=u[w][1];}this._addToPath(z);return this;},moveTo:function(t,u){this._movePath=" m "+this._round(t)+", "+this._round(u);this._trackSize(t,u);this._currentX=t;this._currentY=u;},_closePath:function(){var A=this.get("fill"),z=this.get("stroke"),v=this.node,t=this.get("width"),u=this.get("height"),y=this._path,x="",B=this._coordSpaceMultiplier;this._fillChangeHandler();this._strokeChangeHandler();if(y){if(A&&A.color){x+=" x";}if(z){x+=" e";}}if(y){v.path=y+x;}if(!isNaN(t)&&!isNaN(u)){v.coordOrigin=this._left+", "+this._top;v.coordSize=(t*B)+", "+(u*B);v.style.position="absolute";v.style.width=t+"px";v.style.height=u+"px";}this._path=y;this._movePath=null;this._updateTransform();},end:function(){this._closePath();},closePath:function(){this._addToPath(" x e");},clear:function(){this._right=0;this._bottom=0;this._width=0;this._height=0;this._left=0;this._top=0;this._path="";this._movePath=null;},getBezierData:function(y,x){var z=y.length,w=[],v,u;for(v=0;v<z;++v){w[v]=[y[v][0],y[v][1]];}for(u=1;u<z;++u){for(v=0;v<z-u;++v){w[v][0]=(1-x)*w[v][0]+x*w[parseInt(v+1,10)][0];w[v][1]=(1-x)*w[v][1]+x*w[parseInt(v+1,10)][1];}}return[w[0][0],w[0][1]];},_setCurveBoundingBox:function(F,B,y){var x=0,v=this._currentX,C=v,A=this._currentY,u=A,z=Math.round(Math.sqrt((B*B)+(y*y))),D=1/z,E;for(;x<z;++x){E=this.getBezierData(F,D*x);v=isNaN(v)?E[0]:Math.min(E[0],v);C=isNaN(C)?E[0]:Math.max(E[0],C);A=isNaN(A)?E[1]:Math.min(E[1],A);u=isNaN(u)?E[1]:Math.max(E[1],u);}v=Math.round(v*10)/10;C=Math.round(C*10)/10;A=Math.round(A*10)/10;u=Math.round(u*10)/10;this._trackSize(C,u);this._trackSize(v,A);},_trackSize:function(t,u){if(t>this._right){this._right=t;}if(t<this._left){this._left=t;}if(u<this._top){this._top=u;}if(u>this._bottom){this._bottom=u;}this._width=this._right-this._left;this._height=this._bottom-this._top;},_left:0,_right:0,_top:0,_bottom:0,_width:0,_height:0};b.VMLDrawing=l;r=function(){this._transforms=[];this.matrix=new b.Matrix();this._normalizedMatrix=new b.Matrix();r.superclass.constructor.apply(this,arguments);};r.NAME="vmlShape";b.extend(r,b.GraphicBase,b.mix({_type:"shape",init:function(){this.initializer.apply(this,arguments);},initializer:function(t){var u=this,v=t.graphic;u.createNode();if(v){this._setGraphic(v);}this._updateHandler();},_setGraphic:function(t){var u;if(t instanceof b.VMLGraphic){this._graphic=t;}else{t=b.one(t);u=new b.VMLGraphic({render:t});u._appendShape(this);this._graphic=u;}},createNode:function(){var I,E=this.get("x"),C=this.get("y"),F=this.get("width"),K=this.get("height"),H,z,O,L=this.get("visible")?"visible":"hidden",N,B,A,G,u,D,M,t,J,v;H=this.get("id");z=this._type=="path"?"shape":this._type;B="vml"+z+" "+c(k)+" "+c(this.constructor.NAME);A=this._getStrokeProps();J=this._getFillProps();O="<"+z+'  xmlns="urn:schemas-microsft.com:vml" id="'+H+'" class="'+B+'" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:'+E+"px;top:"+C+"px;width:"+F+"px;height:"+K+"px;visibility:"+L+'"';if(A&&A.weight&&A.weight>0){G=A.endcap;u=parseFloat(A.opacity);D=A.joinstyle;M=A.miterlimit;t=A.dashstyle;O+=' stroked="t" strokecolor="'+A.color+'" strokeWeight="'+A.weight+'px"';
N='<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';N+=' opacity="'+u+'"';if(G){N+=' endcap="'+G+'"';}if(D){N+=' joinstyle="'+D+'"';}if(M){N+=' miterlimit="'+M+'"';}if(t){N+=' dashstyle="'+t+'"';}N+="></stroke>";this._strokeNode=d.createElement(N);O+=' stroked="t"';}else{O+=' stroked="f"';}if(J){if(J.node){v=J.node;this._fillNode=d.createElement(v);}if(J.color){O+=' fillcolor="'+J.color+'"';}O+=' filled="'+J.filled+'"';}O+=">";O+="</"+z+">";I=d.createElement(O);if(this._strokeNode){I.appendChild(this._strokeNode);}if(this._fillNode){I.appendChild(this._fillNode);}this.node=I;this._strokeFlag=false;this._fillFlag=false;},addClass:function(t){var u=this.node;p.addClass(u,t);},removeClass:function(t){var u=this.node;p.removeClass(u,t);},getXY:function(){var w=this._graphic,u=w.getXY(),t=this.get("x"),v=this.get("y");return[u[0]+t,u[1]+v];},setXY:function(u){var v=this._graphic,t=v.getXY();this.set("x",u[0]-t[0]);this.set("y",u[1]-t[1]);},contains:function(t){return t===b.one(this.node);},compareTo:function(t){var u=this.node;return u===t;},test:function(t){return q.test(this.node,t);},_getStrokeProps:function(){var A,C=this.get("stroke"),y,u,w="",t,v=0,x,B,z;if(C&&C.weight&&C.weight>0){A={};B=C.linecap||"flat";z=C.linejoin||"round";if(B!="round"&&B!="square"){B="flat";}y=parseFloat(C.opacity);u=C.dashstyle||"none";C.color=C.color||"#000000";C.weight=C.weight||1;C.opacity=h(y)?y:1;A.stroked=true;A.color=C.color;A.weight=C.weight;A.endcap=B;A.opacity=C.opacity;if(i(u)){w=[];x=u.length;for(v=0;v<x;++v){t=u[v];w[v]=t/C.weight;}}if(z=="round"||z=="bevel"){A.joinstyle=z;}else{z=parseInt(z,10);if(h(z)){A.miterlimit=Math.max(z,1);A.joinstyle="miter";}}A.dashstyle=w;}return A;},_strokeChangeHandler:function(z){if(!this._strokeFlag){return;}var v=this.node,D=this.get("stroke"),A,u,x="",t,w=0,y,C,B;if(D&&D.weight&&D.weight>0){C=D.linecap||"flat";B=D.linejoin||"round";if(C!="round"&&C!="square"){C="flat";}A=parseFloat(D.opacity);u=D.dashstyle||"none";D.color=D.color||"#000000";D.weight=D.weight||1;D.opacity=h(A)?A:1;v.stroked=true;v.strokeColor=D.color;v.strokeWeight=D.weight+"px";if(!this._strokeNode){this._strokeNode=this._createGraphicNode("stroke");v.appendChild(this._strokeNode);}this._strokeNode.endcap=C;this._strokeNode.opacity=D.opacity;if(i(u)){x=[];y=u.length;for(w=0;w<y;++w){t=u[w];x[w]=t/D.weight;}}if(B=="round"||B=="bevel"){this._strokeNode.joinstyle=B;}else{B=parseInt(B,10);if(h(B)){this._strokeNode.miterlimit=Math.max(B,1);this._strokeNode.joinstyle="miter";}}this._strokeNode.dashstyle=x;this._strokeNode.on=true;}else{if(this._strokeNode){this._strokeNode.on=false;}v.stroked=false;}this._strokeFlag=false;},_getFillProps:function(){var z=this.get("fill"),t,w,y,u,v,x=false;if(z){w={};if(z.type=="radial"||z.type=="linear"){t=parseFloat(z.opacity);t=h(t)?t:1;x=true;y=this._getGradientFill(z);v='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="'+t+'"';for(u in y){if(y.hasOwnProperty(u)){v+=" "+u+'="'+y[u]+'"';}}v+=" />";w.node=v;}else{if(z.color){t=parseFloat(z.opacity);x=true;w.color=z.color;if(h(t)){t=Math.max(Math.min(t,1),0);w.opacity=t;if(t<1){w.node='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+t+'"/>';}}}}w.filled=x;}return w;},_fillChangeHandler:function(A){if(!this._fillFlag){return;}var w=this.node,z=this.get("fill"),t,v,x=false,u,y;if(z){if(z.type=="radial"||z.type=="linear"){x=true;y=this._getGradientFill(z);if(this._fillNode){for(u in y){if(y.hasOwnProperty(u)){if(u=="colors"){this._fillNode.colors.value=y[u];}else{this._fillNode[u]=y[u];}}}}else{v='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';for(u in y){if(y.hasOwnProperty(u)){v+=" "+u+'="'+y[u]+'"';}}v+=" />";this._fillNode=d.createElement(v);w.appendChild(this._fillNode);}}else{if(z.color){w.fillcolor=z.color;t=parseFloat(z.opacity);x=true;if(h(t)&&t<1){z.opacity=t;if(this._fillNode){if(this._fillNode.getAttribute("type")!="solid"){this._fillNode.type="solid";}this._fillNode.opacity=t;}else{v='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+t+'"/>';this._fillNode=d.createElement(v);w.appendChild(this._fillNode);}}else{if(this._fillNode){this._fillNode.opacity=1;this._fillNode.type="solid";}}}}}w.filled=x;this._fillFlag=false;},_updateFillNode:function(t){if(!this._fillNode){this._fillNode=this._createGraphicNode("fill");t.appendChild(this._fillNode);}},_getGradientFill:function(M){var Q={},E,C,B=M.type,F=this.get("width"),P=this.get("height"),G=h,K,D=M.stops,O=D.length,z,L,N=0,H,t="",x=M.cx,u=M.cy,y=M.fx,v=M.fy,I=M.r,A,J=M.rotation||0;if(B==="linear"){if(J<=270){J=Math.abs(J-270);}else{if(J<360){J=270+(360-J);}else{J=270;}}Q.type="gradient";Q.angle=J;}else{if(B==="radial"){E=F*(I*2);C=P*(I*2);y=I*2*(y-0.5);v=I*2*(v-0.5);y+=x;v+=u;Q.focussize=(E/F)/10+"% "+(C/P)/10+"%";Q.alignshape=false;Q.type="gradientradial";Q.focus="100%";Q.focusposition=Math.round(y*100)+"% "+Math.round(v*100)+"%";}}for(;N<O;++N){K=D[N];L=K.color;z=K.opacity;z=G(z)?z:1;A=K.offset||N/(O-1);A*=(I*2);A=Math.round(100*A)+"%";H=N>0?N+1:"";Q["opacity"+H]=z+"";t+=", "+A+" "+L;}if(parseFloat(A)<100){t+=", 100% "+L;}Q.colors=t.substr(2);return Q;},_addTransform:function(u,t){t=b.Array(t);this._transform=m.trim(this._transform+" "+u+"("+t.join(", ")+")");t.unshift(u);this._transforms.push(t);if(this.initialized){this._updateTransform();}},_updateTransform:function(){var w=this.node,H,v,z,G=this.get("x"),E=this.get("y"),C,A,F=this.matrix,t=this._normalizedMatrix,u=this instanceof b.VMLPath,B=0,D=this._transforms.length;if(this._transforms&&this._transforms.length>0){z=this.get("transformOrigin");if(u){t.translate(this._left,this._top);}C=z[0]-0.5;A=z[1]-0.5;C=Math.max(-0.5,Math.min(0.5,C));
A=Math.max(-0.5,Math.min(0.5,A));for(;B<D;++B){H=this._transforms[B].shift();if(H){t[H].apply(t,this._transforms[B]);F[H].apply(F,this._transforms[B]);}}if(u){t.translate(-this._left,-this._top);}v=t.a+","+t.c+","+t.b+","+t.d+","+0+","+0;}this._graphic.addToRedrawQueue(this);if(v){if(!this._skew){this._skew=d.createElement('<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;" />');this.node.appendChild(this._skew);}this._skew.matrix=v;this._skew.on=true;this._skew.offset=this._getSkewOffsetValue(t.dx)+"px, "+this._getSkewOffsetValue(t.dy)+"px";this._skew.origin=C+", "+A;}if(this._type!="path"){this._transforms=[];}w.style.left=G+"px";w.style.top=E+"px";},_getSkewOffsetValue:function(u){var t=b.MatrixUtil.sign(u),v=Math.abs(u);u=Math.min(v,32767)*t;return u;},_translateX:0,_translateY:0,_transform:"",translate:function(t,u){this._translateX+=t;this._translateY+=u;this._addTransform("translate",arguments);},translateX:function(t){this._translateX+=t;this._addTransform("translateX",arguments);},translateY:function(t){this._translateY+=t;this._addTransform("translateY",arguments);},skew:function(t,u){this._addTransform("skew",arguments);},skewX:function(t){this._addTransform("skewX",arguments);},skewY:function(t){this._addTransform("skewY",arguments);},rotate:function(t){this._addTransform("rotate",arguments);},scale:function(t,u){this._addTransform("scale",arguments);},on:function(u,t){if(b.Node.DOM_EVENTS[u]){return b.one("#"+this.get("id")).on(u,t);}return b.on.apply(this,arguments);},_draw:function(){},_updateHandler:function(v){var u=this,t=u.node;u._fillChangeHandler();u._strokeChangeHandler();t.style.width=this.get("width")+"px";t.style.height=this.get("height")+"px";this._draw();u._updateTransform();},_createGraphicNode:function(t){t=t||this._type;return d.createElement("<"+t+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" class="vml'+t+'"/>');},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},set:function(){var t=this;g.prototype.set.apply(t,arguments);if(t.initialized){t._updateHandler();}},getBounds:function(z){var B=this.get("stroke"),v=this.get("width"),A=this.get("height"),u=this.get("x"),C=this.get("y"),t=0;if(B&&B.weight){t=B.weight;}v=(u+v+t)-(u-t);A=(C+A+t)-(C-t);u-=t;C-=t;return this._normalizedMatrix.getContentRect(v,A,u,C);},destroy:function(){var t=this.get("graphic");if(t){t.removeShape(this);}else{this._destroy();}},_destroy:function(){if(this.node){if(this._fillNode){this.node.removeChild(this._fillNode);this._fillNode=null;}if(this._strokeNode){this.node.removeChild(this._strokeNode);this._strokeNode=null;}b.one(this.node).remove(true);}}},b.VMLDrawing.prototype));r.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},transform:{setter:function(w){var v=0,t,u;this.matrix.init();this._normalizedMatrix.init();this._transforms=this.matrix.getTransformArray(w);t=this._transforms.length;for(;v<t;++v){u=this._transforms[v];}this._transform=w;return w;},getter:function(){return this._transform;}},x:{value:0},y:{value:0},id:{valueFn:function(){return b.guid();},setter:function(u){var t=this.node;if(t){t.setAttribute("id",u);}return u;}},width:{value:0},height:{value:0},visible:{value:true,setter:function(v){var u=this.node,t=v?"visible":"hidden";if(u){u.style.visibility=t;}return v;}},fill:{valueFn:"_getDefaultFill",setter:function(w){var u,v,t=this.get("fill")||this._getDefaultFill();if(w){if(w.hasOwnProperty("color")){w.type="solid";}for(u in w){if(w.hasOwnProperty(u)){t[u]=w[u];}}}v=t;if(v&&v.color){if(v.color===undefined||v.color=="none"){v.color=null;}}this._fillFlag=true;return v;}},stroke:{valueFn:"_getDefaultStroke",setter:function(x){var v,w,t,u=this.get("stroke")||this._getDefaultStroke();if(x){if(x.hasOwnProperty("weight")){t=parseInt(x.weight,10);if(!isNaN(t)){x.weight=t;}}for(v in x){if(x.hasOwnProperty(v)){u[v]=x[v];}}}w=u;this._strokeFlag=true;return w;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},node:{readOnly:true,getter:function(){return this.node;}},graphic:{readOnly:true,getter:function(){return this._graphic;}}};b.VMLShape=r;s=function(){s.superclass.constructor.apply(this,arguments);};s.NAME="vmlPath";b.extend(s,b.VMLShape);s.ATTRS=b.merge(b.VMLShape.ATTRS,{width:{getter:function(){var t=Math.max(this._right-this._left,0);return t;}},height:{getter:function(){return Math.max(this._bottom-this._top,0);}},path:{readOnly:true,getter:function(){return this._path;}}});b.VMLPath=s;f=function(){f.superclass.constructor.apply(this,arguments);};f.NAME="vmlRect";b.extend(f,b.VMLShape,{_type:"rect"});f.ATTRS=b.VMLShape.ATTRS;b.VMLRect=f;j=function(){j.superclass.constructor.apply(this,arguments);};j.NAME="vmlEllipse";b.extend(j,b.VMLShape,{_type:"oval"});j.ATTRS=b.merge(b.VMLShape.ATTRS,{xRadius:{lazyAdd:false,getter:function(){var t=this.get("width");t=Math.round((t/2)*100)/100;return t;},setter:function(u){var t=u*2;this.set("width",t);return u;}},yRadius:{lazyAdd:false,getter:function(){var t=this.get("height");t=Math.round((t/2)*100)/100;return t;},setter:function(u){var t=u*2;this.set("height",t);return u;}}});b.VMLEllipse=j;a=function(t){a.superclass.constructor.apply(this,arguments);};a.NAME="vmlCircle";b.extend(a,r,{_type:"oval"});a.ATTRS=b.merge(r.ATTRS,{radius:{lazyAdd:false,value:0},width:{setter:function(t){this.set("radius",t/2);return t;},getter:function(){var t=this.get("radius"),u=t&&t>0?t*2:0;return u;}},height:{setter:function(t){this.set("radius",t/2);return t;},getter:function(){var t=this.get("radius"),u=t&&t>0?t*2:0;return u;}}});b.VMLCircle=a;n=function(){n.superclass.constructor.apply(this,arguments);};n.NAME="vmlPieSlice";b.extend(n,b.VMLShape,b.mix({_type:"shape",_draw:function(z){var u=this.get("cx"),A=this.get("cy"),w=this.get("startAngle"),v=this.get("arc"),t=this.get("radius");
this.clear();this.drawWedge(u,A,w,v,t);this.end();}},b.VMLDrawing.prototype));n.ATTRS=b.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},b.VMLShape.ATTRS);b.VMLPieSlice=n;o=function(){o.superclass.constructor.apply(this,arguments);};o.NAME="vmlGraphic";o.ATTRS={render:{},id:{valueFn:function(){return b.guid();},setter:function(u){var t=this._node;if(t){t.setAttribute("id",u);}return u;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(t){if(this._node){this._node.style.width=t+"px";}return t;}},height:{setter:function(t){if(this._node){this._node.style.height=t+"px";}return t;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(t){this._resizeDown=t;if(this._node){this._redraw();}return t;}},x:{getter:function(){return this._x;},setter:function(t){this._x=t;if(this._node){this._node.style.left=t+"px";}return t;}},y:{getter:function(){return this._y;},setter:function(t){this._y=t;if(this._node){this._node.style.top=t+"px";}return t;}},autoDraw:{value:true},visible:{value:true,setter:function(t){this._toggleVisible(t);return t;}}};b.extend(o,b.GraphicBase,{_x:0,_y:0,getXY:function(){var u=this.parentNode,t=this.get("x"),w=this.get("y"),v;if(u){v=b.one(u).getXY();v[0]+=t;v[1]+=w;}else{v=b.DOM._getOffset(this._node);}return v;},_resizeDown:false,initializer:function(u){var v=this.get("render"),t=this.get("visible")?"visible":"hidden";this._shapes={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=this._createGraphic();this._node.style.visibility=t;this._node.setAttribute("id",this.get("id"));if(v){this.render(v);}},render:function(x){var t=b.one(x),u=this.get("width")||parseInt(t.getComputedStyle("width"),10),v=this.get("height")||parseInt(t.getComputedStyle("height"),10);t=t||d.body;t.appendChild(this._node);this.setSize(u,v);this.parentNode=t;this.set("width",u);this.set("height",v);return this;},destroy:function(){this.clear();b.one(this._node).remove(true);},addShape:function(t){t.graphic=this;if(!this.get("visible")){t.visible=false;}var v=this._getShapeClass(t.type),u=new v(t);this._appendShape(u);return u;},_appendShape:function(u){var v=u.node,t=this._frag||this._node;if(this.get("autoDraw")){t.appendChild(v);}else{this._getDocFrag().appendChild(v);}},removeShape:function(t){if(!(t instanceof r)){if(m.isString(t)){t=this._shapes[t];}}if(t&&(t instanceof r)){t._destroy();this._shapes[t.get("id")]=null;delete this._shapes[t.get("id")];}if(this.get("autoDraw")){this._redraw();}},removeAllShapes:function(){var t=this._shapes,u;for(u in t){if(t.hasOwnProperty(u)){t[u].destroy();}}this._shapes={};},_removeChildren:function(t){if(t.hasChildNodes()){var u;while(t.firstChild){u=t.firstChild;this._removeChildren(u);t.removeChild(u);}}},clear:function(){this.removeAllShapes();this._removeChildren(this._node);},_toggleVisible:function(w){var v,u=this._shapes,t=w?"visible":"hidden";if(u){for(v in u){if(u.hasOwnProperty(v)){u[v].set("visible",w);}}}if(this._node){this._node.style.visibility=t;}},setSize:function(t,u){t=Math.round(t);u=Math.round(u);this._node.style.width=t+"px";this._node.style.height=u+"px";this._node.coordSize=t+" "+u;},setPosition:function(t,u){t=Math.round(t);u=Math.round(u);this._node.style.left=t+"px";this._node.style.top=u+"px";},_createGraphic:function(){var t=d.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;position:absolute;top:0px;left:0px;zoom:1;" />');return t;},_createGraphicNode:function(t){return d.createElement("<"+t+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;" />');},getShapeById:function(t){return this._shapes[t];},_getShapeClass:function(u){var t=this._shapeClass[u];if(t){return t;}return u;},_shapeClass:{circle:b.VMLCircle,rect:b.VMLRect,path:b.VMLPath,ellipse:b.VMLEllipse,pieslice:b.VMLPieSlice},batch:function(u){var t=this.get("autoDraw");this.set("autoDraw",false);u.apply();this._redraw();this.set("autoDraw",t);},_getDocFrag:function(){if(!this._frag){this._frag=d.createDocumentFragment();}return this._frag;},addToRedrawQueue:function(t){var v,u;this._shapes[t.get("id")]=t;if(!this._resizeDown){v=t.getBounds();u=this._contentBounds;u.left=u.left<v.left?u.left:v.left;u.top=u.top<v.top?u.top:v.top;u.right=u.right>v.right?u.right:v.right;u.bottom=u.bottom>v.bottom?u.bottom:v.bottom;u.width=u.right-u.left;u.height=u.bottom-u.top;this._contentBounds=u;}if(this.get("autoDraw")){this._redraw();}},_redraw:function(){var t=this._resizeDown?this._getUpdatedContentBounds():this._contentBounds;if(this.get("autoSize")){this.setSize(t.right,t.bottom);}if(this._frag){this._node.appendChild(this._frag);this._frag=null;}},_getUpdatedContentBounds:function(){var x,v,u,t=this._shapes,w={left:0,top:0,right:0,bottom:0};for(v in t){if(t.hasOwnProperty(v)){u=t[v];x=u.getBounds();w.left=Math.min(w.left,x.left);w.top=Math.min(w.top,x.top);w.right=Math.max(w.right,x.right);w.bottom=Math.max(w.bottom,x.bottom);}}w.width=w.right-w.left;w.height=w.bottom-w.top;this._contentBounds=w;return w;}});b.VMLGraphic=o;},"3.6.0pr3",{requires:["graphics"],skinnable:false});