/*
YUI 3.6.0pr3 (build 1)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("scrollview-base",function(d){var i=d.ClassNameManager.getClassName,x="scrollview",w={vertical:i(x,"vert"),horizontal:i(x,"horiz")},B="scrollEnd",l="flick",b=l,c="drag",a=true,k="ui",o="left",r="top",h="px",p="scrollY",q="scrollX",f="bounce",t="disabled",v="x",u="y",y="boundingBox",n="contentBox",A="",s="0s",j=d.UA.ie,e=d.Transition,g=e.useNative,m=function(E,D,C){return Math.min(Math.max(E,D),C);};function z(){z.superclass.constructor.apply(this,arguments);}d.ScrollView=d.extend(z,d.Widget,{initializer:function(){var C=this;C._cb=C.get(n);C._bb=C.get(y);},_uiSizeCB:function(){},_onTransEnd:function(C){this.fire(B);},bindUI:function(){var C=this;C._bindDrag(C.get(c));C._bindFlick(C.get(b));C._bindAttrs();if(j){C._fixIESelect(C._bb,C._cb);}},_bindAttrs:function(){var C=this,E=C._afterScrollChange,D=C._afterDimChange;this.after({"disabledChange":C._afterDisabledChange,"flickChange":C._afterFlickChange,"dragChange":C._afterDragChange,"scrollYChange":E,"scrollXChange":E,"heightChange":D,"widthChange":D});if(!j){this.after("renderedChange",function(F){});}},_bindDrag:function(C){var D=this._bb;if(C){D.on("drag|gesturemovestart",d.bind(this._onGestureMoveStart,this));}else{D.detach("drag|*");}},_bindFlick:function(D){var C=this._cb;if(D){C.on("flick|flick",d.bind(this._flick,this),D);}else{C.detach("flick|*");}},_bindMousewheel:function(C){var D=this._bb;if(this._scrollsVertical){if(C){d.one(document).on("mousewheel",d.bind(this._mousewheel,this));}else{D.detach("mousewheel|*");}}},syncUI:function(){this._cDisabled=this.get(t);this._uiDimensionsChange();this._bindMousewheel(a);this.scrollTo(this.get(q),this.get(p));},scrollTo:function(M,L,G,J){if(J===undefined){if(L<this._minScrollY){L=this._minScrollY;}else{if(L>this._maxScrollY){L=this._maxScrollY;}}}if(!this._cDisabled){var F=this._cb,H=(M!==null),E=(L!==null),D=(H)?M*-1:0,C=(E)?L*-1:0,I,K=z._TRANSITION,N=this._transEndCB;G=G||0;J=J||z.EASING;if(H){this.set(q,M,{src:k});}if(E){this.set(p,L,{src:k});}if(g){F.setStyle(K.DURATION,s).setStyle(K.PROPERTY,A);}if(G!==0){I={easing:J,duration:G/1000};if(g){I.transform=this._transform(D,C);}else{if(H){I.left=D+h;}if(E){I.top=C+h;}}if(!N){N=this._transEndCB=d.bind(this._onTransEnd,this);}F.transition(I,N);}else{if(g){F.setStyle("transform",this._transform(D,C));}else{if(H){F.setStyle(o,D+h);}if(E){F.setStyle(r,C+h);}}}}},_transform:function(C,D){return(this._forceHWTransforms)?"translate("+C+"px,"+D+"px) translateZ(0px)":"translate("+C+"px,"+D+"px)";},_moveTo:function(D,C,E){if(g){D.setStyle("transform",this._transform(C,E));}else{D.setStyle(o,C+h);D.setStyle(r,E+h);}},_forceHWTransforms:d.UA.webkit?true:false,_prevent:{start:false,move:true,end:false},_onGestureMoveStart:function(D){var C=this,E=C._bb;if(!C._cDisabled){if(C._prevent.start){D.preventDefault();}C._killTimer();C._hm=E.on("drag|gesturemove",d.bind(C._onGestureMove,C));C._hme=E.on("drag|gesturemoveend",d.bind(C._onGestureMoveEnd,C));C._startY=D.clientY+C.get(p);C._startX=D.clientX+C.get(q);C._startClientY=C._endClientY=D.clientY;C._startClientX=C._endClientX=D.clientX;C._isDragging=false;C._flicking=false;C._snapToEdge=false;}},_onGestureMove:function(D){var C=this;if(C._prevent.move){D.preventDefault();}C._isDragging=true;C._endClientY=D.clientY;C._endClientX=D.clientX;if(C._scrollsVertical){C.set(p,-(D.clientY-C._startY));}if(C._scrollsHorizontal){C.set(q,-(D.clientX-C._startX));}},_onGestureMoveEnd:function(K){if(this._prevent.end){K.preventDefault();}var R=this,G=R._minScrollY,C=R._maxScrollY,H=R._minScrollX,E=R._maxScrollX,J=R._scrollsVertical,S=R._scrollsHorizontal,F=J?R._startClientY:R._startClientX,P=J?R._endClientY:R._endClientX,D=F-P,I=Math.abs(D),M=R._bb,Q,O,N,L;R._hm.detach();R._hme.detach();R._scrolledHalfway=R._snapToEdge=R._isDragging=false;R.lastScrolledAmt=D;if((S&&I>M.get("offsetWidth")/2)||(J&&I>M.get("offsetHeight")/2)){R._scrolledHalfway=true;R._scrolledForward=D>0;}if(J){L=R.get(p);O=m(L,G,C);}if(S){N=R.get(q);Q=m(N,H,E);}if(Q!==N||O!==L){this._snapToEdge=true;if(J){R.set(p,O);}if(S){R.set(q,Q);}}if(R._snapToEdge){return;}R.fire(B,{onGestureMoveEnd:true});return;},_afterScrollChange:function(D){var C=D.duration,F=D.easing,E=D.newVal;if(D.src!==k){if(D.attrName==q){this._uiScrollTo(E,null,C,F);}else{this._uiScrollTo(null,E,C,F);}}},_afterFlickChange:function(C){this._bindFlick(C.newVal);},_afterDisabledChange:function(C){this._cDisabled=C.newVal;},_afterDragChange:function(C){this._bindDrag(C.newVal);},_uiScrollTo:function(C,F,D,E){D=D||this._snapToEdge?400:0;E=E||this._snapToEdge?z.SNAP_EASING:null;this.scrollTo(C,F,D,E);},_afterDimChange:function(){this._uiDimensionsChange();},_getScrollDims:function(){var H,I=this.get(q),G=this.get(p),C=this.get(n),F=this.get(y),E,D=z._TRANSITION;if(g){C.setStyle(D.DURATION,s);C.setStyle(D.PROPERTY,A);}E=this._forceHWTransforms;this._forceHWTransforms=false;this._moveTo(C,0,0);H=[F.get("offsetWidth"),F.get("offsetHeight"),F.get("scrollWidth"),F.get("scrollHeight")];this._moveTo(C,-1*I,-1*G);this._forceHWTransforms=E;return H;},_uiDimensionsChange:function(){var D=this,I=D._bb,H=z.CLASS_NAMES,J=this._getScrollDims(),G=J[0],C=J[1],E=J[2],F=J[3];if(C&&F>C){D._scrollsVertical=true;D._maxScrollY=F-C;D._minScrollY=0;D._scrollHeight=F;D._height=C;I.addClass(H.vertical);}else{D._scrollsVertical=false;delete D._maxScrollY;delete D._minScrollY;delete D._scrollHeight;delete D._height;I.removeClass(H.vertical);}if(G&&E>G){D._scrollsHorizontal=true;D._maxScrollX=E-G;D._minScrollX=0;D._scrollWidth=E;D._width=G;I.addClass(H.horizontal);}else{D._scrollsHorizontal=false;delete D._maxScrollX;delete D._minScrollX;delete D._scrollWidth;delete D._width;I.removeClass(H.horizontal);}},_flick:function(E){var D=E.flick,C=this;if(!C._cDisabled){C._currentVelocity=D.velocity;C._flicking=true;C._cDecel=C.get("deceleration");C._cBounce=C.get("bounce");C._pastYEdge=false;C._pastXEdge=false;C._flickFrame();C.fire(l);}},_mousewheel:function(G){var F=this.get("scrollY"),E=this._bb,C=this._cb,D=10,H=F-(G.wheelDelta*D);
if(E.contains(G.target)){this.scrollTo(0,H);if(this.scrollbars){this.scrollbars._update();this.scrollbars.flash();}G.preventDefault();}},_flickFrame:function(){var L=this,O,D,G,C,E,H,M=L._scrollsVertical,J=L._scrollsHorizontal,I=L._cDecel,N=L._cBounce,K=L._currentVelocity,F=z.FRAME_STEP;if(M){D=L._maxScrollY;G=L._minScrollY;O=L.get(p)-(K*F);}if(J){E=L._maxScrollX;H=L._minScrollX;C=L.get(q)-(K*F);}K=L._currentVelocity=(K*I);if(Math.abs(K).toFixed(4)<=0.015){L._flicking=false;L._killTimer(!(L._pastYEdge||L._pastXEdge));if(M){if(O<G){L._snapToEdge=true;L.set(p,G);}else{if(O>D){L._snapToEdge=true;L.set(p,D);}}}if(J){if(C<H){L._snapToEdge=true;L.set(q,H);}else{if(C>E){L._snapToEdge=true;L.set(q,E);}}}return;}if(M){if(O<G||O>D){L._pastYEdge=true;L._currentVelocity*=N;}L.set(p,O);}if(J){if(C<H||C>E){L._pastXEdge=true;L._currentVelocity*=N;}L.set(q,C);}if(!L._flickTimer){L._flickTimer=d.later(F,L,"_flickFrame",null,true);}},_killTimer:function(D){var C=this;if(C._flickTimer){C._flickTimer.cancel();C._flickTimer=null;}if(D){C.fire(B);}},_setScroll:function(I,H){if(this._cDisabled){I=d.Attribute.INVALID_VALUE;}else{var E=this._cachedBounce||this.get(f),D=z.BOUNCE_RANGE,G=(H==v)?this._maxScrollX:this._maxScrollY,F=E?-D:0,C=E?G+D:G;if(!E||!this._isDragging){if(I<F){I=F;}else{if(I>C){I=C;}}}}return I;},_setScrollX:function(C){return this._setScroll(C,v);},_setScrollY:function(C){return this._setScroll(C,u);}},{NAME:"scrollview",ATTRS:{scrollY:{value:0,setter:"_setScrollY"},scrollX:{value:0,setter:"_setScrollX"},deceleration:{value:0.93},bounce:{value:0.1},flick:{value:{minDistance:10,minVelocity:0.3}},drag:{value:true}},CLASS_NAMES:w,UI_SRC:k,BOUNCE_RANGE:150,FRAME_STEP:30,EASING:"cubic-bezier(0, 0.1, 0, 1.0)",SNAP_EASING:"ease-out",_TRANSITION:{DURATION:e._VENDOR_PREFIX+"TransitionDuration",PROPERTY:e._VENDOR_PREFIX+"TransitionProperty"}});},"3.6.0pr3",{skinnable:true,requires:["widget","event-gestures","event-mousewheel","transition"]});