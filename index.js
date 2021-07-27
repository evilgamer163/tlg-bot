const TlgApi = require('node-telegram-bot-api');

const token = '1927305916:AAHiUqijscAFgaow_Ak1bXSIa26gDBxPhzo';

const bot = new TlgApi(token, {polling: true});

bot.setMyCommands([
	{command: '/start', description: 'Приветствие'},
	{command: '/info', description: 'Информация о боте'},
	{command: '/game', description: 'Старт игры'},
])

const chats = {}

const gameOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
			[{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
			[{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
			[{text: '0', callback_data: '0'}],
		]
	})
}

const againOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{text: 'Играть еще раз', callback_data: '/again'}],
		]
	})
}

const startGame = async (chatId) => {
	await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты попробуй его отгадать!');
	const randomNum = Math.floor(Math.random() * 10);
	chats[chatId] = randomNum;
	await bot.sendMessage(chatId, 'Начинай', gameOptions);
}

const start = () => {
	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if(text === '/start') {
			return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Я - бот AP101bot`);
			// await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.jpg');
		}

		if(text === '/info') {
			return bot.sendMessage(chatId, `Я - бот AP101bot! Я пока ниче не могу:(`);
		}

		if(text === '/game') {
			return  startGame(chatId);
		}

		return bot.sendMessage(chatId, 'Не понимаю че ты хочешь...тут есть кнопочка -> там можешь поглядеть на команды');
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if(data === '/again') {
			return  startGame(chatId);
		}

		if(data === chats[chatId].toString()) {
			return bot.sendMessage(chatId, `Мои поздравления. Я на самом деле загадал число ${chats[chatId]}. U win!`, againOptions);
		} else {
			return bot.sendMessage(chatId, `Не верно. Я загадал число ${chats[chatId]}`, againOptions);
		}
	});
};

start();