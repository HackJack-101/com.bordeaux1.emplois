function loadAjax(script,id)
{
	var XHR   = getXMLHttpRequest();
    
	XHR.onreadystatechange = function() {
		if (XHR.readyState == 4 && (XHR.status == 200 || XHR.status == 0)) 
		{	
			var reponse = XHR.responseText;
			document.getElementById(id).innerHTML = reponse;
		}
	};
	XHR.open("GET", script, true);
	XHR.send(null);
}

function checkAjax(script)
{
	var XHR = getXMLHttpRequest();

	XHR.onreadystatechange = function() {
		if (XHR.readyState == 4 && (XHR.status == 200 || XHR.status == 0)) 
		{
			var reponse = XHR.responseText;
			return reponse;
		}
	};
	XHR.open("GET", script, true);
	XHR.send(null);
	return XHR.responseText;
}

function removeChildrenById(id)
{
	var element = document.getElementById(id);
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function getXMLHttpRequest() 
{
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) 
	{
		if (window.ActiveXObject) 
		{
			try 
			{
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch(e) 
			{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} 
		else 
		{
			xhr = new XMLHttpRequest(); 
		}
	} 
	else 
	{
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}

function checkDeplacement(e)
{
	if(e.keyIdentifier == "Left") // Left
	{
		if(previous = document.getElementById('previous'))
			window.location.href = previous.getAttribute('data-href');
	}
	else if(e.keyIdentifier == "Right") // Right
	{
		if(next = document.getElementById('next'))
			window.location.href = next.getAttribute('data-href');
	}
}

function checkStartGesture(e) 
{
	startX = e.touches[0].pageX;
	startY = e.touches[0].pageY;
}

function checkMoveGesture(e) 
{
	if (startX - e.changedTouches[0].pageX < 0)
	{
		document.getElementsByTagName('html')[0].style.marginLeft = Math.abs(startX - e.changedTouches[0].pageX)+'px';
		document.getElementsByTagName('html')[0].style.marginRight = -Math.abs(startX - e.changedTouches[0].pageX)+'px';
	}
	else
	{
		document.getElementsByTagName('html')[0].style.marginRight = Math.abs(startX - e.changedTouches[0].pageX)+'px';
		document.getElementsByTagName('html')[0].style.marginLeft = -Math.abs(startX - e.changedTouches[0].pageX)+'px';
	}
}

function checkEndGesture(e) 
{
	document.getElementsByTagName('html')[0].style.marginLeft = 0;
	document.getElementsByTagName('html')[0].style.marginRight = 0;
	if(Math.abs(startX - e.changedTouches[0].pageX) >= window.outerWidth/2)
	{
		if((startX - e.changedTouches[0].pageX) > 0)
		{
			if(next_href)
				ajax(next_href);
		}
		else
		{
			if(previous_href)
				ajax(previous_href);
		}
	}
}

function checkDeplacement(e)
{
	if(e.keyIdentifier == "Left") // Left
	{
		if(previous_href)
			ajax(previous_href);
	}
	else if(e.keyIdentifier == "Right") // Right
	{
		if(next_href)
			ajax(next_href);
	}
}

function historyManager(action,href)
{
	switch(action)
	{
		case 'previous':
			window.customHistoryIndex = window.customHistoryIndex - 1;
			var href = window.customHistory[window.customHistoryIndex].replace("?","");
			if(href == "")
				history.replaceState( href, 'Emplois du temps Bordeaux 1', "index.html");
			else
				history.replaceState( href, 'Emplois du temps Bordeaux 1', "index.html?" + href);
			break;
		case 'next':
			window.customHistoryIndex = window.customHistoryIndex + 1;
			var href = window.customHistory[window.customHistoryIndex].replace("?","");
			if(href == "")
				history.replaceState( href, 'Emplois du temps Bordeaux 1', "index.html");
			else
				history.replaceState( href, 'Emplois du temps Bordeaux 1', "index.html?" + href);
			break;
		default :
			window.customHistoryIndex = window.customHistoryIndex + 1;
			if(href == "")
			{
				window.customHistory[customHistoryIndex] = "";
				history.pushState( href, 'Emplois du temps Bordeaux 1', "index.html");
			}
			else
			{
				window.customHistory[customHistoryIndex] = ("?" + href);
				history.pushState( href, 'Emplois du temps Bordeaux 1', "index.html?" + href);
			}
			break;
	}
}

function ajax(href)
{
	if(href == "")
	{
		loadAjax("http://hackjack.info/et/ajax.php?request=topbar","topbar");
		loadAjax("http://hackjack.info/et/ajax.php?request=header","header");
		removeChildrenById('menu');
		window.app.setTitle("Liste - EdT Bordeaux I");
	}
	else
	{
		loadAjax("http://hackjack.info/et/ajax.php?request=topbar&" + href,"topbar");
		loadAjax("http://hackjack.info/et/ajax.php?request=header&" + href,"header");
		var regUrl = new RegExp('.+name=([A-Z0-9]+)&group=([A-Z0-9]+).*', 'i');
		window.app.addExport(href.replace(regUrl,"$1_$2"));
		window.app.setTitle(href.replace(regUrl,"$1 $2") + " - EdT Bordeaux I");
	}

	var listXHR = getXMLHttpRequest();
	listXHR.onreadystatechange = function() {
		if (listXHR.readyState == 4 && (listXHR.status == 200 || listXHR.status == 0))
		{	
			var reponse = listXHR.responseText;
			document.getElementById('corps').innerHTML = reponse;
			document.getElementById('loader').style.display = 'none';
			links = document.getElementById('corps').getElementsByTagName('a');
			for(var h = 0; h < links.length ; h++)
			{
				links[h].onclick = function() {
					if(this.getAttribute('href').substring(0,1) != '#')
					{
						document.getElementById('loader').style.display = 'block';
						removeChildrenById('topbar');
						removeChildrenById('header');
						removeChildrenById('corps');
						href = this.getAttribute('href');
						historyManager('click',href);
						ajax(href);
						return false;
					}
					return true;
				};
			}

			groupes = document.getElementsByClassName('groupes');
			for(var i = 0; i < groupes.length ; i++)
			{
				groupes[i].onclick = function() {
					document.getElementById('loader').style.display = 'block';
					removeChildrenById('topbar');
					removeChildrenById('header');
					removeChildrenById('corps');
					href = this.getElementsByTagName('a')[0].getAttribute('href');
					historyManager('click',href);
					ajax(href);
				};
			}
			section = document.getElementsByClassName('section');
			for(var j = 0; j < section.length ; j++)
			{
				section[j].onclick = function() {
					if(window.location.href.substring(window.location.href.length-5) == '#menu')
					{
						window.location.href = '#top';
					}
					else if(this.getAttribute('data-href').substring(0,1) == '#')
					{
						window.location.href = this.getAttribute('data-href');
					}
					else
					{
						document.getElementById('loader').style.display = 'block';
						removeChildrenById('topbar');
						removeChildrenById('header');
						removeChildrenById('corps');
						href = this.getAttribute('data-href');
						historyManager('click',href);
						ajax(href);
					}
				}
			}
			title = document.getElementsByClassName('title');
			for(var k = 0; k < title.length ; k++)
			{
				title[k].onclick = function() {
					document.getElementById('loader').style.display = 'block';
					removeChildrenById('topbar');
					removeChildrenById('header');
					removeChildrenById('corps');
					href = this.getElementsByTagName('span')[0].getAttribute('href');
					historyManager('click',href);
					ajax(href);
				}
			}
			navigation = document.getElementsByClassName('navigation');
			for(var l = 0; l < navigation.length ; l++)
			{
				navigation[l].onclick = function() {
					document.getElementById('loader').style.display = 'block';
					removeChildrenById('topbar');
					removeChildrenById('header');
					removeChildrenById('corps');
					href = this.getAttribute('data-href');
					historyManager('click',href);
					ajax(href);
				}
			}
			menuLinks = document.getElementById('menu').getElementsByTagName('li');
			for(var m = 0; m < menuLinks.length ; m++)
			{
				menuLinks[m].onclick = function() {
					window.location.href = this.getAttribute('data-href');
				};
			}
			
			if(next = document.getElementById('next'))
				next_href = next.getAttribute('data-href');
			if(previous = document.getElementById('previous'))
				previous_href = previous.getAttribute('data-href');
			
			window.document.onkeydown = checkDeplacement;
			if(document.getElementById('next'))
			{
				window.addEventListener('touchstart', checkStartGesture, false);
				window.addEventListener('mousedown', checkStartGesture, false);
				window.addEventListener('touchmove', checkMoveGesture, false);
				window.addEventListener('touchend', checkEndGesture, false);
				window.addEventListener('mouseup', checkEndGesture, false);
			}
		}
		else if (listXHR.readyState < 4)
			document.getElementById('loader').style.display = 'block';
	};
	if(href == "")
		listXHR.open("GET", "http://hackjack.info/et/ajax.php?request=corps", true);
	else
		listXHR.open("GET", "http://hackjack.info/et/ajax.php?request=corps&" + href, true);
	listXHR.send(null);
}

function main()
{
	var startX = 0;
	var startY = 0;

	var url_base ="";
	var url = window.location.search.replace("?","");

	window.customHistory = new Array();
	window.customHistoryIndex = 0;
	window.customHistory[window.customHistoryIndex] = url;

	window.app = new App();
	window.app.loadUI();
	
	if(url != null && url != "")
		ajax(url);
	else if(window.app.readConfig() != null)
	{
		var XHR   = getXMLHttpRequest();
		XHR.onreadystatechange = function() {
			if (XHR.readyState == 4 && (XHR.status == 200 || XHR.status == 0)) 
			{	
				var reponse = XHR.responseText;
				if(reponse == 'OK')
				{
					cookie = window.app.readConfig();
					url_base ="type=day&name="+cookie.replace("_","&group=");
					ajax(url_base);
				}
				else
					window.app.deleteConfig();
			}
		};
		XHR.open("GET", "http://hackjack.info/et/ajax.php?type=checkCookie&request="+window.app.readConfig(), true);
		XHR.send(null);
    
	}
	else
		ajax(url_base);
}



window.addEventListener('load',main, true);
window.addEventListener('load',function()
{
	setTimeout(function(){
		if(window.app.readConfig()==null)
			window.app.notify("EdT Bordeaux I","Pour une utilisation optimale, allez dans \"Options > Configuration\" et paramétrez votre groupe de TD.",20,null);
	},3000);
}, true);


window.addEventListener('hashchange', function()
{
	document.getElementById('loader').style.display = 'none';
}, false);

window.addEventListener('popstate', function(e)
{
	if(window.customHistoryIndex >= 1 &&  window.customHistory[window.customHistoryIndex - 1] == window.location.search)
	{
		historyManager('previous',null);
		ajax(window.customHistory[window.customHistoryIndex].replace("?",""));
	}
	else if(window.customHistory.length > window.customHistoryIndex + 1)
	{
		historyManager('next',null);
		ajax(window.customHistory[window.customHistoryIndex].replace("?",""));
	}
	return false;
}, false);

window.addEventListener('onchange', function()
{
	var url = window.location.search.replace("?","");
	ajax(url);
}, false);