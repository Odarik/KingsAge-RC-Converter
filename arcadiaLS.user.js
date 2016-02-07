// ==UserScript==
// @name        LS Arcadia
// @namespace   LS Arcadia
// @author      Odarik
// @version     1.1.0
// @include     http://www.arcadia-forum.com/*
// @updateURL   https://github.com/Odarik/KingsAge-RC-Converter/raw/master/arcadiaLS.user.js
// @downloadURL https://github.com/Odarik/KingsAge-RC-Converter/raw/master/arcadiaLS.user.js
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
// == Scripts ==

if (/libre-service/.test(location.href))
{
  var bouton = document.createElement('a');
  bouton.innerHTML = 'Script LS Graph'
  bouton.setAttribute('id', 'scriptLSGraph');
  bouton.setAttribute('style', 'cursor:pointer;position:absolute;left:120px;');
  document.querySelectorAll('.ls_nav') [0].appendChild(bouton);
  var bouton = document.createElement('a');
  bouton.innerHTML = 'Script LS Codage'
  bouton.setAttribute('id', 'scriptLSCod');
  bouton.setAttribute('style', 'cursor:pointer;position:absolute;left:220px;');
  document.querySelectorAll('.ls_nav') [0].appendChild(bouton);
  var bouton = document.createElement('a');
  bouton.innerHTML = 'Ajouter au LS +'
  bouton.setAttribute('id', 'scriptLSplus');
  bouton.setAttribute('style', 'cursor:pointer;position:absolute;left:330px;');
  document.querySelectorAll('.ls_nav') [0].appendChild(bouton);
  var contenu = '';
  var qeel = GM_getValue('qeel', '');
  var header = GM_getValue('header', '');
  var pa = GM_getValue('pa', '');
  var categorie = GM_getValue('categorie', '');
  var message = GM_getValue('message', '');
  var autres = GM_getValue('autres', '');
  var contenufin = '';
  var headerban = GM_getValue('headerban', '');
  var avatar = GM_getValue('avatar', '');
  var signature = GM_getValue('signature', '');
  var autresgraph = GM_getValue('autresgraph', '');
  var fichepub = GM_getValue('fichepub', '');
  var ficherp = GM_getValue('ficherp', '');
  var newElement = document.createElement('div');
  newElement.innerHTML = '<div id="closeLS" style="cursor:pointer;position:relative;top:150px;text-decoration: none;left:25%;  font-size: 35px;  font-weight: bold;  color: #fff;margin-bottom:10px;">×</div><center><textarea style="width:50%;height:700px;margin-top:150px;" id="textareaLS"></textarea></center>';
  newElement.setAttribute('style', 'width:100%;height:100%;background-color: rgba(0, 0, 0, 0.4);position:fixed;top:0px;z-index:600;display:none;');
  newElement.setAttribute('id', 'divLS');
  document.body.appendChild(newElement);
  document.getElementById('scriptLSplus').addEventListener('click', function (event)
  {
    for (i = 0; i < document.querySelectorAll('.ls_infos').length; i++) {
      contenu2 = document.querySelectorAll('.ls_infos') [i].parentNode.parentNode.getAttribute('class');
      contenu = document.querySelectorAll('.ls_infos') [i].innerHTML.replace(/.*(<a class="ls_topictitle.*".*>.*<\/a>).*/g, '$1').replace(/<img [^>]*>/, '').replace(/(<a[^<]*<\/a>).*/, '$1').replace(/class="ls_topictitle"/, '') + '\n';
      if(contenu2 != 'ls_bloc'){
        contenu = "";
      }
      if (contenu.search(/\[qeel\]/i) != - 1) {
        qeel += '[*]' + contenu;
      }
      if (contenu.search(/\[pa\]/i) != - 1) {
        pa += '[*]' + contenu;
      }
      if (contenu.search(/\[profil\]/i) != - 1) {
        message += '[*]' + contenu;
      }
      if ((contenu.search(/\[catégories\]/i) != - 1) || (contenu.search(/\[.*sous-forums.*\]/i) != - 1)) {
        categorie += '[*]' + contenu;
      }
      if (contenu.search(/\[header\]/i) != - 1) {
        header += '[*]' + contenu;
      }
      if (contenu.search(/\[fiche pub\]/i) != - 1) {
        fichepub += '[*]' + contenu;
      }
      if (contenu.search(/\[fiche rp\]/i) != - 1) {
        ficherp += '[*]' + contenu;
      }
      if ((contenu.search(/\[qeel\]/i) == - 1) && (contenu.search(/\[pa\]/i) == - 1) && (contenu.search(/\[profil\]/i) == - 1) && (contenu.search(/\[catégories\]/i) == - 1) && (contenu.search(/\[header\]/i) == - 1) && (contenu.search(/\[fiche rp\]/i) == - 1) && (contenu.search(/\[fiche pub\]/i) == - 1) && (contenu != "") && (contenu.search(/\[.*sous-forums.*\]/i) == - 1) )
      {
        autres += '[*]' + contenu;
      }
      if ((contenu.search(/header/i) != - 1) || (contenu.search(/bannière/i) != - 1)) {
        headerban += '[*]' + contenu;
      }
      if (contenu.search(/avatar/i) != - 1) {
        avatar += '[*]' + contenu;
      }
      if (contenu.search(/signature/i) != - 1) {
        signature += '[*]' + contenu;
      }
      if ((contenu.search(/header/i) == - 1) && (contenu.search(/bannière/i) == - 1) && (contenu.search(/avatar/i) == - 1) && (contenu.search(/signature/i) == - 1) && (contenu != ""))
      {
        autresgraph += '[*]' + contenu;
      }
    }
    GM_setValue('qeel', qeel);
    GM_setValue('header', header);
    GM_setValue('pa', pa);
    GM_setValue('categorie', categorie);
    GM_setValue('message', message);
    GM_setValue('autres', autres);
    GM_setValue('headerban', headerban);
    GM_setValue('avatar', avatar);
    GM_setValue('signature', signature);
    GM_setValue('autresgraph', autresgraph);
    GM_setValue('fichepub', fichepub);
    GM_setValue('ficherp', ficherp);
  }, true);
  document.getElementById('scriptLSCod').addEventListener('click', function (event)
  {
    contenufin = '<div class="titre_ls">Récapitulatif du Libre Service</div>\n\n[center]Ce topic reprend tous les liens des libres services présents dans ce sous-forum. Vous n&apos;avez plus qu&apos;à faire votre choix ![/center]\n\n' +
    '<div class="soustitre_ls" >• Header et Footer</div>\n[list]' + GM_getValue('header', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Page d&apos;Acceuil</div>\n[list]' + GM_getValue('pa', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Catégories et Forums</div>\n[list]' + GM_getValue('categorie', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• QEEL</div>\n[list]' + GM_getValue('qeel', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Messages et Profils</div>\n[list]' + GM_getValue('message', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Fiches Pub</div>\n[list]' + GM_getValue('fichepub', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Fiches RP</div>\n[list]' + GM_getValue('ficherp', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Autres</div>\n[list]' + GM_getValue('autres', '') + '[/list]';
    document.getElementById('textareaLS').innerHTML = contenufin;
    document.getElementById('divLS').style.display = 'table';
  }, true);
  document.getElementById('scriptLSGraph').addEventListener('click', function (event)
  {
    contenufin = '<div class="titre_ls">Récapitulatif du Libre Service</div>\n\n[center]Ce topic reprend tous les liens des libres services présents dans ce sous-forum. Vous n&apos;avez plus qu&apos;à faire votre choix ![/center]\n\n' +
    '<div class="soustitre_ls" >• Header et Bannières</div>\n[list]' + GM_getValue('headerban', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Avatarl</div>\n[list]' + GM_getValue('avatar', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Signatures</div>\n[list]' + GM_getValue('signature', '') + '[/list]\n\n' +
    '<div class="soustitre_ls" >• Autres</div>\n[list]' + GM_getValue('autresgraph', '') + '[/list]';
    document.getElementById('textareaLS').innerHTML = contenufin;
    document.getElementById('divLS').style.display = 'table';
  }, true);
  document.getElementById('closeLS').addEventListener('click', function (event)
  {
    GM_setValue('qeel', '');
    GM_setValue('header', '');
    GM_setValue('pa', '');
    GM_setValue('categorie', '');
    GM_setValue('message', '');
    GM_setValue('autres', '');
    GM_setValue('headerban', '');
    GM_setValue('avatar', '');
    GM_setValue('signature', '');
    GM_setValue('autresgraph', '');
    GM_setValue('fichepub', '');
    GM_setValue('ficherp', '');
    document.getElementById('divLS').style.display = 'none';
  }, true);
}
