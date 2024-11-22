const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Обработка GET-запросов на главной странице
app.get('/', async (req, res) => {
    // Получаем IP-адрес клиента
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Получаем данные о геолокации через ipinfo.io
        const response = await axios.get(`http://ipinfo.io/${ipAddress}/json`);
        const locationData = response.data;

        // Выводим данные в терминал
        console.log('Новый IP-адрес:');
        console.log(`IP: ${ipAddress}`);
        console.log('Геолокация:');
        console.log(locationData);

        // Ответ пользователю
        res.send('IP-адрес и геолокация были выведены в терминал.');
    } catch (error) {
        console.log('Ошибка при получении геолокации:', error);
        res.send('Не удалось получить геолокацию.');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
