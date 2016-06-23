$.ready(function(){
  $.request({
      url: "http://spa-badge-api.herokuapp.com/teachers",
      type: "GET",
      data: 'json'
    }).then(function(data){
      var teachers = JSON.parse(data)
      var theTemplateScript = $.select("#teachers").innerHTML;
      var theTemplate = Handlebars.compile(theTemplateScript);
      var context ={ teachers:teachers }
      var theCompiledHtml = theTemplate(context);
      $.select('.content-placeholder')[0].innerHTML= theCompiledHtml;



      $.on('a','click', function(e){
        e.preventDefault();
        var idNum = this.getAttribute("href")
        $.request({
          url: "http://spa-badge-api.herokuapp.com/teachers/" + idNum,
          type: "GET",
          data: 'json'
        }).then(function(data){
          var teacher = JSON.parse(data)
          var badges = teacher.badges
          var teacherPhrase = []
          for(var i=0; i < badges.length ;i++){
            teacherPhrase.push(badges[i].phrase);
          }

          var theTemplateScript = $.select("#form").innerHTML;
          var theTemplate = Handlebars.compile(theTemplateScript);
          // var text = theTemplateScript.split()
          var context ={ teacher:teacher }
          var theCompiledHtml = theTemplate(context);
          // var textnode = document.createTextNode(teacherPhrase)
          // var script = document.createTextNode(text)
          var node = document.createElement("br")
          $.select('a')[idNum-1].parentElement.appendChild(node);
          $.select('.appendForm')[idNum-1].innerHTML = theCompiledHtml;

          $.on('form', 'submit', function(e){
            e.preventDefault();
            var url = this.getAttribute("action")
            var phrase = this.children[1].value
            var teacher_id = this.children[0].value
            $.request({
              url: url,
              type: "POST",
              data: "phrase=" + phrase +"&votes=" + "0" + "&teacher_id=" + teacher_id
            }).then(function(data){
              var newBadge = JSON.parse(data)
              var theTemplateScript = $.select("#newBadge").innerHTML;
              var theTemplate = Handlebars.compile(theTemplateScript);
              var context ={ newBadge:newBadge }
              var theCompiledHtml = theTemplate(context);
              $.select('.traci').innerHTML = theCompiledHtml;
            })

          })
        })
      })



    })
  })





  // var eventListener = function(){
  //   $.on('a','click',trigger('a',click, ajax))
  // }
  // function ajax(e){
  //   e.preventDefault();
  // }
