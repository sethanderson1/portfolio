
$('.scroller').on('click', function (event) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600)
})

document.getElementById('home').style.minHeight = `${window.innerHeight}px`


document.querySelector('.copyright-date').innerHTML = new Date().getFullYear();



fetch('https://l8o8ahwhyf.execute-api.us-west-1.amazonaws.com/live/item/')
    // .then(response => response.json())
    // .then(json => console.log(json))






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