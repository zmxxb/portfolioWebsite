
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function logoEffect() {
    var tl = gsap.timeline();
    tl.to('.l-nav__logo', {
        duration: .6,
        delay: .8,
        scale: 1,
        rotate: 0,
        ease: "back(3)",
    });
    tl.to('.l-nav__logo', {
        duration: .1,
        rotate: 4,
        ease: 'power3.inOut'
    }, 1.3)
    tl.to('.l-nav__logo', {
        duration: .1,
        rotate: -2,
        ease: 'power3.inOut'
    })
    tl.to('.l-nav__logo', {
        duration: .1,
        rotate: 2,
        ease: 'power3.inOut'
    })
    tl.to('.l-nav__logo', {
        duration: .2,
        rotate: -1,
        ease: 'power3.inOut'
    })
    tl.to('.l-nav__logo', {
        duration: .2,
        rotate: 0,
        ease: 'power3.inOut'
    })
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        width: "0%",
        left: "-100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { left: "100%" });
}

$(function () {
    barba.init({
        // sync: true,

        transitions: [
            {
                async leave(data) {
                    pageTransition();
                    await delay(1000);
                },

                async enter(data) {
                    logoEffectready()
                    follow()
                    activeSlider()
                },
                async once(data) {
                    //do the preload//
                    // await delay(3000);
                    // console.log('123')
                    //clear preload//
                    logoEffect();
                    follow();
                    activeSlider()
                    await delay(1400);
                    logoEffectready()
                },
            },
        ],
    });
});

function follow() {
    $('.l-nav__content').bind(
        "scroll", function (evnet) {
            console.log(event.target.scrollTop)
            document.querySelector('.l-nav__logo').setAttribute("style", "top:" + (-evnet.target.scrollTop + 7) + "px")
        }
    )
}

function logoEffectready() {
    $('.l-nav__logo').addClass('ready')
}

function activeSlider() {
    $('.thumb').click(function () {
        $('.thumb').removeClass('active')
        $(this).addClass('active')
        if ($(this).attr('id') == 1) {
            $('.slide').removeClass('active')
            $('#one').addClass('active')
        }
        else if ($(this).attr('id') == 2) {
            $('.slide').removeClass('active')
            $('#two').addClass('active')
        }
        else {
            $('.slide').removeClass('active')
            $('#three').addClass('active')
        }
    })
}



