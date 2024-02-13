const mqtt = require('mqtt');
require('dotenv').config()

// Konfigurasi broker MQTT
const brokerUrl = `wss://${process.env.URL}`
const options = {
    username: process.env.USER,
    password: process.env.PASSWORD
};
const topic = process.env.TOPIC

// Buat koneksi MQTT dengan opsi
const client = mqtt.connect(brokerUrl, options);

// Tangani ketika koneksi terbuka
client.on('connect', function () {
    console.log('Terhubung ke broker MQTT');

    // Lakukan subscribe ke topik MQTT
    client.subscribe(topic, function (err) {
        if (err) {
            console.error('Gagal melakukan subscribe:', err);
        } else {
            console.log('Berlangganan ke topik:', topic);
        }
    });
});

// Tangani pesan yang diterima dari topik yang di-subscribe
client.on('message', function (topic, message) {
    console.log('Pesan diterima pada topik:', topic, ' - Pesan:', message.toString());
});

// Tangani jika koneksi terputus
client.on('close', function () {
    console.log('Koneksi ke broker MQTT terputus');
    // Lakukan sesuatu jika koneksi terputus, seperti mencoba untuk terhubung kembali
});

// Tangani kesalahan
client.on('error', function (error) {
    console.error('Terjadi kesalahan:', error);
});
