function App()
{
	this.configDirectory = Ti.Filesystem.getDocumentsDirectory()+Ti.Filesystem.getSeparator()+'EdT Bordeaux 1';
	this.configFile = this.configDirectory+Ti.Filesystem.getSeparator()+'config';
	this.exeFile = Ti.App.getPath();
	this.menu = Ti.UI.createMenu();
	
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
		
		App.prototype.setTitle = function (title)
		{
			Ti.UI.getCurrentWindow().setTitle(title);
		};
		
		App.prototype.addExport = function (code)
		{
			if(this.menu.getLength() > 3)
				this.menu.removeItemAt(3);

			var exportItem = Ti.UI.createMenuItem('Exporter');
			googleCalItem = exportItem.addItem('Google Agenda', function() {
				Ti.Platform.openURL('https://www.google.com/calendar/render?cid=http://www.hackjack.info/et/'+ code +'/gcal');
			});
			iCalItem = exportItem.addItem('iCalendar', function() {
				Ti.Platform.openURL('http://www.hackjack.info/et/'+ code +'/ical');
			});
			exportItem.addSeparatorItem();
			urlItem = exportItem.addItem('URL', function() {
				Ti.Platform.openURL('http://www.hackjack.info/et/'+ code +'/s');
			});
			this.menu.appendItem(exportItem);

			Ti.UI.setMenu(this.menu);
		};
		
		App.prototype.loadUI = function ()
		{
			var programItem = Ti.UI.createMenuItem('Programme');
			homeItem = programItem.addItem('Accueil', function() {
				Ti.UI.getCurrentWindow().setURL('app://index.html');
			});
			programItem.addSeparatorItem();
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
			this.menu.appendItem(programItem);
			
			var optionsItem = Ti.UI.createMenuItem('Options');
			settingsItem = optionsItem.addItem('Configuration', function() {
				Ti.UI.getCurrentWindow().setURL('app://settings.html');
			});
			optionsItem.addSeparatorItem();
			siteItem = optionsItem.addItem('Accéder au site', function() {
				Ti.Platform.openURL(Ti.App.getURL());
			});
			aboutItem = optionsItem.addItem('À propos', function() {
				alert(Ti.App.getName()+" v."+Ti.App.getVersion()
					+"\nCopyright : "+Ti.App.getCopyright()
					+"\nDéveloppeur : "+Ti.App.getPublisher()
					+"\nEmplacement : "+Ti.App.getPath()
					+"\nSystème : "+Ti.Platform.getName()+" ("+Ti.Platform.getOSType()+")");
			});
			this.menu.appendItem(optionsItem);
			
			var linksItem = Ti.UI.createMenuItem('Liens externes');
			entItem = linksItem.addItem('ENT Bordeaux 1', function() {
				Ti.Platform.openURL('http://ent.u-bordeaux1.fr/');
			});
			groupsItem = linksItem.addItem('Groupes de TD', function() {
				Ti.Platform.openURL('https://apps1.drimm.u-bordeaux1.fr/groupesetu/');
			});
			webmailItem = linksItem.addItem('Boite mail', function() {
				Ti.Platform.openURL('https://sogo.u-bordeaux1.fr/SOGo/');
			});
			newsgroupItem = linksItem.addItem('Newsgroups', function() {
				Ti.Platform.openURL('https://apps1.drimm.u-bordeaux1.fr/Web-News/newsgroups.php');
			});
			schoolItem = linksItem.addItem('Portail de scolarité', function() {
				Ti.Platform.openURL('https://www.apogee-bordeaux1.u-bordeaux.fr/');
			});
			this.menu.appendItem(linksItem);
			
			Ti.UI.setMenu(this.menu);
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