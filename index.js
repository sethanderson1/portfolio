
$('.scroller').on('click', function (event) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600)
})


// $(window).scroll(function () {
//     const scrollThreshold = 56;
//     const bottomPos = 56;
//     console.log('$(window).scrollTop()', $(window).scrollTop())
//     // console.log('$(window).height()',$(window).height())
//     if ($(window).scrollTop() >= scrollThreshold) {  // change target to number
//         $("header .icons-media").css('bottom', 0).css('position', 'absolute');
//     }
//     if ($(window).scrollTop() < scrollThreshold) {  // change target to number
//         $("header .icons-media").css('bottom', bottomPos).css('position', 'fixed');
//     }
// });