var video = $('.video-container').find('video'), nextVideo;
var videoBar = video.siblings('.progress-bar');
var recording = false;
var tool = false;

function initVideoPlayer() {
    'use strict';

    startVideoBanner();
    changeVideo();
    blinkingRedDot();

    function startVideoBanner() {

        video.each(function (index) {

            var videoBar = video.siblings('.progress-bar'),
                dragging = false,
                nextLoaded = false;

            nextVideo = video.first().find('video');

            if (index === 0) {
                video.parents('.video-container').addClass('active');
                video[0].preload = 'auto';
            }

            $(video).on('timeupdate', function () {
                var videoTime = ((this.currentTime / this.duration) * 100);
            });

            function updateProgressAuto(video) {
                var videoBar = $(video).siblings('.progress-bar');
                var videoPercent = ((video[0].currentTime / video[0].duration) * 100);

                videoBar.find('.progress').css('width', videoPercent + '%');
                videoBar.find('.progress-value').html(parseFloat(video[0].currentTime).toFixed(2) + ' / ' + parseFloat(video[0].duration).toFixed(2));
            }

            setInterval(function () {
                updateProgressAuto(video);
            }, 100);

            function updateProgressManual(progressBarPosition, video) {
                var videoBar = $(video).siblings('.progress-bar');
                var videoPercentage = ((progressBarPosition / videoBar.outerWidth()) * 100);

                videoBar.find('.progress').css('width', videoPercentage + '%');
                videoBar.find('.progress-value').html(parseFloat(video[0].currentTime).toFixed(2) + ' / ' + parseFloat(video[0].duration).toFixed(2));
                video[0].currentTime = ((video[0].duration * videoPercentage) / 100);
            }

            videoBar.on('click', function (e) {
                updateProgressManual((e.pageX - $(this).offset().left), video);
                $(this).find('.progress-inner').css("visibility", "visible");
            });

            videoBar.on('mousedown', function (e) {
                dragging = true;
                updateProgressManual(e.pageX - $(this).offset().left, video);
            });

            videoBar.on('mouseup', function (e) {
                dragging = false;
                updateProgressManual(e.pageX - $(this).offset().left, video);
            });

            videoBar.on('mousemove', function (e) {
                if (dragging === true) {
                    updateProgressManual(e.pageX - $(this).offset().left, video);
                }
            });

            videoBar.on('mouseover', function () {
                $(this).siblings('.progress-overlay').addClass('active');
                $(this).addClass('expanded');
            });

            videoBar.on('mouseout', function () {
                if (tool == false) {
                    $(this).siblings('.progress-overlay').removeClass('active');
                    $(this).removeClass('expanded');
                }
            });
        });
    };

    function changeVideo() {
        $("#videos .poster-wrapper").on("click", function () {
            var alt = $(this).children("img").attr("alt");

            if (alt == "interstellar") {
                video.attr("src", "./videos/interstellar.mp4");
            }
            if (alt == "darknight") {
                video.attr("src", "./videos/the_dark_night.mp4");
            }
            if (alt == "imitation") {
                video.attr("src", "./videos/the_imitation_game.mp4");
            }
            if (alt == "gladiator") {
                video.attr("src", "./videos/gladiator.mp4");
            }
            video.attr("autoplay", '');
        });
    };

    function blinkingRedDot() {
        var dot = $('#red-dot');
        setInterval(function(){
            if (dot.css("opacity") == 1) {
                dot.css("opacity", 0);
            } else {
                dot.css("opacity", 1);
            }
        }, 500);
    }
};

function initKeyboard() {
    // Define keyboard buttons
    document.onkeypress = function (e) {
        e.preventDefault();
        // Space bar
        if ((e || window.event).keyCode === 32) {
            video.get(0).paused ? (video.get(0).play(), $('#play_pause').html(feather.icons.pause.toSvg())) : (video.get(0).pause(), $('#play_pause').html(feather.icons.play.toSvg()));
        }
        // r
        if ((e || window.event).keyCode === 114) {
            if (recording) {
                recording = false;
                $('#red-dot').css('display', 'none');
                video.get(0).pause();
            } else {
                recording = true;
                $('#red-dot').css('display', 'block');
            }
        }
        // t
        if ((e || window.event).keyCode === 116) {
            if (videoBar.hasClass('expanded')) {
                videoBar.siblings('.progress-overlay').removeClass('active');
                videoBar.removeClass('expanded');
                tool = false;
            } else {
                videoBar.siblings('.progress-overlay').addClass('active');
                videoBar.addClass('expanded');
                tool = true;
            }
        }
        // 1
        if ((e || window.event).keyCode === 49) {
            video.get(0).playbackRate = 1;
            $("#video-container").find(".set").removeClass("set");
            $("#speed-1").addClass("set");
        }
        // 2
        if ((e || window.event).keyCode === 50) {
            video.get(0).playbackRate = 0.8;
            $("#video-container").find(".set").removeClass("set");
            $("#speed-2").addClass("set");
        }
        // 3
        if ((e || window.event).keyCode === 51) {
            video.get(0).playbackRate = 0.6;
            $("#video-container").find(".set").removeClass("set");
            $("#speed-3").addClass("set");
        }
        // 3
        if ((e || window.event).keyCode === 52) {
            video.get(0).playbackRate = 0.4;
            $("#video-container").find(".set").removeClass("set");
            $("#speed-4").addClass("set");
        }
    };
};

function initControls() {
    $('#play_pause').on('click', function (e) {
        video.get(0).paused ?
            (video.get(0).play(), $(this).html(feather.icons.pause.toSvg())) :
            (video.get(0).pause(), $(this).html(feather.icons.play.toSvg()));
    });
};