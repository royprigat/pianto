// Global vars
var video = $('#video-container').find('video'),
    nextVideo;
var videoBar = video.siblings('.progress-bar');
var recording = false;
var start = 0;
var end = 0;
var tool = false;
var mute = false;
var looping = false;
var editing = false;
var interval;
var time = 0;
var currentVideo;
var originalDuration = 0;

var lessonStart = 0;
var lessonEnd = 0;

function initVideoPlayer() {
    'use strict';

    startVideoBanner();
    changeAnchor();
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
                    if (video[0].currentTime == lessonEnd || video[0].currentTime > lessonEnd || video[0].currentTime < lessonStart) {
                        video[0].currentTime = lessonStart;
                        setTimeout(function () {
                            video[0].play();
                        }, 1000);
                    }
                }

                var videoBar = $(video).siblings('.progress-bar');
                var videoPercent = ((video[0].currentTime / video[0].duration) * 100);

                videoBar.find('.progress').css('width', videoPercent + '%');
                videoBar.find('.progress-value').html(toTime(video[0].currentTime) + ' / ' + toTime(video[0].duration));

                if (currentVideo == "gladiator") {
                    if (video[0].currentTime > 0 && video[0].currentTime < 29.8) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-intro").addClass("anchor-active");
                    } else if (video[0].currentTime > 29.8 && video[0].currentTime < 59) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-b1").addClass("anchor-active");
                    } else if (video[0].currentTime > 59 && video[0].currentTime < 105.2) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-chorus").addClass("anchor-active");
                    } else if (video[0].currentTime > 105.2 && video[0].currentTime < 121.5) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-b2").addClass("anchor-active");
                    } else if (video[0].currentTime > 121.5 && video[0].currentTime < 137) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-b3").addClass("anchor-active");
                    } else if (video[0].currentTime > 137 && video[0].currentTime < 174.5) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-pre-coda").addClass("anchor-active");
                    } else if (video[0].currentTime > 174.5) {
                        $(".anchor").removeClass("anchor-active");
                        $("#gladiator-coda").addClass("anchor-active");
                    }
                }

                if (currentVideo == "interstellar") {
                    if (video[0].currentTime > 0 && video[0].currentTime < 48) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-intro").addClass("anchor-active");
                    } else if (video[0].currentTime > 48 && video[0].currentTime < 62) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-b1").addClass("anchor-active");
                    } else if (video[0].currentTime > 62 && video[0].currentTime < 107) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-b2").addClass("anchor-active");
                    } else if (video[0].currentTime > 107 && video[0].currentTime < 144) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-pre-chorus").addClass("anchor-active");
                    } else if (video[0].currentTime > 144 && video[0].currentTime < 199) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-chorus").addClass("anchor-active");
                    } else if (video[0].currentTime > 199 && video[0].currentTime < 228) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-b3").addClass("anchor-active");
                    } else if (video[0].currentTime > 228 && video[0].currentTime < 260.5) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-pre-coda").addClass("anchor-active");
                    } else if (video[0].currentTime > 260.5) {
                        $(".anchor").removeClass("anchor-active");
                        $("#interstellar-coda").addClass("anchor-active");
                    }
                }

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

    function changeAnchor() {
        $("#gladiator-intro").on("click", function () {
            video[0].currentTime = 0;
        });
        $("#gladiator-b1").on("click", function () {
            video[0].currentTime = 29.8;
        });
        $("#gladiator-chorus").on("click", function () {
            video[0].currentTime = 59;
        });
        $("#gladiator-b2").on("click", function () {
            video[0].currentTime = 105.2;
        });
        $("#gladiator-b3").on("click", function () {
            video[0].currentTime = 121.5;
        });
        $("#gladiator-pre-coda").on("click", function () {
            video[0].currentTime = 137;
        });
        $("#gladiator-coda").on("click", function () {
            video[0].currentTime = 174.5;
        });



        $("#darknight-intro").on("click", function () {
            video[0].currentTime = 0;
        });
        $("#darknight-b1").on("click", function () {
            video[0].currentTime = 29.8;
        });
        $("#darknight-chorus").on("click", function () {
            video[0].currentTime = 59;
        });
        $("#darknight-b2").on("click", function () {
            video[0].currentTime = 105.2;
        });
        $("#darknight-b3").on("click", function () {
            video[0].currentTime = 121.5;
        });
        $("#darknight-pre-coda").on("click", function () {
            video[0].currentTime = 137;
        });
        $("#darknight-coda").on("click", function () {
            video[0].currentTime = 174.5;
        });



        $("#interstellar-intro").on("click", function () {
            video[0].currentTime = 0;
        });
        $("#interstellar-b1").on("click", function () {
            video[0].currentTime = 48;
        });
        $("#interstellar-b2").on("click", function () {
            video[0].currentTime = 62;
        });
        $("#interstellar-pre-chorus").on("click", function () {
            video[0].currentTime = 107.2;
        });
        $("#interstellar-chorus").on("click", function () {
            video[0].currentTime = 145.2;
        });
        $("#interstellar-b3").on("click", function () {
            video[0].currentTime = 199;
        });
        $("#interstellar-pre-coda").on("click", function () {
            video[0].currentTime = 228;
        });
        $("#interstellar-coda").on("click", function () {
            video[0].currentTime = 260.5;
        });
    }

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

        if (!editing) {
            e.preventDefault();
            // Space bar for play/pause
            if ((e || window.event).keyCode === 32) {
                video.get(0).paused ? (video.get(0).play(), $('#play_pause').find('.material-icons').html('pause')) : (video.get(0).pause(), $('#play_pause').find('.material-icons').html('play_arrow'));
            }
            // r for recording
            if ((e || window.event).keyCode === 114) {
                if (!looping) {
                    toggleRecord();
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
                $("#dropdownPlayback").html("1x");
            }
            // 2
            if ((e || window.event).keyCode === 50) {
                video.get(0).playbackRate = 0.8;
                $("#dropdownPlayback").html("0.8x");
            }
            // 3
            if ((e || window.event).keyCode === 51) {
                video.get(0).playbackRate = 0.6;
                $("#dropdownPlayback").html("0.6x");
            }
            // 4
            if ((e || window.event).keyCode === 52) {
                video.get(0).playbackRate = 0.4;
                $("#dropdownPlayback").html("0.4x");
            }
        }
    };

    document.onkeydown = function (e) {
        if (!editing && !recording) {

            // left arrow
            if ((e || window.event).keyCode === 37) {
                video[0].currentTime -= 5;
            }

            // right arrow
            if ((e || window.event).keyCode === 39) {
                video[0].currentTime += 5;
            }

        }

    };
};

