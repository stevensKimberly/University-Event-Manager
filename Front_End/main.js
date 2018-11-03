




//jquery functions
$(function () {

    $('#loginButton').submit(function () {

        $.ajax({
            type: "POST",
            url: "loginUser.php",
            data: {
                username: $('#inputUsername').val(),
                password: $('#inputPassword').val()
            },
            success: function (msg) {
                // alert( "Data Saved: " + msg );
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //display login alert
                $('#loginAlert').show();
            }
        });
    })

    //replace modal with innermodal clone when modal close btn is clicked
    $('#ModalContainer').on('hidden.bs.modal', function () {
        //hide modal
        // $('#innerModal').modal('hide');
        //remove innermodal
        $('#innerModal').detach();
        //append cloned modal to modal container
        $('#ModalContainer').append(clonedInnerModal);
        //get the clone inner modal again
        clonedInnerModal = $('#innerModal').clone(true);

    });


    //get all events for my events tab
    $('#myEvents-tab').on('click', function () {
        //send to backend 
        $.ajax({
            type: "GET",
            url: "getMyEvents.php",
            data: "data",
            success: function (events) {
                //detach out all child elements;
                $('#eventCardDeck').children().detach();

                var count = 0;

                //for each event make a card
                $.each(events, function (i, event) {
                    var html = "<div class='card h-100 mb-4'>  <div class='card-body'> <h5 class='card-title'>" + event.eventTitle + "</h5>" +
                        "<h6 class='card-subtitle mb-2 text-muted'>" + event.rsoHosting + "</h6>" +
                        "<p class='card-text'>" + event.eventDescription + "</p>" +
                        "<a class='eventMoreInfo' data-eventID=' " + event.eventID + " href='#' class='card-link'>More Info</a>" +
                        "<a class='eventUnfollow' data-eventID='" + event.eventID + "href='#' class='card-link'>Unfollow</a></div></div>";

                    //append the html inside the eventcarddeck
                    $('#eventCardDeck').append(html);

                    count++; //increment count
                    //for the responisve design
                    if (i === 2) {
                        //every two cards sm
                        $('#eventCardDeck').append('<div class="w-100 d-none d-sm-block d-md-none">');
                    }

                    if (i === 3) {
                        //every three cards md
                        $('#eventCardDeck').append('<div class="w-100 d-none d-md-block d-lg-none"');

                    }


                    if (i === 4) {
                        //every four cards lg
                        $('#eventCardDeck').append('<div class="w-100 d-none d-lg-block d-xl-none">');
                    }


                    if (i === 5) {
                        //every five cards XL
                        $('#eventCardDeck').append('<div class="w-100 d-none d-xl-block">');
                    }
                });



            },
            error: function () {
                //detach out all child elements;
                //$('#eventCardDeck').children().detach();
                alert("Server Failed To Retrieve Events");
            }
        });
    });




    //get all rsos for my rsos tab
    $('#myRSOs-tab').on('click', function () {
        //send to backend 
        $.ajax({
            type: "GET",
            url: "getMyRSOs.php",
            data: "data",
            success: function (rsos) {
                //detach out all child elements;
                $('#rsoCardDeck').children().detach();

                var count = 0; //count the amount of cards
                //for each event make a card
                $.each(rsos, function (i, rso) {

                    var html = "<div class='card h-100 mb-4'>  <div class='card-body'> <h5 class='card-title'>" + rso.rsoTitle + "</h5>" +
                        "<h6 class='card-subtitle mb-2 text-muted'>" + rso.rsoType + "</h6>" +
                        "<p class='card-text'>" + rso.rsoDescription + "</p>" +
                        "<a data-eventID=' " + rso.rsoID + " href='#' class='card-link'>More Info</a>" +
                        "<a data-eventID='" + rso.rsoID + "href='#' class='card-link'>Unfollow</a></div></div>";

                    //append the html inside the eventcarddeck
                    $('#rsoCardDeck').append(html);

                    count++; //increment card

                    //for the responisve design
                    if (count === 2) {
                        //every two cards sm
                        $('#rsoCardDeck').append('<div class="w-100 d-none d-sm-block d-md-none">');
                    }

                    if (count === 3) {
                        //every three cards md
                        $('#rsoCardDeck').append('<div class="w-100 d-none d-md-block d-lg-none"');

                    }


                    if (count === 4) {
                        //every four cards lg
                        $('#rsoCardDeck').append('<div class="w-100 d-none d-lg-block d-xl-none">');
                    }


                    if (count === 5) {
                        //every five cards XL
                        $('#rsoCardDeck').append('<div class="w-100 d-none d-xl-block">');
                    }


                });

            },
            error: function () {
                //detach out all child elements;
                // $('#rsoCardDeck').children().detach();
                alert("Server Failed To Retrieve RSOs");
            }
        });
    });


    //load eventpage
    //send eventID 
    //receive event info
    $('.eventMoreInfo').on('click', function () {
        //get event id
        var eventID = $(this).attr('data-eventID');

        //create object
        var obj = {
            "eventID": eventID
        };


        var jsonEventID = JSON.stringify(obj);


        //send event id
        $.ajax({
            type: "GET",
            url: "moreInfoEvent.php",
            data: jsonEventID,
            success: function () {
                //goto event page
                window.location.href = "eventPage.html";


                //update eventpage info


            },
            error: function () {

            }
        });


    });


    $('#createRSOBtn').on('click', function () {
        console.log("in hererereer");
        //get rso info
        var rsoTitle = $('#rsoTitle').text();
        var rsoDescription = $('#rsoDescription').text();
        var rsoType = $('#rsoType option:selected').text();
        var rsoUniversity = $('#university option:selected').text();

        //create json object
        var obj = {
            "rsoTitle": rsoTitle,
            "rsoDesription": rsoDescription,
            "rsoType": rsoType,
            "rsoUniversity": rsoUniversity
        };

        //stringify the object
        var jsonRSO = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: "createRSO.php",
            data: jsonRSO,
            sucess: function () {

            },
            error: function () {
                console.log("failedddd");
            }
        });
    });




});//end of jquery function

