const mysql = require('mysql')
const TelegramBot = require('node-telegram-bot-api')
const token = '358363582:AAExnhcXEPh8D1h-Pqi0CP4TTpNhzR7EkKg'
const bot = new TelegramBot(token, {polling:true})

var users = []

bot.on('message', (msg) => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'mysql',
        user: 'root',
        password: '',
        database: 'caithsith'
    })

    connection.query('create table if not exists Perola (user text, perola text)')

    let chatId = msg.chat.id
    let userCommand = msg.text
    let userId = msg.from.id

    if (/^\/get/.test(userCommand)) {
      let person = userCommand.split(' ')
      connection.query(`select * from Perola where user='${person[1].toLowerCase()}'`, (err, perolas) => {
        let resp = perolas.map((perola) => perola.perola).reduce((a, b) => `${a}\n${b}`)
        bot.sendMessage(chatId, `As perolas de ${person[1]}: \n ${resp}`)
      })
      return
    }

    if (userCommand == '/save' || userCommand == '/save@caithsith_bot'){
        bot.sendMessage(chatId, 'Quem foi?');
        users.push({ userId: userId, data:{user:'', perola:''} })
        console.log(users.find((t) => t.userId == userId))
        return
    }

    if (users.find((t) => t.userId == userId)){
        let user = users.find((t) => t.userId == userId)

        if(!user.data.user){
            user.data.user = msg.text.toLowerCase();
            bot.sendMessage(chatId, 'Qual foi a pérola?')
        }else{
            user.data.perola = msg.text
            users.splice(users.indexOf(userId), 1)

            connection.query('insert into Perola set ?', user.data)

            bot.sendMessage(chatId, 'Pérola Salva!')
        }
    }

    connection.end()
});
