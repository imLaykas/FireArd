$(document).ready(function() {  //function para aparecer o menu mobile
    $('#mobile-btn').on('click', function() {
        $('#mobile-menu').toggleClass('active');
        $('#menu-icon').toggleClass('fa-x');
    });

});