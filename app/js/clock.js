function gameover() {
    alert('...........................................');
}

var date = new Date(new Date().valueOf() + 60 * 1000);
$('#clock').countdown(date, function(event) {
    $(this).html(event.strftime('%S'));
}).on('finish.countdown', gameover);