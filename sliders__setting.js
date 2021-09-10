function active__sliders() {
    var mySwiper = new Swiper(".swiper-container", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            clickableClass: "my-pagination-clickable",
            bulletClass: "my-bullet", //需设置.my-bullet样式
        },
        effect: "fade",
    });
}
active__sliders()