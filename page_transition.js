function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function isIndex() {
    var isIndex = document.querySelector('.index__container')
    if (isIndex == null) {
        document.querySelector(".main__header h1 span").classList.add("active");
    }
}

function isAbout() {
    var isAbout = document.querySelector('.about__inner')
    if (isAbout != null) {
        reveal()
    }
}

function isResume() {
    var isAbout = document.querySelector('.js-slide')
    if (isAbout != null) {
        showing()
    }
}

function showing() {
    gsap.registerPlugin(ScrollTrigger);

    function hide(elem) {
        gsap.set(elem, { autoAlpha: 0 });
    }

    function animateFrom(elem) {
        gsap.fromTo(
            elem,
            {
                x: 100,
                autoAlpha: 0,
            },
            {
                x: 0,
                duration: 1.25,
                autoAlpha: 1,
                ease: "expo",
            }
        );
    }

    gsap.utils.toArray(".js-slide").forEach(function (elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            // markers: true,
            start: "center 80%",
            once: true,
            onEnter: function () {
                animateFrom(elem);
            },
        });
    });

    gsap.from(".skills__visual", {
        scrollTrigger: {
            trigger: ".skills__visual",
            // markers: true,
            start: "center 80%",
        },
        opacity: 0,
        stagger: 0.2,
        scale: 0,
        ease: "elastic",
        duration: 2,
    });
}


function reveal() {
    gsap.registerPlugin(ScrollTrigger);
    function hide(elem) {
        gsap.set(elem, { autoAlpha: 0 });
    }
    function animateFrom(elem) {
        gsap.fromTo(
            elem,
            {
                x: 100,
                autoAlpha: 0,
            },
            {
                x: 0,
                duration: 1.25,
                autoAlpha: 1,
                ease: "expo",
            }
        );
    }

    gsap.utils.toArray(".about__item").forEach(function (elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            start: "top center",
            once: true,
            onEnter: function () {
                animateFrom(elem);
            },
        });
    });
}

barba.init({
    sync: true,
    transitions: [
        {
            // name: "default-transition",
            async leave(data) {
                gsap.set(data.current.container, {
                    opacity: 0,
                })
                await delay(500)
                data.current.container.remove()

            },
            async enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 1,
                });
                active__sliders()
                isAbout();
                isResume();
                isButton();
                isIndex();
            },
        },
    ],
});


function isButton() {
    var isButton = document.querySelector('.button')
    if (isButton != null) {
        isButton.addEventListener("click", function () {
            gsap.to("body,html", {
                scrollTop: 0,
                duration: 1.4,
                ease: "power4.out",
            });
        });
    }
}

