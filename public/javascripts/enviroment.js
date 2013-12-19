$(function(){
var coords = JSON.parse(localStorage.coords);
var alpha=['A','B','C','D','E','F','G','H','I','J'];
var target = $("#oponent_grid");
var firstrow = $('<div class="row"></div>');
var firstcel = $('<div class="cell"></div>var');
  firstrow.append(firstcel);
    for(var i= 0; i<10 ; i++){
      var el = $('<div class="cell"></div>');
      el.html(i);
      firstrow.append(el);
    }
    target.append(firstrow);
   
    for(var i=0;i<10;i++){
      var row=$('<div class="row"></div>');
      var firstel= $('<div class="cell"></div>');
      firstel.html(alpha[i]);
      row.append(firstel);
      for(var j=0; j<10;j++){
        var linkel= $('<a href="#" class="cell free_field" itemprop= '+ i+j+'></a>')
        row.append(linkel);
      }
      target.append(row);
      //target2.append(row);
    }
    var gamewidth= $('#oponent_grid').width();
    $('#oponent_grid').css({'height':gamewidth + 'px'});
    $('.cell').css({'height':gamewidth/11 +'px'});
    $('.cell').css({'padding':gamewidth/30 + 'px'});
    
    
    var target = $("#own_grid");
    var firstrow = $('<div class="row"></div>');
    var firstcel = $('<div class="cell"></div>');
    firstrow.append(firstcel);
    for(var i= 0; i<10 ; i++){
      var el = $('<div class="cell"></div>');
      el.html(i);
      firstrow.append(el);
    }
    target.append(firstrow);
   
    for(var i=0;i<10;i++){
      var row=$('<div class="row"></div>');
      var firstel= $('<div class="cell"></div>');
      firstel.html(alpha[i]);
      row.append(firstel);
      for(var j=0; j<10;j++){
        var cel = $('<div class="cell own_field" itemprop= '+i+j+'></div>')
        row.append(cel);
      }
      target.append(row);
      //target2.append(row);
    }
    var gamewidth= $('#oponent_grid').width();
    $('#oponent_grid').css({'height':gamewidth + 'px'});
    $('.cell').css({'height':gamewidth/11 +'px'});
    $('.cell').css({'padding':gamewidth/30 + 'px'});
    
    $(window).resize(function(){
      var gamewidth= $('#oponent_grid').width();
      $('#oponent_grid').css({'height':gamewidth + 'px'});
      $('.cell').css({'height':gamewidth/11 +'px'});
      $('.cell').css({'padding':gamewidth/30 + 'px'});
    });
    
    $('.own_field').each(function(){
      for(var i=0; i<coords.length; i++){
        if(coords[i]==$(this).attr('itemprop')){
          $(this).html('X');
        }
      }
    })
});

