let db = [
    {
        id: 1,
        name: 'Футболка',
        price: 300
    },
    {
        id: 2,
        name: 'Чашка',
        price: 100
    },
    {
        id: 3,
        name: 'Кепка',
        price: 200
    },
    {
        id: 4,
        name: 'Блокнот',
        price: 50
    },
    {
        id: 5,
        name: 'Ручка',
        price: 10
    },
]
for(let el of db){
    $('.goodsContainer').append(`
    <div class="goodsCard">
    <h2>${el.name}</h2>
    <h5>${el.price} грн.</h5>
    <button class="goodsCardBtn" id='buy${el.id}'>В корзину</button>
</div>`)
}

let cardList = []
$('.wrap').click(function(e){
    if(e.target.id){
        if((e.target.id).substring(0, 3) == 'buy'){
            let ID = (e.target.id).substring(3);
            for(let el of db){
                if(el.id == ID){
                    cardList.push(el);
                    $('#cartCounter').text(cardList.length)
                }

            }

        }
    }
})
$('#cartCounter').click(function(){
    $('#sendData').css('display', 'flex')
})
$('#sendData').click(function(){
    $('.popup').css('display', 'flex')
})
$('#send').click(()=>{
    let data = {
        list: cardList,
        name: $('#name').val(),
        phone: $('#phone').val(),

    }
    axios.post('/send', data)
    .then(res=>{
        console.log(res)
        if(res.status==200){
            cardList = [];
            $('#cartCounter').text(cardList.length)
            $('.popup').css('display', 'none')
            $('#name').val('')
            $('#phone').val('')

            showNotification('Замовлення відправлено', res.status)
        }
    })
})


function showNotification(message, status){
    if(status == 200){
        $('.notificationPopup').css('background-color', 'rgb(84, 183, 84)');
    }else if(status == 404){
        $('.notificationPopup').css('background-color', 'red');
    }else{
        $('.notificationPopup').css('background-color', 'grey');

    }
    $('.notificationPopup').css('display', 'flex');
    $('.notificationPopup').text(message)
    setTimeout(() => {
        $('.notificationPopup').css('display', 'none');
    }, 3000);;
}
