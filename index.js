$( function() {
    // Detect the browser language
    var userLang = (navigator.language || navigator.userLanguage).substring(0,2); 

    // For screens >1200px call 20 menu items, otherwise call 10
    if( $(window).width() > 1200 ) {
      autocompleteFunction(20);
    } else {
      autocompleteFunction(10);
    }
    
    // Event listener for when the autocomplete menu opens
    $( ".search__input" ).on( "autocompleteopen", function( event, ui ) {
        // Calculate the menu height
        var listHeight = $( "#ui-id-1" ).css( "height" );
        // Move the search button under the menu
        $(".btn").css("margin-top", listHeight);
    });
    
    // Event listener for when the autocomplete menu closes
    $( ".search__input" ).on( "autocompleteclose", function( event, ui ) {
        $(".btn").css("margin-top", "3rem");
    } );

    // Event listener for when input changes
    $( ".search__input" ).on('input', function() {
      // Display delete button
      $( ".search__icon--del" ).css("display", "block");
      // If user deletes the input value
      if( $( ".search__input" ).val() === "" ) {
        // Remove delete button
        $( ".search__icon--del" ).css("display", "none");
        // Disable the button functionality
        $(".btn").prop( "disabled", true );
      }
    });

    // Event listener for delete button
    $( ".search__icon--del" ).click(function() {
      // Delete the input text
      $( ".search__input" ).val("");
      // Remove delete button
      $( ".search__icon--del" ).css("display", "none");
      // Disable the button functionality
      $(".btn").prop( "disabled", true );
    });

    // Event listener for search button
    $( ".btn" ).click(function() {
      // Redirect to google with the selected search value
      window.location.href="https://www.google.com/search?q="+ $(".search__input").val();
    });

    function autocompleteFunction(numberOfEntries) {
      // Apply autocomplete to the text box
      $(".search__input").autocomplete({
        source: function (request, response) {
          // API Call
          $.ajax({
              url: "http://35.180.182.8/Search?keywords="+ this.term +"&language="+ userLang +"&limit="+ numberOfEntries,
              data: { query: request.term },
              success: function (data) {

                  if(data.entries.length !== 0) {
                    // Event listener for when a menu item is selected
                    $( ".search__input" ).on( "autocompleteselect", function( event, ui ) {
                      // Enable the button functionality
                      $(".btn").prop( "disabled", false );
                    } );
                  }
                  // Transform the response to an array of objects including both value and label properties for each item
                  var transformed = data.entries.map(function (e, index) { return{ id:index, label:e.name }; });
                  response(transformed);
              },
              error: function () {
                response([]);
              },
              timeout: 2000 // sets timeout to 2 seconds
          });
        },
        minLength: 2,
        delay: 500
      });
    }
});