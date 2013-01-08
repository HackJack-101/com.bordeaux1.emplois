function getSelectValue(selectId)
{
    /**On récupère l'élement html <select>*/
    var selectElmt = document.getElementById(selectId);
    /**
	selectElmt.options correspond au tableau des balises <option> du select
	selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
 */
    return selectElmt.options[selectElmt.selectedIndex].value;
}

function getSelectText(selectId)
{
    var selectElmt = document.getElementById(selectId);
    return selectElmt.options[selectElmt.selectedIndex].text;
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; Expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";
    console.log(name+"="+value+expires+"; path=/");
    console.log(document.cookie);
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getXDomainRequest() {
    var xdr = null;
	
    if (window.XDomainRequest) {
        xdr = new XDomainRequest(); 
    } else if (window.XMLHttpRequest) {
        xdr = new XMLHttpRequest(); 
    } else {
        alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
    }
	
    return xdr;	
}

function loadAjax(script,id)
{
    var xdr = getXDomainRequest();
    xdr.onload = function() {
        var reponse = xdr.responseText;
        document.getElementById(id).innerHTML = reponse;
    }
    xdr.open("GET", script);
    xdr.send();
}

function loadAjax2(script,id)
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


window.addEventListener('load', function()
{
    //loadAjax("http://hackjack.info/et/ajax.php?type=settings&request=topbar","topbar");
    if(readCookie('classHackjack') != null)
        loadAjax("http://hackjack.info/et/ajax.php?type=settings&request=select&cookie="+ readCookie('classHackjack'),"select");
    else
        loadAjax("http://hackjack.info/et/ajax.php?type=settings&request=select","select");
    
    var xdr = getXDomainRequest();
    xdr.onload = function() {
        var reponse = xdr.responseText;
        document.getElementById('footer').innerHTML = reponse;
        validation = document.getElementById('validation');
        validation.onclick = function ()
        {
            createCookie('classHackjack',getSelectValue('select'),30*6);
            removeChildrenById('annonce');
            var annonce = 'Ton groupe de TD '+ getSelectText('select') +' a bien été pris en compte.';
            document.getElementById('annonce').innerHTML = annonce;
        }
    }
    xdr.open("GET", "http://hackjack.info/et/ajax.php?type=settings&request=footer");
    xdr.send();
    
}
, true);