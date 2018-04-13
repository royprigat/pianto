// Handles all active states (On/Off)
function activeClasses() {
    $(".navbar .nav-item").on("click", function(){
        $(".navbar").find(".active").removeClass("active");
        $(this).addClass("active");
     });

     $("#sidenav .nav-link").on("click", function(){
        $("#sidenav").find(".active").removeClass("active");
        $(this).addClass("active");
     });

     $("#videos .poster-wrapper").on("click", function(){
        $("#videos").find(".selected").removeClass("selected");
        $(this).addClass("selected");
     });
}