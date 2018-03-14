var $add = $('.task-add');
var $list = $('.todo > .list > ul');
var $complete = $('.todo > .complete > ul');

var db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  var person = db.collection("users").doc(user.uid).get()
  person.then(got => {
    var data = got.data();
    data['tasks'].forEach(task => {
      var $newTask = $('<li>');
      $newTask.append($('<span>').text(task));
      var $donebtn = $('<button>').attr('type', 'button').addClass('done-btn');
      var $icon = $('<i>').text('check_circle').addClass('material-icons');
      $donebtn.append($icon);
      $newTask.append($donebtn);
      $list.append($newTask);
    });
    data['tasks-c'].forEach(completed => {
      $completedTask = $('<li>');
      $completedTask.text(completed);
      $complete.append($completedTask);
    });
  });
});