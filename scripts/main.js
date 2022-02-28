(function($) {
    "use strict";

    const page = $('html, body');

    const select = function(el, all = false) {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    const onscroll = function(el, listener) {
        el.addEventListener('scroll', listener);
    };

    const contactFormKo = function() {
        emailjs.init("user_ObDVdiMQlk2RAhavouTNx");
        $('#contact-form-ko').validate({
            rules: {
                "name-ko": {
                    required: true,
                    maxlength: 35
                },
                "title-ko": {
                    required: true,
                    maxlength: 35
                },
                "email-ko": {
                    required: true,
                    email: true
                },
                "message-ko": {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                }
            },
            messages: {
                "name-ko": {
                    required: "이름을 입력해주세요.",
                    maxlength: "이름은 최대 35글자까지 입력 가능합니다."
                },
                "title-ko": {
                    required: "제목을 입력해주세요.",
                    maxlength: "제목은 최대 35글자까지 입력 가능합니다."
                },
                "email-ko": {
                    required: "이메일 주소를 입력해주세요.",
                    email: "올바른 이메일 주소를 입력해주세요."
                },
                "message-ko": {
                    required: "메세지를 입력해주세요.",
                    minlength: "메세지를 최소 5글자 이상 입력해주세요.",
                    maxlength: "메세지는 최대 500글자까지 입력 가능합니다."
                }
            },
            submitHandler: function() {
                if ($('#g-recaptcha-response').val() == null || $('#g-recaptcha-response').val() == "") {
                    $('#error-label').html("<label id='recaptcha-error' class='error' for='#'>reCAPTCHA 인증을 진행해주세요.</label>");
                } else {
                    var loader = $('#submit-loader');
                    loader.fadeIn();

                    const template = {	
                        name: $('input[name=name-ko]').val(),
                        title: $('input[name=title-ko]').val(),
                        email : $('input[name=email-ko]').val(),
                        message : $('textarea[name=message-ko]').val()
                    };
            
                    emailjs.send('service_kyllox', 'template_kyllox', template).then(function(response) {
                        loader.fadeOut();
                        $('#message-warning').hide();
                        $('#contact-form-ko').fadeOut();
                        $('#message-success').html("<i class='fa fa-check'></i>이메일을 성공적으로 전송했습니다. 작성해주신 이메일 주소로 답변이 전송됩니다.</p><br>" + "<p>" + response.status + "</p>" + " " + response.text);
                        $('#message-success').fadeIn();
                        $('#message-warning').hide();
                    }, function(e) {
                        loader.fadeOut();
                        $('#message-warning').html("<i class='fa fa-xmark'></i>이메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.<br>" + "<p>" + e.status + "</p>" + " " + e.text);
		                $('#message-warning').fadeIn();
                    });
                }
            }
        });
    };

    const contactFormEn = function() {
        $('#contact-form-en').validate({
            rules: {
                "name-en": {
                    required: true,
                    maxlength: 35
                },
                "title-en": {
                    required: true,
                    maxlength: 35
                },
                "email-en": {
                    required: true,
                    email: true
                },
                "message-en": {
                    required: true,
                    minlength: 5,
                    maxlength: 500
                }
            },
            messages: {
                "name-en": {
                    required: "Please enter your name.",
                    maxlength: "The name can be enter up to 35 characters long."
                },
                "title-en": {
                    required: "Please enter a title",
                    maxlength: "The title can be enter up to 35 characters long."
                },
                "email-en": {
                    required: "Please enter a email address.",
                    email: "Please enter a valid email address."
                },
                "message-en": {
                    required: "Please enter a message.",
                    minlength: "Please enter at least 5 letters of message.",
                    maxlength: "The message can be enter up to 500 characters long."
                },
            },
            submitHandler: function() {
                if ($('#g-recaptcha-response').val() == null || $('#g-recaptcha-response').val() == "") {
                    $('#error-label').html("<label id='recaptcha-error' class='error' for='#'>Please proceed with the reCAPTCHA certification.</label>");
                } else {
                    var loader = $('#submit-loader');
                    loader.fadeIn();

                    const template = {	
                        name: $('input[name=name-en]').val(),
                        title: $('input[name=title-en]').val(),
                        email : $('input[name=email-en]').val(),
                        message : $('textarea[name=message-en]').val()
                    };
            
                    emailjs.send('service_kyllox', 'template_kyllox', template).then(function(response) {
                        loader.fadeOut();
                        $('#message-warning').hide();
                        $('#contact-form-en').fadeOut();
                        $('#message-success').html("<i class='fa fa-check'></i>You have successfully sent an email. I will send my answer to your email address.<br>" + "<p>" + response.status + "</p>" + " " + response.text);
                        $('#message-success').fadeIn();
                    }, function(e) {
                        window.alert("Failed to send email. Please try again in a few minutes." + "\n" + e.status + " " + e.text);
                        $('#message-warning').html("<i class='fa fa-xmark'></i>Failed to send email. Please try again in a few minutes.<br>" + "<p>" + e.status + "<p>" + " " + e.text);
		                $('#message-warning').fadeIn();
                    });
                }
            }
        });
    };

	$(function() {
        contactFormKo();
        contactFormEn();

        scrollDisable('#preloader');

        $(window).on('load', function() {
            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(100).fadeOut("slow");
                scrollAble('#preloader');
            });
        });

		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			page.stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 750, 'easeInOutExpo');
			event.preventDefault();
		});

        $(window).on('scroll load', function() {
            if ($("#header").offset().top > 100) {
                $(".fixed-top").addClass("header-scrolled");
                $(".slide-menu-container").css("top", "60px");
                $(".drop-menu").css("padding-top", "43.5px");
                $("#mainnav li li>a").css("background-color", "rgba(0, 0, 0, 0.85)");
            } else {
                $(".fixed-top").removeClass("header-scrolled");
                $(".slide-menu-container").css("top", "70px");
                $(".drop-menu").css("padding-top", "34.5px");
                $("#mainnav li li>a").css("background-color", "transparent");
            }
        });

        let navbarlinks = select('#mainnav .nav-link', true);
        const navbarlinksActive = function() {
            let position = window.scrollY + 150;
            navbarlinks.forEach(function(navbarlink) {
                if (!navbarlink.hash) return;
                let section = select(navbarlink.hash);
                if (!section) return;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    navbarlink.classList.add('active');
                } else {
                    navbarlink.classList.remove('active');
                }
            });
        };
        window.addEventListener('load', navbarlinksActive);
        onscroll(document, navbarlinksActive);

        let slidelinks = select('#slide-menu .slide-link', true);
        const slidemenulinksActive = function() {
            let position = window.scrollY + 150;
            slidelinks.forEach(function(slidelink) {
                if (!slidelink.hash) return;
                let section = select(slidelink.hash);
                if (!section) return;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    slidelink.classList.add('active');
                } else {
                    slidelink.classList.remove('active');
                }
            });
        };
        window.addEventListener('load', slidemenulinksActive);
        onscroll(document, slidemenulinksActive);

        $('body').prepend('<a href="#top" class="back-to-top page-scroll"></a>');
        $(window).scroll(function() {
            if ($(window).scrollTop() > 500) {
                $('a.back-to-top').fadeIn();
            } else {
                $('a.back-to-top').fadeOut();
            }
        });

        setTimeout(function() {
            $('#intro h1').fitText(2, { minFontSize: '21px', maxFontSize: '58px' });
        }, 100);

        $(".ham").click(function(){
            $(this).toggleClass("active");
            $('.slide-menu-container').slideToggle();
        });

        $(window).resize(function() {
            var windowWidth = $(window).width();

            if (windowWidth > 768) {
                $('.slide-menu-container').hide();
                $('.ham').removeClass("active");
            }
        });

        $('#slide-menu .page-scroll').click(function() {
            $('.ham').removeClass("active");
            $('.slide-menu-container').slideUp('fast');
        });

        $('#lang-down').click(function() {
            $('#lang-down').hide();
            $('#lang-up').show();
            $('#slide-menu-lang').slideDown('fast');
            $('#slide-lang-btn').toggleClass("active");
            $('#lang-up').toggleClass("active");
        });

        $('#lang-up').click(function() {
            $('#lang-down').show();
            $('#lang-up').hide();
            $('#slide-menu-lang').slideUp('fast');
            $('#slide-lang-btn').toggleClass("active");
            $('#lang-up').toggleClass("active");
        });

        $('#slide-lang-btn').click(function() {
            $('#lang-down').toggle();
            $('#lang-up').toggle();
            $('#slide-menu-lang').slideToggle('fast');
            $('#slide-lang-btn').toggleClass("active");
            $('#lang-up').toggleClass("active");
        });
	});
})(jQuery);

