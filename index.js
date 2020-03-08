
$('.scroller').on('click', function (event) {
    // need to account for nav bar so need to subtract height of navbar or something
    // const height = $('nav').height();
    // console.log(height)
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600)
})


$(window).scroll(function () {
    const scrollThreshold = 56;
    const bottomPos = 56;
    console.log('$(window).scrollTop()', $(window).scrollTop())
    // console.log('$(window).height()',$(window).height())
    if ($(window).scrollTop() >= scrollThreshold) {  // change target to number
        $("header .icons-media").css('bottom', 0).css('position', 'absolute');
    }
    if ($(window).scrollTop() < scrollThreshold) {  // change target to number
        $("header .icons-media").css('bottom', bottomPos).css('position', 'fixed');
    }
});

// function displayResults(responseJson,maxResults) {
//     $('#results-list').empty();

//     for (let i = 0; i< responseJson.length && i < maxResults; i++) {
//         $('#results-list').append(
//             `<li><a href="${responseJson[i].html_url}">
//             ${responseJson[i].name}</a></li>`
//         )
//     }

//     $('#results-list').removeClass('hidden');

// }

// function handlePage() {

// }

// $(handlePage)















