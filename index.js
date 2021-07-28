const TlgApi = require('node-telegram-bot-api');

const token = '1927305916:AAHiUqijscAFgaow_Ak1bXSIa26gDBxPhzo';

const bot = new TlgApi(token, {polling: true});

bot.setMyCommands([
	{command: '/start', description: 'Приветствие'},
	{command: '/info', description: 'Информация о боте'},
	{command: '/getmovie', description: 'Давай мне фильм!'},
])

const films = [
	'Криминальное чтиво',
	'Джобс',
	'Вселенная Стивена Хокинга',
	'Интерстеллар',
	'Джентельмены',
	'Хелсинг',
	'Лицо со шрамом',
	'Джанго Освобожденный',
	'Богемская Рапсодия',
	'Джон Уик',
	'Адвокат Дьявола'
]

const start = () => {
	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		switch(text) {
			case '/start':
				return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Я - бот AP101bot`);
			case '/info':
				return bot.sendMessage(chatId, `Я - бот AP101bot! Тыкай на кнопки команд и получишь рандомный фильм на вечер!`);
			case '/getmovie':
				const randomNum = Math.floor(Math.random() * 10);
				return bot.sendMessage(chatId, `Твой фильм на вечер - ${films[randomNum]}`);
			default:
				return bot.sendMessage(chatId, 'Не понимаю че ты хочешь...тут есть кнопочка -> там можешь поглядеть на команды');
		}
	});
};

start();