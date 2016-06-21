/*!
 * minQuery
 */
var SweetSelector = (function() {
  return {
    select:function(target) {
      if(target[0] === "#"){
        target = target.substring(1)
        return document.getElementById(target);
      }else if(target[0] === "."){
        target = target.substring(1)
        return document.getElementsByClassName(target)
      }else{
        return document.getElementsByTagName(target);
      }
    }
  };
})()

var DOM = (function(){
  return{
    hide:function(target){
      SweetSelector.select(target).style.visibility = "hidden";
    },
    show:function(target){
      SweetSelector.select(target).style.visibility = "visible";
    },
    addClass:function(target, newClass){
      SweetSelector.select(target).className += (' ' + newClass)
    },
    removeClass:function(target, deleteClass){
      SweetSelector.select(target).className.replace( /(?:^|\s)deleteClass(?!\S)/g , '' )
    }
  }
})()

var EventDispatcher = (function(){
  return{
    on:function(target,event,action){
      SweetSelector.select(target)[0].addEventListener(event,action)
    },
    trigger:function(target,event){
      var e = new Event(event)
      SweetSelector.select(target)[0].dispatchEvent(e);
    }
  }
})()

var AjaxWrapper = (function(){

  // function reqListener() {
  //   console.log(this.responseText);
  // }
  return{
    request:function(info){
      var link = info.url;
      var linkType = info.type;
      return new Promise(function(resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open(linkType, link);
        xmlhttp.onload = function() {
          if (xmlhttp.status == 200) {
          resolve(xmlhttp.responseText);
          }
          else{
          reject('something else other than 200 was returned');
          }
        };
      xmlhttp.send();
      })
    }
  }

})()


var $ = (function(){
  return{
    select: SweetSelector.select,
    hide: DOM.hide,
    show: DOM.show,
    addClass: DOM.addClass,
    removeClass: DOM.removeClass,
    on: EventDispatcher.on,
    trigger: EventDispatcher.trigger,
    request: AjaxWrapper.request,
    ready: function(callback){
      document.addEventListener("DOMContentLoaded", function(event){
        callback()
      })
    }
  }

})()


// $.ready( function() { console.log("The DOM is ready"); })
// $.hide('.klass')


// console.log(miniQuery.DOM.addClass('.klass', 'shadi'))
// miniQuery.EventDispatcher.on('.klass', 'Andrew', function() { console.log("awesome") });
// miniQuery.EventDispatcher.trigger('.klass', 'Andrew')



















