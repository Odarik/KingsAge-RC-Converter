// ==UserScript==
// @name         KinksAge RC Exporter
// @namespace    http://your.homepage/
// @version      0.2
// @description  Script permettant de copier facilement le bb-code en masse de plusieurs rc différents afin de les poster sur le board officiel.
// @author       Vulca & Toutatis
// @include      http://*kingsage.gameforge.com/game.php?*=messages*
// @grant		   GM_getValue
// @grant		   GM_setValue
// ==/UserScript==
// == Compatibilité navigateur ==
var Chrome = navigator.userAgent.indexOf('Chrome') > - 1;
if (Chrome)
{
  if (typeof GM_getResourceURL === 'function')
  {
    Tamper = true; // TamperMonkey
  }
  function GM_getValue(key, defaultVal)
  {
    var retValue = localStorage.getItem(key);
    if (!retValue)
    {
      return defaultVal;
    }
    return retValue;
  }
  function GM_setValue(key, value)
  {
    localStorage.setItem(key, value);
  }
}
// == Script KingsAge == 

if (document.getElementById('bb_code'))
{
  var RC_saved = GM_getValue('rc', '');
  RC_saved += document.getElementById('bb_code').innerHTML.replace(/<br>/g, '\n') + '\n\n';
  GM_setValue('rc', RC_saved);
  
  var WinSize = GM_getValue('winsize', '');
  var defaultDisplay = GM_getValue('defaultdisplay', '');
  
  var newElement = document.createElement('div'); // On crée la fenêtre
  newElement.innerHTML = '<center><textarea rows=' + WinSize + '; style="width:95%;align=center;display:' + defaultDisplay + ';" id="textareaRC" onClick="javascript:this.select();" >' + RC_saved + '</textarea></center>';
  document.getElementById('bb_code').appendChild(newElement);
  
  var newElement = document.createElement('span'); // On crée l'image qui ferme/ouvre la fenêtre
  newElement.innerHTML = '<img style="padding-left:2.5%;" src="http://s17.fr.kingsage.gameforge.com/img-layouts/_widget_night/widget_icon_3.png" title="Afficher/Fermer la fenêtre"/>'
  newElement.setAttribute('id', 'affichage');
  newElement.setAttribute('style', 'cursor:pointer;');
  document.getElementById('bb_code').appendChild(newElement);
  
  var newElement = document.createElement('span'); // On crée l'image qui efface le contenu de la fenêtre
  newElement.innerHTML = '<img style="padding-left:0.5%;" src="http://s17.fr.kingsage.gameforge.com/img-layouts/_widget_night/widget_icon_2.png" title="Effacer les entrées"/>'
  newElement.setAttribute('id', 'deleteRc');
  newElement.setAttribute('style', 'cursor:pointer;');
  document.getElementById('bb_code').appendChild(newElement);
  
  var newElement = document.createElement('span'); // On crée l'image qui augmente/réduit la taille de la fenêtre
  newElement.innerHTML = '<img style="padding-left:0.5%;" src="http://s17.fr.kingsage.gameforge.com/img/arrow_right.png" title="Agrandir/Réduire la taille de la fenêtre"/>'
  newElement.setAttribute('id', 'agrandir');
  newElement.setAttribute('style', 'cursor:pointer;');
  document.getElementById('bb_code').appendChild(newElement);
  
  // Fonction qui efface la fenêtre au clic
  document.getElementById('deleteRc').addEventListener('click', function (event)
  {
    GM_setValue('rc', '');
    document.getElementById('textareaRC').textContent = '';
  }, true);
  
  // Fonction qui ferme la fenêtre au clic
  document.getElementById('affichage').addEventListener('click', function (event)
  {
    if (defaultDisplay == 'none')
    {
      GM_setValue('defaultdisplay', 'block');
      defaultDisplay = 'block';
      document.getElementById('textareaRC').style.display = 'block';
      //document.getElementById('bb_code').getElementsByTagName('img') [0].title = 'Fermer la fenêtre';
    } 
    else
    {
      document.getElementById('textareaRC').style.display = 'none';
      GM_setValue('defaultdisplay', 'none');
      defaultDisplay = 'none';
    }
  }, false);
  
  //Fonction qui change la taille de la fenêtre
  document.getElementById('agrandir').addEventListener('click', function (event)
  {
    if (WinSize == 5)
    {
      document.getElementById('textareaRC').rows = '20';
      GM_setValue('winsize', '20');
      WinSize = 20;      
    } 
    else
    {
      document.getElementById('textareaRC').rows = '5';
      GM_setValue('winsize', '5');
      WinSize = 5;
      //document.getElementById('bb_code').getElementsByTagName('img') [2].title = 'Réduire la taille de la fenêtre';
    }
  }, true);
}
