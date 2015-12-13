// ==UserScript==
// @name        LS Arcadia
// @namespace   LS Arcadia
// @author      Odarik
// @version     1
// @include     http://www.arcadia-forum.com/*
// @grant       none
// ==/UserScript==
if (/libre-service/.test(location.href))
{
  var bouton = document.createElement('a'); 
  bouton.innerHTML = 'Script LS'
  bouton.setAttribute('id', 'scriptLS');
  bouton.setAttribute('style', 'cursor:pointer;position:relative;left:-550px;');
  document.querySelectorAll('.ls_nav') [0].appendChild(bouton);
  
  var contenu="";
  var qeel="";
  var header="";
  var pa="";
  var categorie="";
  var message = "";
  var autres ="";
  var contenufin ="";
  
  var newElement = document.createElement('div');
  newElement.innerHTML = '<div id="closeLS" style="cursor:pointer;position:relative;top:200px;text-decoration: none;left:25%;  font-size: 35px;  font-weight: bold;  color: #fff;margin-bottom:10px;">×</div><center><textarea style="width:50%;height:700px;margin-top:200px;" id="textareaLS"></textarea></center>';
  newElement.setAttribute('style', 'width:100%;height:100%;background-color: rgba(0, 0, 0, 0.4);position:absolute;top:0px;z-index:600;display:none;');  
  newElement.setAttribute('id', 'divLS');
  document.body.appendChild(newElement);
  
  document.getElementById('scriptLS').addEventListener('click', function (event)
  {
    
    for (i = 0; i < document.querySelectorAll(".ls_infos.ls_red").length; i++){
      contenu = document.querySelectorAll(".ls_infos.ls_red")[i].innerHTML.replace(/.*(<a class="ls_topictitle.*".*>;*<\/a>).*/g, '$1').replace(/<img [^>]*>/, '').replace(/(<a[^<]*<\/a>).*/, '$1').replace(/class="ls_topictitle ls_red"/,'') + '\n';  
      if(contenu.search(/\[qeel\]/i)!=-1) {
        qeel += '[*]' + contenu;
      }
      if(contenu.search(/\[pa\]/i)!=-1) {
        pa += '[*]' + contenu;
      }
      if(contenu.search(/\[profil\]/i)!=-1) {
        message += '[*]' + contenu;
      }
      if(contenu.search(/\[catégories\]/i)!=-1) {
        categorie += '[*]' + contenu;
      }
      if(contenu.search(/\[header\]/i)!=-1) {
        header += '[*]' + contenu;
      }
      if ((contenu.search(/\[qeel\]/i)==-1) && (contenu.search(/\[pa\]/i)==-1) && (contenu.search(/\[profil\]/i)==-1) && (contenu.search(/\[catégories\]/i)==-1) && (contenu.search(/\[header\]/i)==-1))
      {autres += '[*]' + contenu;}
    }
    
    contenufin = '<div class="titre_ls">Récapitulatif du Libre Service</div>\n\n[center]Ce topic reprend tous les liens des libres services présents dans ce sous-forum. Vous n&apos;avez plus qu&apos;à faire votre choix ![/center]\n\n' +
      '<div class="soustitre_ls" >• Header et Footer</div>\n[list]' + header + '[/list]\n\n' + 
      '<div class="soustitre_ls" >• Page d&aposAcceuil</div>\n[list]' + pa + '[/list]\n\n' + 
      '<div class="soustitre_ls" >• Catégories et Forums</div>\n[list]' + categorie + '[/list]\n\n' + 
      '<div class="soustitre_ls" >• QEEL</div>\n[list]' + qeel + '[/list]\n\n' + 
      '<div class="soustitre_ls" >• Messages et Profils</div>\n[list]' + message + '[/list]\n\n' + 
      '<div class="soustitre_ls" >• Autres</div>\n[list]' + autres + '[/list]';
    
    document.getElementById('textareaLS').innerHTML = contenufin;
    document.getElementById('divLS').style.display ="table";
   
   
  }, true);
  document.getElementById('closeLS').addEventListener('click', function (event)
  {
   document.getElementById('divLS').style.display ="none";
  }, true);
}

