/*
YUI 3.6.0pr3 (build 1)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-key",function(g){var e="+alt",c="+ctrl",d="+meta",b="+shift",a=g.Lang.trim,f={KEY_MAP:{enter:13,esc:27,backspace:8,tab:9,pageup:33,pagedown:34},_typeRE:/^(up|down|press):/,_keysRE:/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,processArgs:function(m){var p=m.splice(3,1)[0],o=g.Array.hash(p.match(/\+(?:alt|ctrl|meta|shift)\b/g)||[]),j={type:this._typeRE.test(p)?RegExp.$1:null,mods:o,keys:null},n=p.replace(this._keysRE,""),k,q,h,l;if(n){n=n.split(",");j.keys={};for(l=n.length-1;l>=0;--l){k=a(n[l]);if(!k){continue;}if(+k==k){j.keys[k]=o;}else{h=k.toLowerCase();if(this.KEY_MAP[h]){j.keys[this.KEY_MAP[h]]=o;if(!j.type){j.type="down";}}else{k=k.charAt(0);q=k.toUpperCase();if(o["+shift"]){k=q;}j.keys[k.charCodeAt(0)]=(k===q)?g.merge(o,{"+shift":true}):o;}}}}if(!j.type){j.type="press";}return j;},on:function(n,k,m,j){var h=k._extra,i="key"+h.type,l=h.keys,o=(j)?"delegate":"on";k._detach=n[o](i,function(q){var p=l?l[q.which]:h.mods;if(p&&(!p[e]||(p[e]&&q.altKey))&&(!p[c]||(p[c]&&q.ctrlKey))&&(!p[d]||(p[d]&&q.metaKey))&&(!p[b]||(p[b]&&q.shiftKey))){m.fire(q);}},j);},detach:function(j,h,i){h._detach.detach();}};f.delegate=f.on;f.detachDelegate=f.detach;g.Event.define("key",f,true);},"3.6.0pr3",{requires:["event-synthetic"]});