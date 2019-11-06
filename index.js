$( function() {
    // Detect the browser language
    var userLang = (navigator.language || navigator.userLanguage).substring(0,2); 
    console.log ("The browser language is: " + userLang);
    
    if($(window).width() >= 1200){
      autocompleteFunction(20);
    } else {
      autocompleteFunction(10);
    }
    
    $( ".search__input" ).on( "autocompleteopen", function( event, ui ) {
        console.log("list opened");
        // var listHeight = $( "ui-id-1" ).height();
        // console.log(listHeight);
        // $("#btn").css("margin-top", listHeight);
    });
    
    // Event listener for when the autocomplete menu closes
    $( ".search__input" ).on( "autocompleteclose", function( event, ui ) {
        console.log("list closed");
        $(".btn").css("margin-top", "3rem");
    } );

    // Event listener for when input changes
    $( ".search__input" ).on('input', function() {
      console.log( "search input: " + $( ".search__input" ).val() );
      if( $( ".search__input" ).val() === "" ) {
        // Disable the button functionality
        $(".btn").prop( "disabled", true );
        console.log( "input null" );
      }
      console.log( "Handler for .change() called." );
    });

    $( ".btn" ).click(function() {
      console.log( "Handler for .click() called." );
      console.log( $(".search__input").value );
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
                      console.log("selected item");
                      console.log(ui.item);
                      // Enable the button functionality
                      $(".btn").prop( "disabled", false );
                    } );

                    // Move the search button under the menu
                    var marginTop = 19.7 * data.entries.length;
                    $(".btn").css("margin-top", marginTop);
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