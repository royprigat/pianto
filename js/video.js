// Global vars
var video = $('.video-container').find('video'),
    nextVideo;
var videoBar = video.siblings('.progress-bar');
var recording = false;
var start = 0;
var end = 0;
var tool = false;
var mute = false;
var looping = false;
var interval;
var time = 0;

var lessonStart = 0;
var lessonEnd = 0;

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

            function updateProgressAuto(video) {
                if (looping) {
                    console.log(lessonEnd);
                    if (video[0].currentTime == lessonEnd || video[0].currentTime > lessonEnd) {
                        video[0].currentTime = lessonStart;
                        video[0].play();
                    }
                }

                var videoBar = $(video).siblings('.progress-bar');
                var videoPercent = ((video[0].currentTime / video[0].duration) * 100);

                videoBar.find('.progress').css('width', videoPercent + '%');
                videoBar.find('.progress-value').html(toTime(video[0].currentTime) + ' / ' + toTime(video[0].duration));
            }

            setInterval(function () {
                updateProgressAuto(video);
            }, 100);

            function updateProgressManual(progressBarPosition, video) {
                var videoBar = $(video).siblings('.progress-bar');
                var videoPercentage = ((progressBarPosition / videoBar.outerWidth()) * 100);

                videoBar.find('.progress').css('width', videoPercentage + '%');
                videoBar.find('.progress-value').html(toTime(video[0].currentTime) + ' / ' + toTime(video[0].duration));
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
            looping = false;
            lessonStart = 0;
            lessonEnd = 0;
            var alt = $(this).children("img").attr("alt");

            if (alt == "interstellar") {
                video.attr("src", "./videos/interstellar.mp4");
                $('#darknight-lessons').hide();
                $('#imitation-lessons').hide();
                $('#gladiator-lessons').hide();
                $('#interstellar-lessons').show();
            }
            if (alt == "darknight") {
                video.attr("src", "./videos/the_dark_night.mp4");
                $('#gladiator-lessons').hide();
                $('#imitation-lessons').hide();
                $('#interstellar-lessons').hide();
                $('#darknight-lessons').show();
            }
            if (alt == "imitation") {
                video.attr("src", "./videos/the_imitation_game.mp4");
                $('#darknight-lessons').hide();
                $('#gladiator-lessons').hide();
                $('#interstellar-lessons').hide();
                $('#imitation-lessons').show();
            }
            if (alt == "gladiator") {
                video.attr("src", "./videos/gladiator.mp4");
                $('#darknight-lessons').hide();
                $('#imitation-lessons').hide();
                $('#interstellar-lessons').hide();
                $('#gladiator-lessons').show();
            }
            video.attr("autoplay", '');
        });
    };

    function blinkingRedDot() {
        var dot = $('#red-dot');
        setInterval(function () {
            if (dot.css("opacity") == 1) {
                dot.css("opacity", 0);
            } else {
                dot.css("opacity", 1);
            }
        }, 500);
    }
};

