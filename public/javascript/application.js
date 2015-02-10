$(document).ready(function() {

    /*====================================
  =            ON DOM READY            =
  ====================================*/
  $(function() {
    $('.toggle-nav').click(function() {
      // Calling a function in case you want to expand upon this.
      toggleNav();
    });
  });


  /*========================================
  =            CUSTOM FUNCTIONS            =
  ========================================*/
  function toggleNav() {
    if ($('#site-wrapper').hasClass('show-nav')) {
      // Do things on Nav Close
      $('#site-wrapper').removeClass('show-nav');
    } else {
      // Do things on Nav Open
      $('#site-wrapper').addClass('show-nav');
    }

    //$('#site-wrapper').toggleClass('show-nav');
  }

  var current_position = 0;

  var get_links = function(position) {
    $.getJSON('/links?pos='+position).success(function(data) {
      $("#links .inner").html("");
      $.each(data, function(index, link){;
        $("#links .inner").append(
          '<div class="link" >' +
            '<a href="' + link.url + '">' + link.title + '</a>' +
              // data-keyname="val" attributes can be used to store and fetch data from elements
            '<button class="delete" data-link_id="' + link.id + '" method="DELETE" action="/remove" type="submit" style="border: 0; background: trans" >' + 'x' + '</button>' + 
          '</div>'
        );      
      })
    });
  }

  get_links(current_position);

  $('#next').click(function(e){
    
    current_position += 5;
    get_links(current_position);
  });

  $('#prev').click(function(e){
    current_position -= 5;
    get_links(current_position);
  });
  // var current_position = 0;

  // var get_links = function(position) {
  //   $.getJSON('/links?pos='+position).success(function(data) {
  //     $("#links .inner").html("");
  //     $.each(data, function(index, link){;
  //       $("#links .inner").append(
  //         '<div class="link" >' +
  //           '<a href="' + link.url + '">' + link.title + '</a>' +
  //             // data-keyname="val" attributes can be used to store and fetch data from elements
  //           '<button class="delete" data-link_id="' + link.id + '" method="DELETE" action="/remove" type="submit" style="border: 0; background: trans" >' + 'x' + '</button>' + 
  //         '</div>'
  //       );      
  //     })
  //   });
  // }

  // get_links(current_position);

  // $('#next').click(function(e){
    
  //   current_position += 5;
  //   get_links(current_position);
  // });

  // $('#prev').click(function(e){
  //   current_position -= 5;
  //   get_links(current_position);
  // });


  $('form#add_url').submit(function(e) {  
    e.preventDefault();
    var url = $(this).find('#urlfield').val();
    console.log(url);
    $.ajax({
        type: "POST",
        url: '/links', //sumbits it to the given url of the form
        data: {url: url},
        dataType: "json",
        success: function(link) {
          console.log('in success');
          $("#links").append(
            '<div class="link">' +
              '<a class href="' + link.url + '">' + link.title + '</a>' + 
            '</div>'
          ); 
        }
    });
  });

  $('#links').on('click', '.delete', function(e) {  
    e.preventDefault();
     // get link_id from the delete button that was clicked
    var id = $(this).data('link_id');

   // store the whole link row in a variable so it can be removed from the page after the ajax call
    var link_element = $(this).parents('.link');
    $.ajax({
         type: "DELETE",
         url: '/remove', //sumbits it to the given url of the form
         data: {id: id},
         dataType: "json",
         success: function(id) {
          // remove lnik from page if it is deleted successfully
         link_element.remove();
         }
     });
   });

// .parent.children('a')
  // $('#delete').click(function(e) {  
  //   e.preventDefault();
  //   var id = $(this).find('#id').val();
  //   console.log(url);
  //   $.ajax({
  //       type: "DELETE",
  //       url: '/remove', //sumbits it to the given url of the form
  //       data: {id: id},
  //       dataType: "json",
  //       success: function(id) {
  //         console.log('in success');
  //         $("#delete")
  //       }
  //   });
  // });

});