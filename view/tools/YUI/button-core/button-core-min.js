/*
YUI 3.6.0pr3 (build 1)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("button-core",function(c){var b=c.ClassNameManager.getClassName;function a(d){this.initializer(d);}a.prototype={TEMPLATE:"<button/>",constructor:a,initializer:function(d){this._initNode(d);this._initAttributes(d);this._renderUI(d);},_initNode:function(d){if(d.host){this._host=c.one(d.host);}else{this._host=c.Node.create(this.TEMPLATE);}},_initAttributes:function(d){var f=this._host,e=f.one("."+a.CLASS_NAMES.LABEL)||f;d.label=d.label||this._getLabel(e);c.AttributeCore.call(this,a.ATTRS,d);},_renderUI:function(d){var f=this.getNode(),e=f.get("tagName").toLowerCase();f.addClass(a.CLASS_NAMES.BUTTON);if(e!=="button"&&e!=="input"){f.set("role","button");}},enable:function(){this.set("disabled",false);},disable:function(){this.set("disabled",true);},getNode:function(){return this._host;},_getLabel:function(){var f=this.getNode(),e=f.get("tagName").toLowerCase(),d;if(e==="input"){d=f.get("value");}else{d=(f.one("."+a.CLASS_NAMES.LABEL)||f).get("text");}return d;},_uiSetLabel:function(d){var f=this.getNode(),e=f.get("tagName").toLowerCase();if(e==="input"){f.set("value",d);}else{(f.one("."+a.CLASS_NAMES.LABEL)||f).set("text",d);}return d;},_uiSetDisabled:function(e){var d=this.getNode();d.getDOMNode().disabled=e;d.toggleClass(a.CLASS_NAMES.DISABLED,e);return e;}};a.ATTRS={label:{setter:"_uiSetLabel",getter:"_getLabel",lazyAdd:false},disabled:{value:false,setter:"_uiSetDisabled",lazyAdd:false}};a.NAME="button";a.CLASS_NAMES={BUTTON:b("button"),DISABLED:b("button","disabled"),SELECTED:b("button","selected"),LABEL:b("button","label")};a.ARIA_STATES={PRESSED:"aria-pressed",CHECKED:"aria-checked"};a.ARIA_ROLES={BUTTON:"button",CHECKBOX:"checkbox",TOGGLE:"toggle"};c.mix(a.prototype,c.AttributeCore.prototype);c.ButtonCore=a;},"3.6.0pr3",{requires:["attribute-core","classnamemanager","node-base"]});