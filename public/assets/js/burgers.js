// this js file handles our event listeners and changing the burger state from devoured to not devoured

// **** change state ****
$(function () {
  $('.change-devour').on('click', function (event) {
    var id = $(this).data('id');
    var newDevour = $(this).data('newdevour');

    var newDevourState = {
      devoured: newDevour
    };

    // Send the PUT request
    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: newDevourState
    }).then(
      function () {
        console.log('changed devour to', newDevour);
        // reload the page to get the updated list
        location.reload();
      }
    );
  });

  // **** create new burger ****
  $('.create-form').on('submit', function (event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $('#brg').val().trim(),
    };

    // send the POST request
    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(
      function () {
        console.log('created new burger');
        location.reload();
      }
    );
  });

  // **** Delete burger ****
  $('.delete-burger').on('click', function (event) {
    var id = $(this).data('id');

    // send DELETE request
    $.ajax('/api/burgers/' + id, {
      type: 'DELETE',

    }).then(
      function () {
        console.log('deleted burger' + id);
        location.reload();
      }
    );
  });

});
