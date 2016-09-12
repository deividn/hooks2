angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Corinthians',
        lastText: 'You on your way?',
        face: 'img/corinthians.png',
        messages: [{
            uid:0,
            face: 'img/mike.png',
            name: 'Mike',
            date: '2016-09-04 12:00',
            msg: 'Vamos lá pessoal'
        },
        {
            uid: 0,
            face: 'img/mike.png',
            name: 'Jose',
            date: '2016-09-04 12:00',
            msg: 'Xpto'
        },
        {
            uid: 0,
            face: 'img/mike.png',
            name: 'Jorge',
            date: '2016-09-04 12:00',
            msg: 'opss'
        },
        {
            uid: 0,
            face: 'img/mike.png',
            name: 'João',
            date: '2016-09-04 12:00',
            msg: 'já sei'
        }
        ]

    }, {
        id: 1,
        name: 'Palmeiras',
        lastText: 'Hey, it\'s me',
        face: 'img/palmeiras.jpg'
    }, {
        id: 2,
        name: 'Santos',
        lastText: 'I should buy a boat',
        face: 'img/santos.png'
    }, {
        id: 3,
        name: 'São Paulo',
        lastText: 'Look at my mukluks!',
        face: 'img/saopaulo.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        send: function (chatId, id,user, message) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    {
                        chats[i].messages.push(
                            {
                                face: 'img/mike.png',
                                uid:id,
                                name: user,
                                date: '2016-09-04 12:00',
                                msg: message
                            });
                    }

                }
            }
        }
    };
});