function initControls() {
    $('#record-lesson').on('click', function (e) {
        toggleRecord();
    });
    $('#play_pause').on('click', function (e) {
        video.get(0).paused ?
            (video.get(0).play(), $('#play_pause').find('.material-icons').html('pause')) :
            (video.get(0).pause(), $('#play_pause').find('.material-icons').html('play_arrow'));
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
    });
    $('#speed-2').on('click', function (e) {
        video.get(0).playbackRate = 0.8;
    });
    $('#speed-3').on('click', function (e) {
        video.get(0).playbackRate = 0.6;
    });
    $('#speed-4').on('click', function (e) {
        video.get(0).playbackRate = 0.4;
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

function toggleRecord() {
    if (recording) {
        recording = false;
        if (!$("#wrapper").hasClass("toggled-right")) {
            $("#wrapper").toggleClass("toggled-right");
        }
        $("#record-lesson").html("Record Lesson");
        $('#red-dot').css('display', 'none');
        $('#stopper').css('display', 'none');
        video.get(0).pause();
        end = video[0].currentTime;
        if (end - start > 1) {
            addLesson(start, end);
        }
        start = video[0].currentTime;
    } else {
        recording = true;
        time = 0;
        $('#stopper').html('0:00');
        clearInterval(interval);
        interval = setInterval(timer, 1000);
        $("#record-lesson").html("Stop Recording");
        $('#red-dot').css('display', 'block');
        $('#stopper').css('display', 'block');
        video.get(0).play();
        start = video[0].currentTime;
    }
}

function addLesson(start, end) {
    var lesson = '<div class="lesson-wrapper">' +
        '<div class="wrapper-edit"><i class="material-icons remove-lesson" style="font-size: 32px; font-weight: 100;">delete</i></div>' +
        '<div class="lesson-title" contenteditable="true">Title</div>' +
        '<div class="lesson-video">' +
        '<video>' +
        '<source src=' + video.attr('src') + '#t=' + start + "," + end + ' type="video/mp4">' +
        '</video>' +
        '</div>' +
        '<div class="lesson-overlay">' +
        toTime(start) + " - " + toTime(end) +
        '</div>' +
        '<div class="lesson-details">' +
        '<div class="complete-mark"><i class="material-icons" style="font-size: 28px; font-weight: 100;">check_circle</i></div>' +
        '<div class="work-mark"><i class="material-icons" style="font-size: 28px; font-weight: 100;">stars</i></div>' +
        '</div>' +
        '</div>';

    if (currentVideo == "interstellar") {
        $('#interstellar-lessons').append(lesson);
    } else if (currentVideo == "darknight") {
        $('#darknight-lessons').append(lesson);
    } else {
        $('#gladiator-lessons').append(lesson);
    };

    $(".lesson-overlay").on("click", function () {
        looping = true;
        if (originalDuration == 0) {
            originalDuration = video[0].duration;
        }
        $('.lesson-wrapper').removeClass('lesson-selected');
        var lesson = $(this).parent();
        var lesson_video = lesson.find('.lesson-video');
        lesson_video.removeClass('lesson-selected');
        lesson.addClass('lesson-selected');
        var src = lesson_video.children("video").children("source").attr("src");
        var start_end = (src.substring(src.indexOf("=") + 1)).split(",");
        lessonStart = start_end[0];
        lessonEnd = start_end[1];
        video.attr("src", src);
        video.attr("autoplay", '');
        var lessonStartOff = ((lessonStart / originalDuration) * 100);
        var lessonEndOff = ((lessonEnd / originalDuration) * 100);
        $('#lesson-bar').css('left', lessonStartOff + "%");
        $('#lesson-bar').css('width', (lessonEndOff - lessonStartOff) + "%")
        $("#record-lesson").hide();
        $("#origin").show();
        $("#lesson-bar").show();
        $("#dropdownPlayback").html("1x");
    });

    $(".lesson-title").focus(function () {
        editing = true;
    });

    $(".lesson-title").blur(function () {
        editing = false;
    });

    $(".complete-mark").on("click", function () {
        if ($(this).hasClass('complete')) {
            $(this).removeClass('complete');
        } else {
            $(this).addClass('complete');
        }
    });

    $(".work-mark").on("click", function () {
        if ($(this).hasClass('no-work')) {
            $(this).removeClass('no-work');
        } else {
            $(this).addClass('no-work');
        }
    });

    $(".wrapper-edit").on("click", function () {
        var lesson = $(this).parent().remove();
    });

    $(".wrapper-edit").hide();
};