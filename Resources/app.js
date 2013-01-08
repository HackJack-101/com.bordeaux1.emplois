var menu = Ti.UI.createMenu();
programmItem = Ti.UI.createMenuItem('Programme');
exitItem = programmItem.addItem('Quitter', function() {
  if (confirm('Êtes vous sûr de vouloir quitter ?')) {
    Ti.App.exit();
  }
});
menu.appendItem(fileItem);

optionsItem = Ti.UI.createMenuItem('Programme');
exitItem = programmItem.addItem('Quitter', function() {
  if (confirm('Êtes vous sûr de vouloir quitter ?')) {
    Ti.App.exit();
  }
});

menu.appendItem(fileItem);
Ti.UI.setMenu(menu);


//Create a callback function for the notification
var doSomething = function(e) {
    //e.hide();
}

//Creating a notification and displaying it.
var notification = Ti.Notification.createNotification({
    'title' : 'Notification d\'ouverture',
    'message' : 'Bienvenue sur sur l\'application desktop des emplois du temps de Bordeaux 1!',
    'timeout' : 20,
    'callback' : doSomething,
    'icon' : 'app://ico/apple-touch-icon.png'        
});