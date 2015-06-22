// ==UserScript==
// @name        Robot RC
// @namespace   Robot RC
// @include     http://board.fr.kingsage.gameforge.com/*
// @version     2.0
// @grant		   GM_getValue
// @grant		   GM_setValue
// ==/UserScript==


var RC_saved = "Test bot pour script29Firefox"

if(/board.fr.kingsage.gameforge.com/.test(location.href))
  {
var bouton = document.createElement('input'); //Affichage du bouton ajouter à côté de transmettre/supprimer
  bouton.innerHTML = 'Envoyer'
  bouton.setAttribute('type', 'button');
  bouton.setAttribute('id', 'ajouter');
  bouton.setAttribute('value', 'Robot');
  bouton.setAttribute('name', 'Robot');
  bouton.setAttribute('tabindex', '8');
  document.querySelector('.formSubmit').appendChild(bouton);



 //Fonction qui efface la fenêtre
  document.getElementById('ajouter').addEventListener('click', function (event)
  {     
    window.open('http://board.fr.kingsage.gameforge.com/board30-les-mondes/board293-monde-20/board297-taverne-des-chevaliers/13851-la-taverne-de-la-c%C3%A9r%C3%A9ale-enchant%C3%A9e/?bouton=script');  
    
  }, true);
  }
if(/bouton=script/.test(location.href))
  {
    var url2 = document.getElementById('replyButton1').href;
    url2 +='&bouton=url2';
    window.location.replace(url2);
    //window.open(url2);
   
  }

if(/bouton=url2/.test(location.href))
      {
        //var RC_saved = GM_getValue('rc', '');
        var Chrome = navigator.userAgent.indexOf('Chrome')>-1;
        document.getElementById('text').innerHTML = RC_saved;
        if (Chrome)
          {
            RC_saved = "Test bot pour script29Chrome"
            document.getElementById('mce_editor_0_codeview').value = RC_saved;
          }
        
        document.getElementsByName('send')[1].click();
      }


        
