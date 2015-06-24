// ==UserScript==
// @name          Test jQuery
// @namespace     http://www.developpez.com
// @description   Teste le fonctionnement de jQuery
// @include       http://*kingsage.gameforge.com/game.php*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version       1.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
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
        alert(GM_getValue('url' + nom + 'forum', lien));
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
          var single = GM_getValue('rc', '');
          alert(GM_getValue('rc', ''))
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
