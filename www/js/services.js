
angular.module('starter.services', [])

    .factory('Chats', function () {
        
        var chats = '';

        return {
            all: function (cbk) {

                var recentchats = firebase.database().ref('chats');

                recentchats.on('value',function (snapshot) {
                    
                    chats = snapshot.val();
                    
                    cbk(chats);


                    if (snapshot.val() == null)
                    {
                        firebase.database().ref().child('chats/1').set({
                            id:1,
                            name: 'Corinthians',
                            lastText: 'You on your way?',
                            face: 'img/corinthians.png',
                            messages: [{
                                uid: 0,
                                face: 'img/mike.png',
                                name: 'Mike',
                                date: '2016-09-04 12:00',
                                msg: 'Vamos lá pessoal'
                            }, {
                                uid: 0,
                                face: 'img/mike.png',
                                name: 'Jose',
                                date: '2016-09-04 12:00',
                                msg: 'Xpto'
                            }]
                        });

                        firebase.database().ref('chats/2').set({
                            id: 2,
                            name: 'Palmeiras',
                            lastText: 'Hey, it\'s me',
                            face: 'img/palmeiras.jpg'
                        });


                        firebase.database().ref('chats/3').set({
                            id: 3,
                            name: 'Santos',
                            lastText: 'I should buy a boat',
                            face: 'img/santos.png'
                        });

                        firebase.database().ref('chats/4').set({
                            id: 4,
                            name: 'São Paulo',
                            lastText: 'Look at my mukluks!',
                            face: 'img/saopaulo.png'
                        });



                    }
                });



                
            },
            
            get: function (chatId, cbk) {
                
                var recentchats = firebase.database().ref('chats/' + chatId);

                recentchats.on('value',function (ret) {
                    cbk(ret.val());
                });


            },

            sendMessage: function (chatId, id,user, message) {

                var recentchats = firebase.database().ref('chats/' + chatId)
                

                recentchats.once('value').then(function (ret) {
                   
                    item = ret.val();

                    if (item.messages == undefined)
                    {
                        item.messages = [];
                    }
                    
                    
                    item.messages.push({
                        face: 'img/mike.png',
                        uid: id,
                        itemid:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
                        name: user,
                        date: '2016-09-04 12:00',
                        msg: message
                    });

                    firebase.database().ref('chats/' + chatId).update(item);
                });

               
                        

                    
                
            }

        };

    
    })