function initKeyboard() {
    document.onkeypress = function (e) {
        e.preventDefault();
        // Space bar for play/pause
        if ((e || window.event).keyCode === 32) {
            video.get(0).paused ? (video.get(0).play(), $('#play_pause').html(feather.icons.pause.toSvg())) : (video.get(0).pause(), $('#play_pause').html(feather.icons.play.toSvg()));
        }
        // r for recording
        if ((e || window.event).keyCode === 114) {

            if (recording) {
                recording = false;
                $('#red-dot').css('display', 'none');
                $('#stopper').css('display', 'none');
                video.get(0).pause();
                end = video[0].currentTime;
                if (end - start > 2) {
                    addLesson(start, end);
                }
                start = video[0].currentTime;
            } else {
                recording = true;
                time = 0;
                $('#stopper').html('0:00');
                clearInterval(interval);
                interval = setInterval(timer, 1000);
                $('#red-dot').css('display', 'block');
                $('#stopper').css('display', 'block');
                video.get(0).play();
                start = video[0].currentTime;
            }
        }
        // m for mute/unmute
        if ((e || window.event).keyCode === 109) {
            if (mute) {
                mute = false;
                video.get(0).muted = false;
                $("#mute").removeClass("set");
            } else {
                mute = true;
                video.get(0).muted = true;
                $("#mute").addClass("set");
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

    document.onkeydown = function (e) {
        // left arrow
        if ((e || window.event).keyCode === 37) {
            video[0].currentTime -= 5;
        }

        // right arrow
        if ((e || window.event).keyCode === 39) {
            video[0].currentTime += 5;
        }
    };
};

function initControls() {
    $('#play_pause').on('click', function (e) {
        video.get(0).paused ?
            (video.get(0).play(), $(this).html(feather.icons.pause.toSvg())) :
            (video.get(0).pause(), $(this).html(feather.icons.play.toSvg()));
    });
    $('#mute').on('click', function (e) {
        if (mute) {
            mute = false;
            video.get(0).muted = false;
            $("#mute").removeClass("set");
        } else {
            mute = true;
            video.get(0).muted = true;
            $("#mute").addClass("set");
        }
    });
    $('#backward').on('click', function (e) {
        video[0].currentTime -= 5;
    });
    $('#forward').on('click', function (e) {
        video[0].currentTime += 5;
    });
    $('#speed-1').on('click', function (e) {
        video.get(0).playbackRate = 1;
        $("#video-container").find(".set").removeClass("set");
        $("#speed-1").addClass("set");
    });
    $('#speed-2').on('click', function (e) {
        video.get(0).playbackRate = 0.8;
        $("#video-container").find(".set").removeClass("set");
        $("#speed-2").addClass("set");
    });
    $('#speed-3').on('click', function (e) {
        video.get(0).playbackRate = 0.6;
        $("#video-container").find(".set").removeClass("set");
        $("#speed-3").addClass("set");
    });
    $('#speed-4').on('click', function (e) {
        video.get(0).playbackRate = 0.4;
        $("#video-container").find(".set").removeClass("set");
        $("#speed-4").addClass("set");
    });
};

function toTime(input) {
    var seconds = ((Math.floor(parseFloat(input).toFixed(2))) % 60).toString();
    var minutes = (Math.floor((parseFloat(input).toFixed(2)) / 60)).toString();

    if (seconds.length == 1) {
        seconds = '0' + seconds;
    }

    return minutes + ":" + seconds;
};

function timer() {
    time += 1;
    $('#stopper').html(toTime(time));
};

function addLesson(start, end) {
    var alt = $(".selected").children("img").attr("alt");
    var lesson = '<div class="lesson">' +
        '<video>' +
        '<source src=' + video.attr('src') + '#t=' + start + "," + end + ' type="video/mp4">' +
        '</video>' +
        '<div class="lesson-overlay">' +
        toTime(start) + " - " + toTime(end) +
        '</div>' +
        '<div class="lesson-details" contenteditable="true">' +
        'Title'
    '</div>' +
    '</div>';

    if (alt == "interstellar") {
        $('#interstellar-lessons').append(lesson);
    };
    if (alt == "darknight") {
        $('#darknight-lessons').append(lesson);
    };
    if (alt == "imitation") {
        $('#imitation-lessons').append(lesson);
    };
    if (alt == "gladiator") {
        $('#gladiator-lessons').append(lesson);
    };

    $(".lesson").on("click", function () {
        looping = true;
        $(this).children("video").addClass('lesson-selected');
        var src = $(this).children("video").children("source").attr("src");
        var start_end = (src.substring(src.indexOf("=") + 1)).split(",");
        lessonStart = start_end[0];
        lessonEnd = start_end[1];
        video.attr("src", src);
        video.attr("autoplay", '');
    });
};