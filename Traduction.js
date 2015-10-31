function changement(langue) {
	localStorage.setItem("langue",langue);
	window.location.reload();
}

document.addEventListener('load', function(event) {
	langueaff=localStorage.getItem("langue");
	if ((/register/.test(location.href))&&!(/agreed/.test(location.href))){
		if (langueaff=='francais'){
			document.querySelector('.align_gauche').innerHTML='<br><h2 class="u">Conditions d&apos;utilisation du forum</h2>Les modérateurs de ce forum s&apos;efforceront de supprimer ou éditer tous les messages à caractère répréhensible aussi rapidement que possible. Toutefois, il leur est impossible de passer en revue tous les messages. Vous admettez donc que tous les messages postés sur ce forum expriment la vue et opinion de leurs auteurs respectifs, et non celles des modérateurs ou du webmestre (excepté des messages postés par eux-mêmes) et par conséquent qu&apos;ils ne peuvent pas être tenus pour responsables des discussions.	<br><br>Ce forum utilise des cookies pour stocker des informations sur votre ordinateur. Ces cookies ne contiendront aucune information personnelle, ils servent uniquement à améliorer le confort d&apos;utilisation. L&apos;adresse e-mail est uniquement utilisée afin de confirmer les détails de votre inscription ainsi que votre mot de passe (et aussi pour vous renvoyer votre mot de passe en cas d&apos;oubli).<br><br>- les messages agressifs ou diffamatoires, les insultes et critiques personnelles, les grossièretés et vulgarités, et plus généralement tout message contrevenant aux lois françaises en vigueur sont interdits <br>	- les messages incitant à - ou évoquant - des pratiques illégales sont interdits ;<br>- si vous diffusez des informations provenant d&apos;un autre site web, vérifiez auparavant si le site en question ne vous l&apos;interdit pas. Mentionnez l&apos;adresse du site en question par respect du travail de ses administrateurs !<br>	- merci de poster vos messages une seule fois. Les répétitions sont désagréables et inutiles !<br>	- merci de faire un effort sur la grammaire et l&apos;orthographe. Style SMS déconseillé !<br><br>Tout message contrevenant aux dispositions ci-dessus sera édité ou supprimé sans préavis ni justification supplémentaire dans des délais qui dépendront de la disponibilité des modérateurs. Tout abus entraînera la résiliation de l&apos;inscription. <i>Internet n&apos;est ni un espace anonyme, ni un espace de non-droit !</i> Nous nous réservons la possibilité d&apos;informer votre fournisseur d&apos;accès et/ou les autorités judiciaires de tout comportement malveillant. L&apos;adresse IP de chaque intervenant est enregistrée afin d&apos;aider à faire respecter ces conditions.<br>Vous acceptez de recevoir des lettres d&apos;information (newsletter) envoyées par Forumactif uniquement. Vous pouvez à tout moment vous désabonner de ces lettres d&apos;information (newsletter) en modifiant les préférences de votre profil.<br><br><span style="color:red">En cliquant sur le bouton "J&apos;accepte" ci-dessous :<br>	- vous reconnaissez avoir lu dans son intégralité le présent règlement ;<br>- vous vous engagez à respecter sans réserve le présent règlement ;<br>- vous accordez aux modérateurs de ce forum le droit de supprimer, déplacer ou éditer n&apos;importe quel sujet de discussion à tout moment.</span><br><br><br><div align="center"><a class="genmed" href="/register?agreed=true&amp;step=2">J&apos;accepte le règlement</a><br><br><a class="genmed" href="/">Je n&apos;accepte pas le règlement</a></div><br>';
			document.querySelectorAll('th .thHead')[1].innerHTML='Arcadia - Enregistrement - Règlement';
		}
		if (langueaff=='anglais'){
			document.querySelector('.align_gauche').innerHTML='<br><h2 class="u">Forum Terms of service</h2>The moderators of this forum will try hard to edit or remove reprehensible messages as soon as possible. However, it is impossible for them to review all the messages. You thus admit that all the messages posted on this forum express the sight and opinion of their respective authors and not those of the moderators or the Webmaster (except messages posted by them) and consequently, they cannot be held responsible of the discussions. <br><br>This forum uses cookies to store information on your computer. These cookies will not contain any personal information; they are only used to improve comfort while browsing. The address e-mail is only used in order to confirm the details of your registration as your password (and also to send you back your password if you forget it). <br><br>- Aggressive or slanderous messages, as well as personal insults and critics, the coarseness and vulgarities, and more generally any message contravening the French laws are prohibited.<br>- Messages who promote - or evoke - illegal practices are prohibited.<br>- If you post informations which come from another site, look first if the site in question doesn&apos;t forbid it. Show the address of the site in question in order to respect the work of their administrators!<br>- Please post your messages only once. The repetitions are unpleasant and useless! 	<br>- Please make an effort on grammar and spelling. SMS-style language (ex: r u sk8ing?) is not advised!<br><br>Any message contravening the listing above will be edited or removed without additional notice or justification within deadlines which will depend on the availability of the moderators. Any abuse will involve the cancellation of the registration. Internet is neither an anonymous space, nor a space of no-right! We reserve ourselves the possibility of informing your access provider and/or the legal authorities of any malevolent behavior. An IP address of each poster is recorded in order to help us to make you respect these conditions.<br><br><span style="color:red">By clicking on "I agree to these terms" below:<br>- You acknowledge to have fully read these current rules;<br>- You commit yourself to respect unreservedly these current rules;<br>- You grant the moderators of this forum the right to delete, move or edit any discussion subject at any moment.</span><br><br><br><div align="center"><a class="genmed" href="/register?agreed=true&amp;step=2">I agree to these terms</a><br><br><a class="genmed" href="/">I do not agree to these terms</a></div><br>';
			document.querySelectorAll('th .thHead')[1].innerHTML='Arcadia - Registration Agreement Terms';
		}
	}
	if (/step=2/.test(location.href)){
		if (langueaff=='francais'){
			
			document.querySelectorAll('.gensmall')[0].innerHTML='Les champs marqués d&apos;un * sont obligatoires.';
			document.querySelectorAll('th.thHead')[1].innerHTML='Enregistrement';
			if ((document.querySelectorAll('span.gen').length)==3){
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='Confirmer le mot de passe : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Code de confirmation* :';
			}
			if ((document.querySelectorAll('span.gen').length)==4){
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 3].innerHTML='Nom d&apos;utilisateur : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='Adresse e-mail : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Mot de passe : *';
			}
			if ((document.querySelectorAll('span.gen').length)==5){
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('obligatoires')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Vous devez compléter les champs obligatoires.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('adresse')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Désolé, mais cette adresse e-mail est invalide.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('de passe doit être composé au minimum ')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Le mot de passe doit être composé au minimum de 6 caractères et au maximum de 25.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('utilisateur')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Désolé, mais ce nom d&apos;utilisateur est déjà pris.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('sont différents.')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Les mots de passe que vous avez tapés sont différents.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('code de confirmation')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Le code de confirmation que vous avez entré ne correspond pas à celui de l&apos;image. Veuillez réessayer ultérieurement.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('consignes de sécurité')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Votre mot de passe ne respecte pas nos consignes de sécurité. <strong>Essayez un mot de passe plus complexe</strong>.<br>Nous vous conseillons d’utiliser <strong>un mélange de chiffres et de lettres en majuscules et minuscules</strong> pour créer un mot de passe plus sécurisé.<br>Si votre mot de passe n&apos;est pas assez complexe, vous ne serez pas en mesure de poursuivre l&apos;inscription.</span>';
				}
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 3].innerHTML='Nom d&apos;utilisateur : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='Adresse e-mail : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Mot de passe : *';
			}
			document.querySelector('.mainoption').value='Enregistrer';
			document.querySelector('.liteoption').value='Réinitialiser';
		}
		if (langueaff=='anglais'){
			document.querySelectorAll('.gensmall')[0].innerHTML='Items marked with a * are required.';
			document.querySelectorAll('th.thHead')[1].innerHTML='Registration Information';
			if ((document.querySelectorAll('span.gen').length)==3){
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='Confirm password : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Confirmation code* :';
			}
			if ((document.querySelectorAll('span.gen').length)==4){
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 3].innerHTML='Username : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='E-mail address : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Password : *';
			}
			if ((document.querySelectorAll('span.gen').length)==5){
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('obligatoires')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">You must fill in the required fields.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('adresse')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Sorry, but this e-mail address is invalid.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('de passe doit être composé au minimum ')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Your password must be at least 6 characters long and must not exceed 25 characters.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('utilisateur')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Sorry, but this username has already been taken.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('sont différents.')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">The passwords you entered did not match.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('code de confirmation')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">The confirmation code you entered is incorrect.</span>';
				}
				if (document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].firstChild.textContent.contains('consignes de sécurité')) {
					document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 4].innerHTML='<span style="color:red">Your password is too simple. <strong>Try using a more complex password.  </strong><br>We recommend using a combination of numbers and letters in uppercase and lowercase to create a more secure password.  <br>If your password is still not complex enough, you will not be able to continue registering.</span>';
				}
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 3].innerHTML='Username : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 2].innerHTML='E-mail address : *';
				document.querySelectorAll('span.gen')[(document.querySelectorAll('span.gen').length) - 1].innerHTML='Password : *';
			}
			document.querySelector('.mainoption').value='Save';
			document.querySelector('.liteoption').value='Reset';
		}
	}
}, true);


