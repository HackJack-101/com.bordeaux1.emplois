var menu = Ti.UI.createMenu();

programItem = Ti.UI.createMenuItem('Programme');
homeItem = programItem.addItem('Accueil', function() {
  Ti.UI.getCurrentWindow().setURL('app://index.html');
});
restartItem = programItem.addItem('Redémarrer', function() {
  if (confirm('Êtes vous sûr de vouloir redémarrer ?')) {
    Ti.App.restart();
  }
});
exitItem = programItem.addItem('Quitter', function() {
  if (confirm('Êtes vous sûr de vouloir quitter ?')) {
    Ti.App.exit();
  }
});
menu.appendItem(programItem);

optionsItem = Ti.UI.createMenuItem('Options');
settingsItem = optionsItem.addItem('Configuration', function() {
  Ti.UI.getCurrentWindow().setURL('app://settings.html');
});
testItem = optionsItem.addItem('Test', function() {
  Ti.UI.getCurrentWindow().setURL('app://test.html');
});
menu.appendItem(optionsItem);

Ti.UI.setMenu(menu);


//Create a callback function for the notification
var doSomething = function(e) {
    //e.hide();
}

//Creating a notification and displaying it.
var notification = Ti.Notification.createNotification({
    'title' : 'Notification d\'ouverture',
    'message' : 'Bienvenue sur sur l\'application desktop des emplois du temps de Bordeaux 1 !',
    'timeout' : 20,
    'callback' : doSomething,
    'icon' : 'app://ico/apple-touch-icon.png'        
});

window.addEventListener('load',notification.show, true);