const scrollDisable = function(name) {
    $('html').addClass('hidden-scroll');
    $(name).on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
};

const scrollAble = function(name) {
    $('html').removeClass('hidden-scroll');
    $(name).off('scroll touchmove mousewheel');
};

const reloadPage = function() {
    window.setTimeout(function() {
        window.location.reload();
    }, 25);
};

const showResult01 = function() {
    $('#result-02').fadeOut('fast');
    setTimeout(function() {
        $('#result-01').show();
    }, 195);
};

const showResult02 = function() {
    $('#result-01').fadeOut('fast');
    $('#result-03').fadeOut('fast');
    setTimeout(function() {
        $('#result-02').show();
    }, 195);
};

const showResult03 = function() {
    $('#result-02').fadeOut('fast');
    $('#result-04').fadeOut('fast');
    setTimeout(function() {
        $('#result-03').show();
    }, 195);
};

const showResult04 = function() {
    $('#result-03').fadeOut('fast');
    $('#result-05').fadeOut('fast');
    setTimeout(function() {
        $('#result-04').show();
    }, 195);
};

const showResult05 = function() {
    $('#result-04').fadeOut('fast');
    $('#result-06').fadeOut('fast');
    setTimeout(function() {
        $('#result-05').show();
    }, 195);
};

const showResult06 = function() {
    $('#result-05').fadeOut('fast');
    setTimeout(function() {
        $('#result-06').show();
    }, 195);
};

const hideAllResult = function() {
    $('#result-01').hide();
    $('#result-02').hide();
    $('#result-03').hide();
    $('#result-04').hide();
    $('#result-05').hide();
    $('#result-06').show();
};