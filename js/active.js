$( document ).ready(function() {
    $(".navbar .nav-item").on("click", function(){
        $(".navbar").find(".active").removeClass("active");
        $(this).addClass("active");
     });

     $("#menu .menu-item").on("click", function(){
        $("#menu").find(".selected").removeClass("selected");
        $(this).addClass("selected");
     });
});

