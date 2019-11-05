$( function() {
    // function log( message ) {
    //   $( "<div>" ).text( message ).prependTo( "#log" );
    //   $( "#log" ).scrollTop( 0 );
    // }
    
  //   $( "#search__input" ).autocomplete({
  //     source: "http://35.180.182.8/Search?keywords=ath&language=en&limit=10",
  //     minLength: 2,
  //     select: function( event, ui ) {
  //       log( "Selected: " + ui.item.name + " aka " + ui.item.country );
  //     }
  //   });
    
    // Detect the browser language
    var userLang = (navigator.language || navigator.userLanguage).substring(0,2); 
    console.log ("The browser language is: " + userLang);
    
    // Apply autocomplete to the text box
    $("#search__input").autocomplete({
      source: function (request, response) {
        // API Call
        $.ajax({
            url: "http://35.180.182.8/Search?keywords="+ this.term +"&language="+ userLang +"&limit=20",
            data: { query: request.term },
            success: function (data) {

                if(data.entries.length !== 0) {
                    // Enable the button functionality
                    $("#btn").prop( "disabled", false );

                    var marginTop = 19.7 * data.entries.length;
                    $("#btn").css("margin-top", marginTop);
                }
              


            //   $('#btn').addClass('marginTop');
              // TODO close spinner
              // Transform the response to an array of objects including both value and label properties for each item
                var transformed = data.entries.map((e, index) => { return{ id:index, label:e.name }; });
                response(transformed);
            },
            error: function () {
              // TODO close spinner
              response([]);
            }
        });
      },
      minLength: 2,
      delay: 500
    });

    $( "#search__input" ).on( "autocompleteopen", function( event, ui ) {
        console.log("list opened");
        // var listHeight = $( "ui-id-1" ).height();
        // console.log(listHeight);
        // $("#btn").css("margin-top", listHeight);
    });
    
    $( "#search__input" ).on( "autocompleteclose", function( event, ui ) {
        console.log("list closed");
        $("#btn").css("margin-top", "3rem");
    } );

    $( "#btn" ).click(function() {
      console.log( "Handler for .click() called." );
      console.log( $("#search__input").value );
      window.location.href="https://www.google.com/search?q="+ $("#search__input").val();
    });
});