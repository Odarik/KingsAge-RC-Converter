// ==UserScript==
// @name         KingsAge RC Exporter
// @version      3.0.1
// @description  Script permettant de copier facilement le bb-code en masse de plusieurs rc différents afin de les poster sur le board officiel.
// @author       Toutatis
// @include      http://*kingsage.gameforge.com/game.php?*
// @include      http://board.fr.kingsage.gameforge.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @updateURL   https://raw.githubusercontent.com/Odarik/KingsAge-RC-Converter/master/Script.user.js
// @downloadURL https://raw.githubusercontent.com/Odarik/KingsAge-RC-Converter/master/Script.user.js
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
// == Script KingsAge ==

if (/fr.kingsage.gameforge.com\/game/.test(location.href))
{
  if (document.getElementById('bb_code'))
  {
    var bouton = document.createElement('div'); //Affichage du bouton ajouter à côté de transmettre/supprimer
    bouton.innerHTML = 'Ajouter à KingsAge RC Exporter'
    bouton.setAttribute('class', 'smallButton');
    bouton.setAttribute('id', 'ajouter');
    bouton.setAttribute('style', 'cursor:pointer;');
    document.querySelectorAll('.smallButton') [0].parentNode.appendChild(bouton);
    var RC_saved = GM_getValue('rc', '');
    var nbrCaract = GM_getValue('nbrcaract', '');
    //Fonction qui ajoute le rc
    document.getElementById('ajouter').addEventListener('click', function (event)
    {
      $(this).fadeOut('slow').fadeIn('slow');
      //Gestion des infos supprimées
      var RC_add = document.getElementById('bb_code').innerHTML.replace(/<br>\[b\]\[\/b\]<br>/g, ''); //Enlève un bug d'affichage sur les RC qui sont transférés. Saut de ligne trop grand avec balise gras vide au milieu. 
      RC_add = RC_add.replace(/^\s([\S\s]+)?$/, '$1') //Supprime le premier retour à la ligne dans le textarea du au div du code.
      RC_add = RC_add.replace(/\[b\]Ressources espionnées.*/g, '\n'); //Enlève ressources espionnées
      RC_add = RC_add.replace(/\[b\]Bâtiments.*/g, '\n'); //Enlève batiments espionnées
      RC_add = RC_add.replace(/\[b\]Unités.*/g, '\n'); //Enlève unités à l'extérieur
      RC_add = RC_add.replace(/<br>/g, '\n'); //Remplace les sauts de ligne en code html par des sauts de lignes
      RC_add = RC_add.replace(/<span class="zero">0<\/span>/g, '0'); //Remplace le résultat 0 écrit en html par un 0
      RC_add = RC_add.replace(/\[village\].*\[\/village\]/g, ''); //Enlève les coordonnées des villages
      RC_add = RC_add.replace(/.*Combat d'évaluation.*suite à vos pertes au cours de ce combat et aux dégâts provoqués à l'ennemi, vos chances d'obtenir une pierre de bonne fortune ont augmenté.*/g, ''); //Enlève le message combat d'évaluation
      RC_add = RC_add.replace(/\[b\]Vous avez gagné une pierre de bonne fortune !/g, '') //Message gain de pierre : titre
      RC_add = RC_add.replace(/Servez-vous-en.*\[\/b\]/g, '') //Message gain de pierre : texte       
      RC_add = RC_add.replace(/\([0-9]*\|[0-9]*\)/g, '') //Enlève les coordonnées du village dans le titre mais laisse le nom du village 
      RC_add = RC_add.replace(/\[player\](.*)\[\/player\]/g, '$1'); //Remplace le code [player]Nom[/player] par le Nom
      RC_add = RC_add.replace(/<b>([0-9]*)<\/b>/g, '[b]$1[/b]'); //Remplace les balises html Gras en balise BB_code Gras
      //Enlève si la case ressource est décoché les pillages.
      if (Ressource == 'inactif')
      {
        RC_add = RC_add.replace(/\[b\]Ressources pillées: \[\/b\]/g, '');
        RC_add = RC_add.replace(/\[img\].*\([0-9.]*\/[0-9.]*\)/g, '');
      }
      //Laisser ces 5 lignes en dernières c'est question de mise en page finale, post changement.

      RC_add = RC_add.replace(/&nbsp;/g, ' ');
      RC_add = RC_add.replace(/\n\n\n\n/g, '\n'); //Supprime les trop grand nombres de saut de ligne après modification pour une mise en page plus jolie.
      RC_add = RC_add.replace(/\n\n\n/g, '\n\n'); //Supprime les trop grand nombres de saut de ligne après modification pour une mise en page plus jolie. 
      RC_add = RC_add.replace(/<b>/g, '') //Supprime certaines balises html qui s'affiche inutilement.
      RC_add = RC_add.replace(/<\/b>/g, '') //Supprime certaines balises html qui s'affiche inutilement.
      //Transformation en bb_code raccourci
      RC_add = RC_add.replace(/\[img\].*unit_farmer.png\[\/img\]/g, 'img_farmer');
      RC_add = RC_add.replace(/\[img\].*unit_sword.png\[\/img\]/g, 'img_sword');
      RC_add = RC_add.replace(/\[img\].*unit_spear.png\[\/img\]/g, 'img_spear');
      RC_add = RC_add.replace(/\[img\].*unit_axe.png\[\/img\]/g, 'img_axe');
      RC_add = RC_add.replace(/\[img\].*unit_bow.png\[\/img\]/g, 'img_bow');
      RC_add = RC_add.replace(/\[img\].*unit_spy.png\[\/img\]/g, 'img_spy');
      RC_add = RC_add.replace(/\[img\].*unit_light.png\[\/img\]/g, 'img_light');
      RC_add = RC_add.replace(/\[img\].*unit_heavy.png\[\/img\]/g, 'img_heavy');
      RC_add = RC_add.replace(/\[img\].*unit_ram.png\[\/img\]/g, 'img_ram');
      RC_add = RC_add.replace(/\[img\].*unit_kata.png\[\/img\]/g, 'img_kata');
      RC_add = RC_add.replace(/\[img\].*unit_snob.png\[\/img\]/g, 'img_snob');
      RC_add = RC_add.replace(/\[img\].*luck.png\[\/img\]/g, 'img_active');
      RC_add = RC_add.replace(/\[img\].*luck_inactive.png\[\/img\]/g, 'img_inactive');
      RC_add = RC_add.replace(/\[img\].*blue.png\[\/img\]/g, 'img_blue');
      RC_add = RC_add.replace(/\[img\].*yellow.png\[\/img\]/g, 'img_yellow');
      RC_add = RC_add.replace(/\[img\].*red.png\[\/img\]/g, 'img_red');
      RC_add = RC_add.replace(/\[img\].*green.png\[\/img\]/g, 'img_green');
      RC_saved += RC_add;
      GM_setValue('rc', RC_saved);
      document.getElementById('textareaRC').value = RC_saved;
      nbrCaract = RC_saved.length;
      GM_setValue('nbrcaract', nbrCaract);
      caractere();
    }, true);
    //Variable des options qui sont sauvegardés selon le choix des utilisateurs.
    var WinSize = GM_getValue('winsize', '');
    var Ressource = GM_getValue('ressource', '');
    var imgRessource = GM_getValue('imgressource', 'http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png')
    var defaultDisplay = GM_getValue('defaultdisplay', '');
    var defaultDisplayText = GM_getValue('defaultdisplaytext', '');
    var urlRobot = GM_getValue('urlrobot', '');
    var newElement = document.createElement('tr'); //Création du menu en bas de la page
    newElement.innerHTML = '<td><img src="http://s17.fr.kingsage.gameforge.com/img/arrow_right_raquo.png" alt="" /><span class="click" id="affichage"> KingsAge RC Converter</span><br/></td>';
    document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].appendChild(newElement);
    var newElement = document.createElement('div'); //Création de la fenêtre et du menu des icones
    newElement.innerHTML = '<span id="spanareaRC" style="display:' + defaultDisplay + ';padding-top:3px;"><img id="affichageText" style="padding-left:2.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434301080-fermer.png" title="Afficher/Fermer la fenêtre"/><img id="deleteRc" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-effacer.png" title="Effacer les entrées"/><img id="agrandir" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434303027-ecriturered.png" title="Agrandir la taille de la fenêtre"/><img id="reduire" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="http://image.noelshack.com/fichiers/2015/24/1434300992-ecriture.png" title="Réduire la taille de la fenêtre"/><span style="padding-left:0.5%;display:inline-block;vertical-align:3px;">Ressources pillées :</span><img id="ressourceRC" style="padding-left:0.5%;cursor:pointer;display:inline-block;" src="' + imgRessource + '" title="Afficher les ressources pillés dans le rc."/><span id="textSpanArea" style="display:' + defaultDisplayText + ';"><center><textarea rows=' + WinSize + ';  style="width:95%;align=center;resize:none;" id="textareaRC">' + RC_saved + '</textarea></center><div><span style="padding-left:2.5%;padding-top:3px;display:inline-block;vertical-align:6px;">Nombre de caractères :</span><span id="mySpan" style="padding-left:0.5%;color:black;display:inline-block;vertical-align:6px;";>' + nbrCaract + '</span><img style="visibility:hidden;padding-left:0.7%;padding-top:3px;display:inline-block;" id="selectImg" src="http://image.noelshack.com/fichiers/2015/25/1434846546-limite.png" alt=""/><span style="padding-left:30%;display:inline-block;vertical-align:6px;padding-right:2.5%">Max : 10.000</span></div></span></span>';
    document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr') [(document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr')).length - 1].querySelectorAll('td') [0].appendChild(newElement);
    //Fonction qui gère le nombre de caractère et son affichage.
    function caractere()
    {
      if (nbrCaract > 10000) //Si c'est supérieur, cela l'affiche en rouge.
      {
        document.getElementById('mySpan').style.color = 'red';
        document.getElementById('selectImg').style.visibility = 'visible';
      } 
      else
      {
        document.getElementById('mySpan').style.color = 'black';
        document.getElementById('selectImg').style.visibility = 'hidden';
      }
      document.getElementById('mySpan').innerHTML = nbrCaract;
    }
    var url = document.createElement('form'); //Affichage du champ url avec champ et les deux boutons
    url.innerHTML = '<span id="spanareaRC2" style="display:' + defaultDisplay + ';"><center><label for="url">Url</label> : <input type="text" name="url" id="url" size="80%" value="' + urlRobot + '" /><input type="button" style="margin-left:1%;cursor:pointer;" id="recupUrl" value="Valider" /><input type="button" style="margin-left:1%;cursor:pointer;" id="initialiseUrl" value="Réinitialiser URL" /></center></span>'
    url.setAttribute('name', 'url');
    document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr') [(document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr')).length - 1].querySelectorAll('td') [0].appendChild(url);
    var bouton = document.createElement('div'); //Affichage du bouton pour le robot
    bouton.innerHTML = '<span id="spanareaRC3" style="display:' + defaultDisplay + ';"><center><input type="button" id="demarrerrobot" style="cursor:pointer;" name="robot" value="Envoyer sur le forum" /></center></span>';
    document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr') [(document.querySelectorAll('table .borderlist') [(document.querySelectorAll('table .borderlist').length) - 2].querySelectorAll('tr')).length - 1].querySelectorAll('td') [0].appendChild(bouton);
    //Fonction qui gère le bouton Valider
    document.getElementById('recupUrl').addEventListener('click', function (event)
    {
      $(this).fadeOut().fadeIn();
      url = document.forms['url'].elements['url'].value;
      GM_setValue('urlrobot', url);
    }, true);
    //Fonction qui gère le bouton Réinitialiser
    document.getElementById('initialiseUrl').addEventListener('click', function (event)
    {
      $(this).fadeOut().fadeIn();
      document.forms['url'].elements['url'].value = '';
      GM_setValue('urlrobot', '');
    }, true);
    //Fonction qui ouvre/ferme KingsAge RC exporter
    document.getElementById('affichage').addEventListener('click', function (event)
    {
      if (defaultDisplay == 'none')
      {
        GM_setValue('defaultdisplay', 'block');
        defaultDisplay = 'block';
        document.getElementById('spanareaRC').style.display = 'block';
        document.getElementById('spanareaRC2').style.display = 'block';
        document.getElementById('spanareaRC3').style.display = 'block';
      } 
      else
      {
        document.getElementById('spanareaRC').style.display = 'none';
        document.getElementById('spanareaRC2').style.display = 'none';
        document.getElementById('spanareaRC3').style.display = 'none';
        GM_setValue('defaultdisplay', 'none');
        defaultDisplay = 'none';
      }
    }, false);
    //Fonction qui efface la fenêtre
    document.getElementById('deleteRc').addEventListener('click', function (event)
    {
      RC_saved = '';
      GM_setValue('rc', '');
      GM_setValue('nbrcaract', '0');
      document.getElementById('textareaRC').value = '';
      document.getElementById('mySpan').innerHTML = '0';
      document.getElementById('mySpan').style.color = 'black';
      document.getElementById('selectImg').style.visibility = 'hidden';
    }, true);
    //Fonction qui ouvre/ferme le textarea
    document.getElementById('affichageText').addEventListener('click', function (event)
    {
      if (defaultDisplayText == 'none')
      {
        GM_setValue('defaultdisplaytext', 'block');
        defaultDisplayText = 'block';
        document.getElementById('textSpanArea').style.display = 'block';
      } 
      else
      {
        document.getElementById('textSpanArea').style.display = 'none';
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
    //Fonction qui gère l'option des ressources au niveau de l'affichage dans le menu.
    document.getElementById('ressourceRC').addEventListener('click', function (event)
    {
      if (Ressource == 'inactif')
      {
        document.getElementById('ressourceRC').src = 'http://image.noelshack.com/fichiers/2015/25/1434585646-valideressource.png';
        GM_setValue('ressource', 'actif');
        Ressource = 'actif';
        imgRessource = 'http://image.noelshack.com/fichiers/2015/25/1434585646-valideressource.png';
        GM_setValue('imgressource', 'http://image.noelshack.com/fichiers/2015/25/1434585646-valideressource.png');
      } 
      else
      {
        document.getElementById('ressourceRC').src = 'http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png';
        GM_setValue('ressource', 'inactif');
        Ressource = 'inactif';
        imgRessource = 'http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png';
        GM_setValue('imgressource', 'http://image.noelshack.com/fichiers/2015/25/1434585646-invalideressource.png');
      }
    }, true);
    //Fonction qui gère le clic du bouton Envoyer sur le forum
    document.getElementById('demarrerrobot').addEventListener('click', function (event)
    {
      urlBoard = GM_getValue('urlrobot', '');
      urlBoard += '?bouton=script'
      if (urlBoard == '?bouton=script')
      {
        alert('Veuillez rentrer une url');
      } 
      else
      {
        document.getElementById('textareaRC').value = '';
        document.getElementById('mySpan').innerHTML = '0';
        document.getElementById('mySpan').style.color = 'black';
        document.getElementById('selectImg').style.visibility = 'hidden';
        window.open(urlBoard);
      }
    }, true);
  }
  if (/m=forum/.test(location.href))
  {
    var nom = document.location.href;
    nom = nom.replace(/^.*(s19).*/i, '$1');
    var lien = GM_getValue('url' + nom + 'forum', '');
    $('iframe[src*="forum.php?"]').load(function () {
      var forum = $('iframe[src*="forum.php?"]').get(0).contentDocument.location.href;
      if (forum.match('s=forum_thread&thread_id='))
      {
        var contenu = $('iframe[src*="forum.php?"]').contents();
        $(contenu).find('div.smallButton:first').before('<div class="smallButton"><span id="KingsageRC" style="cursor:pointer;">Sauvegarder(RC Exporter)</span></div>');
        $(contenu).find('#KingsageRC').bind('click', function ()
        {
          $(this).fadeOut().fadeIn();
          var idThread = $('iframe[src*="forum.php?"]').contents().find('td.headerInfo > a').attr('href');
          var url = document.location.href;
          lien = url.replace(/game.php.*/, idThread);
          GM_setValue('url' + nom + 'forum', lien);
        })
      }
    })
  }
  if (/s=messages/.test(location.href))
  {
    if (document.getElementById('bb_code'))
    {
      var nom = document.location.href;
      nom = nom.replace(/^.*(s19).*/i, '$1');
      var bouton = document.createElement('div');
      bouton.innerHTML = 'Ajouter au forum d\'alliance'
      bouton.setAttribute('class', 'smallButton');
      bouton.setAttribute('id', 'ajouterforum');
      bouton.setAttribute('style', 'cursor:pointer;');
      document.querySelectorAll('.smallButton') [0].parentNode.appendChild(bouton);
      $('#ajouterforum').bind('click', function ()
      {
        $(this).fadeOut('slow').fadeIn('slow');
        threadID = GM_getValue('url' + nom + 'forum', '');
        function confirmPost(playerName, threadName)
        {
          function makePost()
          {
            //var single = data.shift(); >> Single vide je crois ou data vide trouver a quoi correspond data dans le script. shift supprime certains elements
            var single = document.getElementById('bb_code').innerHTML.replace(/<br>\[b\]\[\/b\]<br>/g, '');
            single = single.replace(/^\s([\S\s]+)?$/, '$1')
            single = single.replace(/<br>/g, '\n'); //Remplace les sauts de ligne en code html par des sauts de lignes
            single = single.replace(/<span class="zero">0<\/span>/g, '0'); //Remplace le résultat 0 écrit en html par un 0
            single = single.replace(/<b>([0-9]*)<\/b>/g, '[b]$1[/b]');
            single = single.replace(/&nbsp;/g, ' ');
            single = single.replace(/<b>/g, '') //Supprime certaines balises html qui s'affiche inutilement.
            single = single.replace(/<\/b>/g, '') //Supprime certaines balises html qui s'affiche inutilement.
            $.ajax({
              url: GM_getValue('url' + nom + 'forum', '') + '&a=forumReplyThread',
              type: 'POST',
              data: 'text=' + single,
              complete: function ()
              {
                data.length > 0 && makePost()
              }
            });
          }
          makePost()
        }
        if (threadID != '')
        {
          threadName = 'Robert'
          playerName = $('table.borderlist').eq(2).find('tr:first').text().trim(),
          playerName = playerName.substring(playerName.indexOf(':') + 1),
          playerName = $.trim(playerName);
          confirmPost(playerName, threadName)
        }
      });
    }
  }
}
//Script première URL : lien du sujet

if (/bouton=script/.test(location.href))
{
  var url2 = document.getElementById('replyButton1').href;
  url2 += '&bouton=url2';
  window.location.replace(url2);
}
//Script seconde URL : envoyer la reponse

if (/bouton=url2/.test(location.href))
{
  RC_saved = GM_getValue('rc', '');
  document.getElementById('text').innerHTML = RC_saved;
  if (Chrome)
  {
    RC_saved = GM_getValue('rc', '');
    document.getElementById('mce_editor_0_codeview').value = RC_saved;
  }
  document.getElementsByName('send') [1].click();
  RC_saved = '';
  GM_setValue('rc', '');
  GM_setValue('nbrcaract', '0');
}
