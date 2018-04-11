videos = [
    {
        "title": "interstellar"
    },
    {
        "title": "the_mitation_game"
    },
    {
        "title": "the_dark_night"
    }
];

$(document).ready(function () {
    var vid = $("#main-player").find("video");
    document.onkeypress = function(e) { 
        e.preventDefault();
        if ( (e || window.event).keyCode === 32 ) { 
        vid.get(0).paused ? vid.get(0).play() : vid.get(0).pause(); 
    }};
    $("#videos .poster-wrapper").on("click", function () {
        var alt = $(this).children("img").attr("alt");
        if (alt == "interstellar") {
            vid.attr("src","./videos/interstellar.mp4");
        } if (alt == "darknight") {
            vid.attr("src","./videos/the_dark_night.mp4");
        } if (alt =="imitation") {
            vid.attr("src","./videos/the_imitation_game.mp4");
        }
        vid.attr("autoplay",'');
    });
});