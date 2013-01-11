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
	window.app = new App();
	
    if(window.app.readConfig() != null)
        loadAjax("http://hackjack.info/et/ajax.php?type=settings&request=select&cookie="+ window.app.readConfig(),"select");
    else
        loadAjax("http://hackjack.info/et/ajax.php?type=settings&request=select","select");
    
    var xhr = getXMLHttpRequest();
    xhr.onload = function() {
        var reponse = xhr.responseText;
        document.getElementById('footer').innerHTML = reponse;
        validation = document.getElementById('validation');
        validation.onclick = function ()
        {
            window.app.writeConfig(getSelectValue('select'));
            removeChildrenById('annonce');
            var annonce = 'Ton groupe de TD '+ getSelectText('select') +' a bien été pris en compte.';
            document.getElementById('annonce').innerHTML = annonce;
        }
    }
    xhr.open("GET", "http://hackjack.info/et/ajax.php?type=settings&request=footer");
    xhr.send();
    
}
, true);