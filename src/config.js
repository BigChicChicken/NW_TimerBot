import path from "path";

export const AUDIO = (lang = 'en') => ({
    'respawning': path.resolve('src', 'resources', lang, 'respawning.mp3'),
    '1': path.resolve('src', 'resources', lang, '1.mp3'),
    '2': path.resolve('src', 'resources', lang, '2.mp3'),
    '3': path.resolve('src', 'resources', lang, '3.mp3'),
    '4': path.resolve('src', 'resources', lang, '4.mp3'),
    '5': path.resolve('src', 'resources', lang, '5.mp3'),
    '5_second': path.resolve('src', 'resources', lang, '5_second.mp3'),
    '10_second': path.resolve('src', 'resources', lang, '10_second.mp3'),
    '15_second': path.resolve('src', 'resources', lang, '15_second.mp3'),
    '20_second': path.resolve('src', 'resources', lang, '20_second.mp3'),
    '30_second': path.resolve('src', 'resources', lang, '30_second.mp3'),
    '40_second': path.resolve('src', 'resources', lang, '40_second.mp3'),
    '50_second': path.resolve('src', 'resources', lang, '50_second.mp3')
});

export const RESPAWN = [
    1780,   // 29:40
    1760,   // 29:20
    1740,   // 29:00
    1720,   // 28:40
    1700,   // 28:20
    1680,   // 28:00
    1660,   // 27:40
    1640,   // 27:20
    1620,   // 27:00
    1600,   // 26:40
    1580,   // 26:20
    1560,   // 26:00
    1540,   // 25:40
    1520,   // 25:20

    1492,   // 24:52
    1464,   // 24:24
    1436,   // 23:56
    1408,   // 23:28
    1380,   // 23:00
    1352,   // 22:32
    1324,   // 22:04
    1296,   // 21:36
    1268,   // 21:08
    1240,   // 20:40
    1212,   // 20:12

    1183,   // 19:43
    1147,   // 19:07
    1111,   // 18:31
    1075,   // 17:55
    1039,   // 17:19
    1003,   // 16:43
    967,    // 16:07
    931,    // 15:31
    895,    // 14:55
    859,    // 14:19

    815,    // 13:35
    771,    // 12:51
    727,    // 12:07
    683,    // 11:23
    639,    // 10:39
    595,    // 09:55
    551,    // 09:11

    499,    // 08:19
    447,    // 07:27
    395,    // 06:35
    343,    // 05:43

    290,    // 04:50
    230,    // 03:50
    170,    // 02:50
    110,    // 01:50
    50      // 00:50
];