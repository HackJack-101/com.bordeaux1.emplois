function App()
{
	this.configDirectory = Ti.Filesystem.getDocumentsDirectory()+Ti.Filesystem.getSeparator()+'EdT Bordeaux 1';
	this.configFile = this.configDirectory+Ti.Filesystem.getSeparator()+'config';
	this.exeFile = Ti.Filesystem.getApplicationDirectory()+Ti.Filesystem.getSeparator()+'Edt Bordeaux 1.exe';
	
	if(typeof App.initialized == "undefined")
	{
		App.prototype.createConfigDirectory = function()
		{
			var directory = Ti.Filesystem.getFile(this.configDirectory);
			if(directory.exists())
				return true;
			else
				return directory.createDirectory();
		};
		
		App.prototype.createConfigFile = function()
		{
			var file = Ti.Filesystem.getFile(this.configFile);
			if(file.exists())
				return true;
			else
				return file.touch();
		};
		
		App.prototype.deleteConfig = function()
		{
			return this.deleteFile(this.configFile);
		};
		
		App.prototype.deleteFile = function (filepath)
		{
			var file = Ti.Filesystem.getFile(filepath);
			if(file.exist())
				return file.deleteFile();
			return false;
		}
		
		App.prototype.writeConfig = function (data)
		{
			return this.writeFile(this.configFile,data);
		};
		
		App.prototype.writeFile = function (filepath,data)
		{
			this.createConfigFile();
			var document = Ti.Filesystem.getFileStream(filepath);
			document.open(Ti.Filesystem.MODE_WRITE);
			var status = document.write(data);
			console.log(status);
			document.close();
			return status;
		};
		
		App.prototype.readConfig = function ()
		{
			return this.readFile(this.configFile);
		};
		
		App.prototype.readFile = function (filepath)
		{
			var file = Ti.Filesystem.getFile(filepath);
			if(file.exists())
			{
				var document = Ti.Filesystem.getFileStream(filepath);
				document.open(Ti.Filesystem.MODE_READ);
				var bytes = "";
				var line;
				while ((line = document.readLine()) != null)
				{
					bytes += line;
				}
				document.close();
				if(bytes.length == 0)
					return null;
				return bytes;
			}
			else
				return null;
		};
		
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
		};
		
		App.prototype.notify = function(title, message,timeout,icon)
		{
			var notification = Ti.Notification.createNotification({
				'title' : title,
				'message' : message,
				'timeout' : timeout,
				'icon' : (icon == null) ? 'app://ico/apple-touch-icon.png' : icon       
			});
			notification.show();
		};
		
		
		App.prototype.notifyCallback = function(title, message,timeout,callback,icon)
		{
			var notification = Ti.Notification.createNotification({
				'title' : title,
				'message' : message,
				'timeout' : timeout,
				'callback' : callback,
				'icon' : (icon == null) ? 'app://ico/apple-touch-icon.png' : icon       
			});
			notification.show();
		};
		
		
		App.initialized = true;
	
	
	}
}