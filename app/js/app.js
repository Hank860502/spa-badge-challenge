$.ready(function(){

  $.on('a','click', function(e){
    e.preventDefault();
    $.request({
      url: "http://spa-badge-api.herokuapp.com/teachers/9",
      type: "GET",
      data: 'json'
    }).then(function(data){
      var walker = JSON.parse(data)
      var badges = walker.badges
      var teacherPhrase = []
      for(var i=0; i < badges.length ;i++){
        teacherPhrase.push(badges[i].phrase);
      }
      var textnode = document.createTextNode(teacherPhrase)
      debugger;
      $.select('a')[0].parentElement.appendChild(textnode);
    })
  })
})






  // var eventListener = function(){
  //   $.on('a','click',trigger('a',click, ajax))
  // }
  // function ajax(e){
  //   e.preventDefault();
  // }
