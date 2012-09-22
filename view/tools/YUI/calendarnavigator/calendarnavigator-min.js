/*
YUI 3.6.0pr3 (build 1)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("calendarnavigator",function(a){var n="contentBox",p="host",l="rendered",b=a.ClassNameManager.getClassName,i=a.substitute,c=a.Node,h=c.create,o="calendar",f="calendarnav",j=b(o,"header"),d=b(f,"prevmonth"),e=b(f,"nextmonth"),g=b(f,"month-disabled"),m=a.DataType.Date;function k(q){k.superclass.constructor.apply(this,arguments);}k.NS="navigator";k.NAME="pluginCalendarNavigator";k.ATTRS={shiftByMonths:{value:1}};k.CALENDARNAV_STRINGS={prev_month_class:d,next_month_class:e};k.PREV_MONTH_CONTROL_TEMPLATE='<a class="yui3-u {prev_month_class}" role="button" aria-label="{prev_month_arialabel}" tabindex="{control_tabindex}">'+"<span>&lt;</span>"+"</a>";k.NEXT_MONTH_CONTROL_TEMPLATE='<a class="yui3-u {next_month_class}" role="button" aria-label="{next_month_arialabel}" tabindex="{control_tabindex}">'+"<span>&gt;</span>"+"</a>";a.extend(k,a.Plugin.Base,{_eventAttachments:{},_controls:{},initializer:function(q){this._controls={};this._eventAttachments={};this.afterHostMethod("renderUI",this._initNavigationControls);},destructor:function(){},_focusNavigation:function(q){q.currentTarget.focus();},_subtractMonths:function(s){if((s.type==="click")||(s.type==="keydown"&&(s.keyCode==13||s.keyCode==32))){var r=this.get(p);var q=r.get("date");r.set("date",m.addMonths(q,-1*this.get("shiftByMonths")));s.preventDefault();}},_addMonths:function(s){if((s.type==="click")||(s.type==="keydown"&&(s.keyCode==13||s.keyCode==32))){var r=this.get(p);var q=r.get("date");r.set("date",m.addMonths(q,this.get("shiftByMonths")));s.preventDefault();}},_updateControlState:function(){var q=this.get(p);if(m.areEqual(q.get("minimumDate"),q.get("date"))){if(this._eventAttachments.prevMonth){this._eventAttachments.prevMonth.detach();this._eventAttachments.prevMonth=false;}if(!this._controls.prevMonth.hasClass(g)){this._controls.prevMonth.addClass(g).setAttribute("aria-disabled","true");}}else{if(!this._eventAttachments.prevMonth){this._eventAttachments.prevMonth=this._controls.prevMonth.on(["click","keydown"],this._subtractMonths,this);}if(this._controls.prevMonth.hasClass(g)){this._controls.prevMonth.removeClass(g).setAttribute("aria-disabled","false");}}if(m.areEqual(q.get("maximumDate"),m.addMonths(q.get("date"),q._paneNumber-1))){if(this._eventAttachments.nextMonth){this._eventAttachments.nextMonth.detach();this._eventAttachments.nextMonth=false;}if(!this._controls.nextMonth.hasClass(g)){this._controls.nextMonth.addClass(g).setAttribute("aria-disabled","true");}}else{if(!this._eventAttachments.nextMonth){this._eventAttachments.nextMonth=this._controls.nextMonth.on(["click","keydown"],this._addMonths,this);}if(this._controls.nextMonth.hasClass(g)){this._controls.nextMonth.removeClass(g).setAttribute("aria-disabled","false");}}this._controls.prevMonth.on(["click","keydown"],this._focusNavigation,this);this._controls.nextMonth.on(["click","keydown"],this._focusNavigation,this);},_renderPrevControls:function(){var q=h(i(k.PREV_MONTH_CONTROL_TEMPLATE,k.CALENDARNAV_STRINGS));q.on("selectstart",this.get(p)._preventSelectionStart);return q;},_renderNextControls:function(){var q=h(i(k.NEXT_MONTH_CONTROL_TEMPLATE,k.CALENDARNAV_STRINGS));q.on("selectstart",this.get(p)._preventSelectionStart);return q;},_initNavigationControls:function(){var q=this.get(p);k.CALENDARNAV_STRINGS["control_tabindex"]=q.get("tabIndex");k.CALENDARNAV_STRINGS["prev_month_arialabel"]="Go to previous month";k.CALENDARNAV_STRINGS["next_month_arialabel"]="Go to next month";var r=q.get(n).one("."+j);this._controls.prevMonth=this._renderPrevControls();this._controls.nextMonth=this._renderNextControls();this._updateControlState();q.after("dateChange",this._updateControlState,this);r.prepend(this._controls.prevMonth);r.append(this._controls.nextMonth);}});a.namespace("Plugin").CalendarNavigator=k;},"3.6.0pr3",{requires:["plugin","classnamemanager","datatype-date","node","substitute"]});