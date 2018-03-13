var timeSlot = $('.time');
var greetSlot = $('.greeting');
var greetList = ['Hello, ', 'Hi, ', 'Greetings, ', 'Salve, ', 'Sveiki, ', 'Guten tag, ', 'Dia dhuit, ', 'Kamusta, ', 'Aloha, ', 'Hola, ']
var randomGreet = Math.floor(Math.random() * greetList.length);

timeSlot.text(moment().format('LT'));

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    greetSlot.text(greetList[randomGreet] + user.displayName.split(" ")[0]);
  };
});

setInterval(function() {
  timeSlot.text(moment().format('LT'));
}, 5000);
