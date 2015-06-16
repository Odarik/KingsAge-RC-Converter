// ==UserScript==
// @name         KinksAge RC Exporter
// @namespace    http://your.homepage/
// @version      1.0
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
  var bouton = document.createElement('div'); //Affichage du bouton ajouter à côté de transmettre/supprimer
  bouton.innerHTML = 'Ajouter à KingsAge RC Converter'
  bouton.setAttribute('class', 'smallButton');
  bouton.setAttribute('id', 'ajouter');
  bouton.setAttribute('style', 'cursor:pointer;');
  document.querySelectorAll('.smallButton') [1].parentNode.appendChild(bouton);
  
  
  var RC_saved = GM_getValue('rc', '');
  
  // Fonction qui ajoute le rc
  document.getElementById('ajouter').addEventListener('click', function (event)
  { 
    var RC_add = document.getElementById('bb_code').innerHTML.replace(/<br>/g, '\n').replace(/<span class="zero">0<\/span>/g, '0').replace(/\[village\].*\[\/village\]/g, '').replace(/.*Combat d'évaluation.*suite à vos pertes au cours de ce combat et aux dégâts provoqués à l'ennemi, vos chances d'obtenir une pierre de bonne fortune ont augmenté.*/g, '');
    RC_saved += RC_add;
    GM_setValue('rc', RC_saved); 
    document.getElementById('textareaRC').innerHTML=RC_saved;
  }, true);
    
  var WinSize = GM_getValue('winsize', '');
  var defaultDisplay = GM_getValue('defaultdisplay', '');  
  var defaultDisplayText = GM_getValue('defaultdisplaytext', '');  
  
  var newElement = document.createElement('tr'); //Création du menu
  newElement.innerHTML = '<td><img src="http://s17.fr.kingsage.gameforge.com/img/arrow_right_raquo.png" alt="" /><span class="click" id="affichage"> KingsAge RC Converter</span><br/></td>';
  document.querySelectorAll('table .borderlist') [6].appendChild(newElement);
   
  var newElement = document.createElement('div'); // On crée la fenêtre
  newElement.innerHTML = '<span id="spanareaRC" style="display:' + defaultDisplay + ';padding-top:3px;"><img id="affichageText" style="padding-left:2.5%;cursor:pointer;" src="http://image.noelshack.com/fichiers/2015/24/1434301080-fermer.png" title="Afficher/Fermer la fenêtre"/><img id="deleteRc" style="padding-left:0.5%;cursor:pointer;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-effacer.png" title="Effacer les entrées"/><img id="agrandir" style="padding-left:0.5%;cursor:pointer;" src="http://image.noelshack.com/fichiers/2015/24/1434303027-ecriturered.png" title="Agrandir la taille de la fenêtre"/><img id="reduire" style="padding-left:0.5%;cursor:pointer;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-ecriture.png" title="Réduire la taille de la fenêtre"/></td><center><textarea rows=' + WinSize + '; style="width:95%;align=center;resize:none;display:' + defaultDisplayText + ';" id="textareaRC">' + RC_saved + '</textarea></center></span>';
  document.querySelectorAll('table .borderlist') [6].querySelectorAll('tr')[5].querySelectorAll('td')[0].appendChild(newElement);
  
  // Fonction qui ouvre/ferme KingsAge RC exporter
  document.getElementById('affichage').addEventListener('click', function (event)
  {
    if (defaultDisplay == 'none')
    {
      GM_setValue('defaultdisplay', 'block');
      defaultDisplay = 'block';
      document.getElementById('spanareaRC').style.display = 'block';
      //document.getElementById('bb_code').getElementsByTagName('img') [0].title = 'Fermer la fenêtre';
    } 
    else
    {
      document.getElementById('spanareaRC').style.display = 'none';
      GM_setValue('defaultdisplay', 'none');
      defaultDisplay = 'none';
    }
  }, false);
  
  // Fonction qui efface la fenêtre au clic
  document.getElementById('deleteRc').addEventListener('click', function (event)
  { RC_saved = '';
    GM_setValue('rc', '');
    document.getElementById('textareaRC').textContent = '';
  }, true);
  
  // Fonction qui ouvre§ferme le textarea au clic
  document.getElementById('affichageText').addEventListener('click', function (event)
  {
    if (defaultDisplayText == 'none')
    {
      GM_setValue('defaultdisplaytext', 'block');
      defaultDisplayText = 'block';
      document.getElementById('textareaRC').style.display = 'block';
    } 
    else
    {
      document.getElementById('textareaRC').style.display = 'none';
      GM_setValue('defaultdisplaytext', 'none');
      defaultDisplayText = 'none';
    }
  }, false);
  
  //Fonction qui augmente la taille de la fenêtre
  document.getElementById('agrandir').addEventListener('click', function (event)
  {
    if (WinSize == 30)
    {
      document.getElementById('textareaRC').rows = '30';
      GM_setValue('winsize', '30');
      WinSize = 30;
    } 
    else
    {
      WinSize += 5
      document.getElementById('textareaRC').rows = WinSize;
      GM_setValue('winsize', WinSize);
      //document.getElementById('bb_code').getElementsByTagName('img') [2].title = 'Réduire la taille de la fenêtre';
    }
  }, true);
  
  //Fonction qui diminue la taille de la fenêtre
  document.getElementById('reduire').addEventListener('click', function (event)
  {
    if (WinSize == 5)
    {
      document.getElementById('textareaRC').rows = '5';
      GM_setValue('winsize', '5');
      WinSize = 5;
    } 
    else
    {
      WinSize -= 5
      document.getElementById('textareaRC').rows = WinSize;
      GM_setValue('winsize', WinSize);
      //document.getElementById('bb_code').getElementsByTagName('img') [2].title = 'Réduire la taille de la fenêtre';
    }
  }, true);
}
