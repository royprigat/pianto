$(document).ready(function () {

    $("#navbar").hide();
    $("#wrapper").hide();
    $("#front-page").show();

    $('.owl-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 50,
        responsive: {
            600: {
                items: 2
            }
        }
    });

    $('.nextItem').click(function () {
        $(".owl-carousel").trigger('next.owl.carousel', [300]);
    });

    $('.prevItem').click(function () {
        $(".owl-carousel").trigger('prev.owl.carousel', [300]);
    });

    $(".owl-carousel .poster-wrapper").on("click", function () {
        $("#front-page").hide();
        $("#navbar").show();
        $("#wrapper").show();
        $(".anchor").show();
        $('#play_pause').find('.material-icons').html('pause');

        looping = false;
        lessonStart = 0;
        lessonEnd = 0;
        var alt = $(this).children("img").attr("alt");

        if (alt == "interstellar") {
            video.attr("src", "./videos/interstellar.mp4");
            $("#videos").find(".selected").removeClass("selected");
            $("#interstellar-poster").addClass("selected");
            $('#darknight-lessons').hide();
            $('#imitation-lessons').hide();
            $('#gladiator-lessons').hide();
            $('#interstellar-lessons').show();
            $('#gladiator-anchors').hide();
            $('#darknight-anchors').hide();
            $('#interstellar-anchors').show();
            currentVideo = "interstellar";
        }
        if (alt == "darknight") {
            video.attr("src", "./videos/the_dark_night.mp4");
            $("#videos").find(".selected").removeClass("selected");
            $("#darknight-poster").addClass("selected");
            $('#gladiator-lessons').hide();
            $('#imitation-lessons').hide();
            $('#interstellar-lessons').hide();
            $('#darknight-lessons').show();
            $('#gladiator-anchors').hide();
            $('#darknight-anchors').show();
            $('#interstellar-anchors').hide();
            currentVideo = "darknight";
        }
        if (alt == "gladiator") {
            video.attr("src", "./videos/gladiator.mp4");
            $("#videos").find(".selected").removeClass("selected");
            $("#gladiator-poster").addClass("selected");
            $('#darknight-lessons').hide();
            $('#imitation-lessons').hide();
            $('#interstellar-lessons').hide();
            $('#gladiator-lessons').show();
            $('#gladiator-anchors').show();
            $('#darknight-anchors').hide();
            $('#interstellar-anchors').hide();
            currentVideo = "gladiator";
        }
        video.attr("autoplay", '');
    });

    $("#back-btn").click(function (e) {
        e.preventDefault();
        video[0].pause();
        $("#navbar").hide();
        $("#wrapper").hide();
        $("#front-page").show();
        $("#record-lesson").show();
        $("#origin").hide();
        $(".lesson-wrapper").removeClass("lesson-selected");
        looping = false;
        if (recording) {
            toggleRecord();
        }
        originalDuration = 0;
        $(".wrapper-edit").hide();
        $("#lesson-bar").hide();
    });

    $("#lessons-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-right");
    });

    initVideoPlayer();
    initKeyboard();
    initControls();

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $(".dropdown-item").on("click", function() {
        var speed = $(this).html();
        $("#dropdownPlayback").html(speed);
    });

    $(".anchor").on("click", function() {
        $(".anchor").removeClass("anchor-active");
        $(this).addClass("anchor-active");
        video[0].pause();
        $('#play_pause').find('.material-icons').html('play_arrow');
    });

    $('interstellar-lessons').hide();
    $('darknight-lessons').hide();
    $('gladiator-lessons').hide();
    $(".anchor").hide();
    $("#origin").hide();

    $("#origin").on("click", function () {
        $("#record-lesson").show();
        $("#lesson-bar").hide();
        $("#origin").hide();
        $(".lesson-wrapper").removeClass("lesson-selected");
        looping = false;
        video.attr("src", "./videos/" + currentVideo + ".mp4");
        $(".wrapper-edit").hide();
    });

    $("#edit-toggle").on("click", function() {
        var edit = $(this);
        if (edit.hasClass('edit-mode')) {
            edit.removeClass('edit-mode');
            $(".wrapper-edit").hide();
        } else {
            edit.addClass('edit-mode');
            $(".wrapper-edit").show();
        }
    })

});