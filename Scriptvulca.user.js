// ==UserScript==
// @name         KinksAge RC Exporter
// @namespace    http://your.homepage/
// @version      1.0.1
// @description  Script permettant de copier facilement le bb-code en masse de plusieurs rc différents afin de les poster sur le board officiel.
// @author       Vulca & Toutatis
// @include      http://*kingsage.gameforge.com/game.php?*=messages*
// @updateURL   https://github.com/Odarik/KingsAge-RC-Converter/blob/master/Script.user.js
// @downloadURL https://github.com/Odarik/KingsAge-RC-Converter/blob/master/Script.user.js
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
  
  
  var newElement = document.createElement('div'); //Test v2
  newElement.innerHTML = '<img style="padding-left:5px;padding-top:7px;" src="http://image.noelshack.com/fichiers/2015/25/1434590290-valid3e.png" alt="" />';
  newElement.setAttribute('id', 'validation');
  newElement.setAttribute('style', 'visibility:hidden;');
  document.querySelectorAll('.smallButton') [1].parentNode.appendChild(newElement);
  
  function anim() 
  {
    document.getElementById('validation').style.visibility='hidden';
  }
  
  var RC_saved = GM_getValue('rc', '');
  
  // Fonction qui ajoute le rc
  document.getElementById('ajouter').addEventListener('click', function (event)
  { 
    // Gestion des infos supprimées 
    var RC_add = document.getElementById('bb_code').innerHTML.replace(/<br>/g, '\n'); //Remplace les sauts de ligne en code html par des sauts de lignes
    RC_add = RC_add.replace(/<span class="zero">0<\/span>/g, '0'); //Remplace le résultat 0 écrit en html par un 0
    RC_add = RC_add.replace(/\[village\].*\[\/village\]/g, ''); //Enlève les coordonnées des villages
    RC_add = RC_add.replace(/.*Combat d'évaluation.*suite à vos pertes au cours de ce combat et aux dégâts provoqués à l'ennemi, vos chances d'obtenir une pierre de bonne fortune ont augmenté.*/g, ''); //Enlève le message des pierres 
    RC_add = RC_add.replace(/\(.*\|.*\)/g,'') //Enlève les coordonnées du village dans le titre mais laisse le nom du village 
    RC_add = RC_add.replace(/\[player\](.*)\[\/player\]/g,'$1'); //Remplace le code [player]Nom[/player] par le Nom
    
    
    
    RC_saved += RC_add;
    GM_setValue('rc', RC_saved); 
    document.getElementById('validation').style.visibility='visible'; 
    setTimeout(anim,1000);    
    document.getElementById('textareaRC').innerHTML=RC_saved;
  }, true);
    
  var WinSize = GM_getValue('winsize', '');
  var Ressource = GM_getValue('ressource', 'inactif');
  var defaultDisplay = GM_getValue('defaultdisplay', '');  
  var defaultDisplayText = GM_getValue('defaultdisplaytext', '');  
  GM_setValue('ressource', 'inactif');
  
  var newElement = document.createElement('tr'); //Création du menu
  newElement.innerHTML = '<td><img src="http://s17.fr.kingsage.gameforge.com/img/arrow_right_raquo.png" alt="" /><span class="click" id="affichage"> KingsAge RC Converter</span><br/></td>';
  document.querySelectorAll('table .borderlist') [6].appendChild(newElement);
  
  
  
  
  var newElement = document.createElement('div'); // On crée la fenêtre et le menu icone
  newElement.innerHTML = '<span id="spanareaRC" style="display:' + defaultDisplay + ';padding-top:3px;"><img id="affichageText" style="padding-left:2.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434301080-fermer.png" title="Afficher/Fermer la fenêtre"/><img id="deleteRc" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-effacer.png" title="Effacer les entrées"/><img id="agrandir" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434303027-ecriturered.png" title="Agrandir la taille de la fenêtre"/><img id="reduire" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-ecriture.png" title="Réduire la taille de la fenêtre"/><span style="padding-left:0.5%;display:inline-block;vertical-align:3px;">Ressources :</span><img id="ressourceRC" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png" title="Afficher les ressources pillés dans le rc."/></td><center><textarea rows=' + WinSize + '; style="width:95%;align=center;resize:none;display:' + defaultDisplayText + ';" id="textareaRC">' + RC_saved + '</textarea></center></span>';
  document.querySelectorAll('table .borderlist') [6].querySelectorAll('tr')[5].querySelectorAll('td')[0].appendChild(newElement);
  
  // Fonction qui ouvre/ferme KingsAge RC exporter
  document.getElementById('affichage').addEventListener('click', function (event)
  {
    if (defaultDisplay == 'none')
    {
      GM_setValue('defaultdisplay', 'block');
      defaultDisplay = 'block';
      document.getElementById('spanareaRC').style.display = 'block';
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
    }
  }, true);
  
  document.getElementById('ressourceRC').addEventListener('click', function (event)
  { 
    if (Ressource == 'inactif')
    {
      document.getElementById('ressourceRC').src="http://image.noelshack.com/fichiers/2015/25/1434585646-valideressource.png";    
      Ressource = 'actif'
    }
    else
      {
        document.getElementById('ressourceRC').src="http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png"; 
        Ressource = 'inactif'
      }
  }, true);
}
