let db = [
    {
        id: 1,
        name: 'Barberton Daisy',
        price: '$119.00',
        img: './imgs/plant 1.png',
    },
    {
        id: 2,
        name: 'Angel Wing Begonia',
        price: '$169.00',
        img: './imgs/plant 2.png',
    },
    {
        id: 3,
        name: 'African Violet',
        price: '$199.00',
        img: './imgs/plant 3.png',
    },
    {
        id: 4,
        name: 'Beach Spider Lily',
        price: '$129.00',
        img: './imgs/plant 4.png',
    },
    {
        id: 5,
        name: 'Blushing Bromeliad',
        price: '$139.00',
        img: './imgs/plant 5.png',
    },
    {
        id: 6,
        name: 'Aluminum Plant',
        price: '$179.00',
        img: './imgs/plant 6.png',
    },
    {
        id: 7,
        name: 'Bird\'s Nest Fern',
        price: '$99.00',
        img: './imgs/plant 7.png',
    },
    {
        id: 8,
        name: 'Broadleaf Lady Palm',
        price: '$59.00',
        img: './imgs/plant 8.png',
    },
    {
        id: 9,
        name: 'Chinese Evergreen',
        price: '$39.00',
        img: './imgs/plant 9.png',
    },
]
for(let el of db){
    $('.goodsContainer').append(`
    <div class="goodsCard">
    <img src='${el.img}'>
    <h2>${el.name}</h2>
    <h5>${el.price}</h5>
    <button class="goodsCardBtn" id='buy${el.id}'><img class='goodsCardBtn_icon' src='./imgs/white cart.png'>Buy</button>
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
