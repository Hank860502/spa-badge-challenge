$.ready(function(){

  $.on('a','click', function(e){
    e.preventDefault();
    $.request({
      url: "http://spa-badge-api.herokuapp.com/teachers/9",
      type: "GET",
      data: 'json'
    }).then(function(data){
      var walker = JSON.parse(data)
      debugger;
      var textnode = document.createTextNode(walker)
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
