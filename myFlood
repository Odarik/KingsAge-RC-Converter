// ==UserScript==
// @name         myFlood
// @version      0.0.1
// @description  Script option message board officiel
// @author       Odarik
// @include      http://board.fr.ogame.gameforge.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant		   GM_getValue
// @grant		   GM_setValue
// ==/UserScript==
// == Compatibilité navigateur ==
var Chrome = navigator.userAgent.indexOf('Chrome') > - 1;
if (Chrome)
{
  this.GM_getValue = function (key, def) {
    return localStorage[key] || def;
  };
  this.GM_setValue = function (key, value) {
    return localStorage[key] = value;
  };
  this.GM_deleteValue = function (key) {
    return delete localStorage[key];
  };
}
// == Script ==

if (/form=PostAdd/.test(location.href))
{
  var caseAv = GM_getValue('caseAv', '');
  var caseAp = GM_getValue('caseAp', '');
  
  var caseSc = document.createElement('div'); //Affichage des boutons
  caseSc.innerHTML = '<fieldset><form name="case"><center><label for="case">Case Avant :</label><input style="margin-left:1%;" type="text" name="case" id="case" size="80%" value="' + caseAv + '" /><input type="button" style="margin-left:1%;cursor:pointer;" id="ajouter" value="Envoyer" /></center></div><div><center><label for="case2">Case Après :</label><input style="margin-left:1%;margin-top:1%;" type="text" name="case2" id="case2" size="80%" value="' + caseAp + '" /><input style="margin-left:1%;cursor:pointer;" type="button" value="Envoyer" id="ajouterV2"/></center></form><div><center><input style="margin-top:1%;cursor:pointer;" type="button" value="Sauvegarder les paramètres" id="Sauvegarder"/></center></fieldset>'
  document.querySelector('.container-1').appendChild(caseSc);
  
  //Fonction qui gère le bouton Envoyer
  document.getElementById('ajouter').addEventListener('click', function (event)
  {
    document.getElementById('mce_editor_0_codeview').value = caseAv + document.getElementById('mce_editor_0_codeview').value;
    if (Chrome)
    {
      caseAv = GM_getValue('caseAv', '');
      document.getElementById('mce_editor_0_codeview').value = caseAv + document.getElementById('mce_editor_0_codeview').value;
    }
  }, true);
  
  document.getElementById('ajouterV2').addEventListener('click', function (event)
  {
    document.getElementById('mce_editor_0_codeview').value += caseAp;
    if (Chrome)
    {
      caseAp = GM_getValue('caseAp', '');
      document.getElementById('mce_editor_0_codeview').value += caseAp;
    }
  }, true);
  
  document.getElementById('Sauvegarder').addEventListener('click', function (event)
  {
    caseAv = document.forms['case'].elements['case'].value;
    GM_setValue('caseAv', caseAv);
    caseApV = document.forms['case'].elements['case2'].value;
    GM_setValue('caseAp', caseApV);
  }, true);
}

