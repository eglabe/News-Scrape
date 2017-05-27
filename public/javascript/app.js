$(document).ready(function() {

    $("#submit-btn").on("click", function() {
        var userInput = {
            userName: $("#user-name").val().trim(),
            userComment: $("#user-comment").val().trim()
        };
        console.log(userInput);

        User.count({ 'username': userName }, function(err, count) {
            if (count === 0) {
                newUserComment(userInput);
            } else {
                establishedUserComment(userInput);
            }
        });

    });

    function newUserComment(userInput) {
        $.ajax({
            method: "POST",
            url: "/new-user-comment",
            data: userInput
        }).done(function() {
            window.location.href = "/home";
        });
    }

    function establishedUserComment(userInput) {
        $.ajax({
            method: "POST",
            url: "/established-user-comment",
            data: userInput
        }).done(function() {
            window.location.href = "/home";
        });
    }

});