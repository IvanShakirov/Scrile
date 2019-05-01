function move() {
    var width = 1;
    var target_in_money = 1;
    var money_now = 0;
    var d = 0.01 / 0.15;//начальный шаг по прогрессу по 1 центов
    var id;
    $.ajax({
        url: 'http://alex.devel.softservice.org/testapi/',
        data: {text: 'a'},
        success: function (data) {
            target_in_money = data.balance_usd;
            id = setInterval(frame, 0);
        }
    });

    function frame() {
        if (money_now >= target_in_money) {
            clearInterval(id);
            target_in_money = 15;
            money_now = money_now.toFixed(70);
            d = 0.2 / 0.15;
            id = setInterval(frame, 2000);
            if (money_now >= 15) {
               $('.indicator').css('background', '#00A910');
               $('.row1').css('border-bottom', '1px solid #28a831' );
               $('.info').css('display', 'none');
            }
        } else {
            width += d;
            $(".progressbar__strip_blue").css('width', width + '%');
            $(".moneyLabelContainer").css('width', width + '%');
            money_now = width * 0.15;
            var a= String(money_now.toFixed(1)).substr((String(money_now.toFixed(1 )).length -1));
            if(a=='0'){
                $('.info__text').text( Math.trunc((15 - money_now.toFixed(1))) +" " );
            }
            else {
                $('.info__text').text( (15 - money_now).toFixed(1) + " ");
            }
            $('.money').html('$'+ money_now.toFixed(0));

        }
        if ((15-money_now)<10)
        {
            $('.info__text').css('width','21px');
        }
    }
}

