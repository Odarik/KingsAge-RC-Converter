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

if(document.getElementById('bb_code'))
{
var RC_saved = GM_getValue('rc', '');
RC_saved += document.getElementById('bb_code').innerHTML.replace(/<br>/g, '\n')+'\n\n'; 
GM_setValue('rc',RC_saved );	
	
var WinSize = GM_getValue('winsize', '');	
//alert('Taille fenetre = ' + WinSize + ' merci');
	
var newElement = document.createElement("div"); // On crée un nouvelle élément 
	newElement.innerHTML = '<center><textarea rows='+ WinSize +'; style="width:95%;align=center;display:block;" id="textareaRC" onClick="javascript:this.select();" >' + RC_saved +'</textarea></center>';
				
			document.getElementById('bb_code').appendChild(newElement);
		
		 var newElement = document.createElement("span"); // On crée un nouvelle élément a
	    newElement.innerHTML = '<img style="padding-left:2.5%;" src="http://s17.fr.kingsage.gameforge.com/img-layouts/_widget_night/widget_icon_3.png" title="Afficher la fenêtre"/>'
			newElement.setAttribute("id","affichage");
			newElement.setAttribute("style","cursor:pointer;");				
			document.getElementById('bb_code').appendChild(newElement);
			
		var newElement = document.createElement("span"); // On crée un nouvelle élément a
	    newElement.innerHTML = '<img style="padding-left:0.5%;" src="http://s17.fr.kingsage.gameforge.com/img-layouts/_widget_night/widget_icon_2.png" title="Effacer les entrées"/>'
			newElement.setAttribute("id","deleteRc");
			newElement.setAttribute("style","cursor:pointer;");				
			document.getElementById('bb_code').appendChild(newElement);
	
	var newElement = document.createElement("span"); // On crée un nouvelle élément a
	    newElement.innerHTML = '<img style="padding-left:0.5%;" src="http://s17.fr.kingsage.gameforge.com/img/arrow_right.png" title="Agrandir la case"/>'
			newElement.setAttribute("id","agrandir");
			newElement.setAttribute("style","cursor:pointer;");				
			document.getElementById('bb_code').appendChild(newElement);
  
  	document.getElementById("deleteRc").addEventListener("click", function(event) 
			{
					
				GM_setValue('rc','');
				document.getElementById("textareaRC").textContent='';
				
			}, true);
  
  document.getElementById("affichage").addEventListener("click", function(event) 
   {if ( document.getElementById('textareaRC').style.display == "none" )
		{document.getElementById('textareaRC').style.display= "block";
		document.getElementById('bb_code').getElementsByTagName('img')[0].title= "Fermer la fenêtre";}
    else
			{document.getElementById('textareaRC').style.display= "none";   
	 
    }
   }, false);
	
  document.getElementById("agrandir").addEventListener("click", function(event)
  {
		
   // if (document.getElementById('bb_code').getElementsByTagName('textarea')[0].rows == 5)
		if ( WinSize == 5 )
	 	{
		 	//document.getElementById('bb_code').getElementsByTagName('textarea')[0].rows= "20";
			document.getElementById('textareaRC').rows= "20";
			GM_setValue('winsize', '20' );
			WinSize = 20;
			//alert('Taille fenetre = ' + WinSize + ' agrandir20');
  	}
		else
		{
			//document.getElementById('bb_code').getElementsByTagName('textarea')[0].rows= "5";
		  document.getElementById('textareaRC').rows= "5";
			GM_setValue('winsize', '5' ); 
			WinSize = 5;
			//alert('Taille fenetre = ' + WinSize + ' agrandir5');
		}
		
	}, true);
	
}
