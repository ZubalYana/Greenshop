const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3000;
const app = express();
const bot = new TelegramBot(TOKEN, { polling: false });

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')))
app.post('/send', async (req, res)=>{
    try{
        const {name, phone, list} = req.body;
        let order = '';
        let sum = 0;
        for(let el of list){
            order += el.name + ':' + el.price + '\n'
            sum += el.price;
        }

        bot.sendMessage(process.env.CHATID, `Нове замовлення від коистувача: ${name} \n ${phone}. \n Замовлення: ${order}. \n Сума замовлення: ${sum}`);
    
        res.sendStatus(200);
    }catch(e){
        console.error(e)
    }

})




app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
});