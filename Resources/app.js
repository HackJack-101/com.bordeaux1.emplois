function App()
{
	this.configDirectory = Ti.Filesystem.getDocumentsDirectory()+Ti.Filesystem.getSeparator()+'EdT Bordeaux 1';
	this.configFile = this.configDirectory+Ti.Filesystem.getSeparator()+'config';
	this.exeFile = Ti.Filesystem.getApplicationDirectory()+'Edt Bordeaux 1.exe';
	
	if(typeof App.initialized == "undefined")
	{
		App.prototype.createConfigDirectory = function()
		{
			var directory = Ti.Filesystem.getFile(this.configDirectory);
			if(directory.exists())
				return true;
			else
			{
				return directory.createDirectory();
			}
		}
		
		App.prototype.readConfig = function ()
		{
			this.readFile(this.configFile);
		};
		
		App.prototype.readFile = function (filepath)
		{
			var file = Ti.Filesystem.getFile(filepath);
			if(file.exists())
			{
				var document = Ti.Filesystem.getFileStream(filepath);
				document.open(Ti.Filesystem.MODE_READ);
				var bytes;
				var line;
				while ((line = document.readLine()) != null)
				{
					bytes += line;
				}
				document.close();
				alert(bytes);
				return true;
			}
			else
				return false;
		}
		
		App.prototype.loadUI = function ()
		{
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
		}
		
		App.prototype.notify = function(title, message,timeout,icon)
		{
			//Creating a notification and displaying it.
			var notification = Ti.Notification.createNotification({
				'title' : title,
				'message' : message,
				'timeout' : timeout,
				'icon' : (icon == null) ? 'app://ico/apple-touch-icon.png' : icon       
			});
			notification.show();
		}
		
		
		App.prototype.notifyCallback = function(title, message,timeout,callback,icon)
		{
			//Creating a notification and displaying it.
			var notification = Ti.Notification.createNotification({
				'title' : title,
				'message' : message,
				'timeout' : timeout,
				'callback' : callback,
				'icon' : (icon == null) ? 'app://ico/apple-touch-icon.png' : icon       
			});
			notification.show();
		}
		
		
		App.initialized = true;
	
	
	}
}