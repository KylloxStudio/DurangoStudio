(function($) {
    "use strict";
    
	$(function() {
        hideAllResult();

        $('html').addClass('hidden-scroll');
        $('html').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });

        emailjs.init("user_ObDVdiMQlk2RAhavouTNx");
        
        $(window).on('load', function() {
            setTimeout(function() {
                $('.spinner-wrapper').fadeOut('slow');
            }, 100);
            $('html').removeClass('hidden-scroll')
            $('html').off('scroll touchmove mousewheel');
        });
    
        
        $(window).on('scroll load', function() {
            if ($(".navbar").offset().top > 20) {
                $(".fixed-top").addClass("top-nav-collapse");
            } else {
                $(".fixed-top").removeClass("top-nav-collapse");
            }
        });

		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});

        $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
        var amountScrolled = 700;
        $(window).scroll(function() {
            if ($(window).scrollTop() > amountScrolled) {
                $('a.back-to-top').fadeIn('500');
            } else {
                $('a.back-to-top').fadeOut('500');
            }
        });

        var closeBtn_ko = document.getElementById("dialog-close-ko");
        var submit_ko = document.getElementsByName("submit-ko")[0];
        
        closeBtn_ko.onclick = function() {
            $('html').removeClass('hidden-scroll');
            $('#send-email-dialog-ko').off('scroll touchmove mousewheel');
            $('#send-email-dialog-ko').fadeOut(400);
        };
        
        submit_ko.onclick = function() {
            var nameForm = document.getElementsByName("name-ko")[0];
            if (!nameForm.value) {
                alert("이름을 입력해주세요.");
                nameForm.focus();
                return;
            }
        
            var emailForm = document.getElementsByName("email-ko")[0];
            if (!emailForm.value) {
                alert("이메일 주소를 입력해주세요.");
                emailForm.focus();
                return;
            } else {
                if (!checkEmail(emailForm.value)) {
                    alert("이메일 형식이 올바르지 않습니다.");
                    emailForm.focus();
                    return;
                }
            }
        
            var message = document.getElementsByName("message-ko")[0];
            if (!message.value) {
                alert("내용을 입력해주세요.");
                message.focus();
                return;
            }
        
            const template = {	
                name: $('input[name=name-ko]').val(),
                email : $('input[name=email-ko]').val(),
                message : $('textarea[name=message-ko]').val()
            };
        
            emailjs.send('service_kyllox-durango', 'template_kyllox_durango', template).then(function(response) {
                window.alert("SUCCESS!" + "\n" + response.status + " " + response.text);
            }, function(e) {
                window.alert("FAILED.." + "\n" + e);
            });
        };
        
        $('#send-email-link-ko').click(function() {
            $('html').addClass('hidden-scroll');
            $('#send-email-dialog-ko').on('scroll touchmove mousewheel', function(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
            $('#send-email-dialog-ko').fadeIn('slow');
        });
        
        var closeBtn_en = document.getElementById("dialog-close-en");
        var submit_en = document.getElementsByName("submit-en")[0];
        
        closeBtn_en.onclick = function() {
            $('html').removeClass('hidden-scroll');
            $('#send-email-dialog-en').off('scroll touchmove mousewheel');
            $('#send-email-dialog-en').fadeOut(400);
        };
        
        submit_en.onclick = function() {
            var nameForm = document.getElementsByName("name-en")[0];
            if (!nameForm.value) {
                alert("Please Write Your Name.");
                nameForm.focus();
                return;
            }
        
            var emailForm = document.getElementsByName("email-en")[0];
            if (!emailForm.value) {
                alert("Please Write Your Email Address.");
                emailForm.focus();
                return;
            } else {
                if (!checkEmail(emailForm.value)) {
                    alert("Email Format is Not Valid.");
                    emailForm.focus();
                    return;
                }
            }
        
            var message = document.getElementsByName("message-en")[0];
            if (!message.value) {
                alert("Please Write Message.");
                message.focus();
                return;
            }
        
            const template = {	
                name: $('input[name=name-en]').val(),
                email : $('input[name=email-en]').val(),
                message : $('textarea[name=message-en]').val()
            };
        
            emailjs.send('service_kyllox-durango', 'template_kyllox_durango', template).then(function(response) {
                window.alert("SUCCESS!" + "\n" + response.status + " " + response.text);
            }, function(e) {
                window.alert("FAILED.." + "\n" + e);
            });
        };

        $('#send-email-link-en').click(function() {
            $('html').addClass('hidden-scroll');
            $('#send-email-dialog-en').on('scroll touchmove mousewheel', function(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
            $('#send-email-dialog-en').fadeIn('slow');
        });
	});
})(jQuery);

const refresh = function() {
    location.reload();
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

const checkWordByteKo = function(obj, maxByte) {
    const text_val = obj.value;
    const text_len = text_val.length;
    
    let totalByte = 0;
    let totalWord = 0;
    for (let i = 0; i < text_len; i++) {
        const each_char = text_val.charAt(i);
        const uni_char = escape(each_char);

        if (uni_char.length > 4) {
            totalByte += 2;
        } else {
            totalByte += 1;
        }

        if(totalByte <= maxByte){
            totalWord = i + 1;
        }
    }
    
    if (totalByte > maxByte) {
        alert("최대 " + maxByte + "Byte까지만 입력 가능합니다.");
        obj.value = text_val.substr(0, totalWord);
        return;
    }
};

const checkWordByteEn = function(obj, maxByte) {
    const text_val = obj.value;
    const text_len = text_val.length;
    
    let totalByte = 0;
    let totalWord = 0;
    for (let i = 0; i < text_len; i++) {
        const each_char = text_val.charAt(i);
        const uni_char = escape(each_char);

        if (uni_char.length > 4) {
            totalByte += 2;
        } else {
            totalByte += 1;
        }

        if(totalByte <= maxByte){
            totalWord = i + 1;
        }
    }
    
    if (totalByte > maxByte) {
        alert("You Can Only Enter Up to " + maxByte + "Bytes.");
        obj.value = text_val.substr(0, totalWord);
        return;
    }
};

const checkEmail = function(str) {                                               
    var email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!email.test(str)) {
        return false;         
    } else {
        return true;
    }
};