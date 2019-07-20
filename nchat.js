// ==UserScript==
// @name         NewChat for OWOP
// @author       Anonygold
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvwAADr8BOAVTJAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAmlJREFUaEPtmUGu00AMhnsl1pyBG7DjHuzZIcEFEEsOAhdgi4RYwqYnCP3H/Uaun2eqJq3kShnpe5nxeJzPSd6qh2VZDqehP6fp0taRgqP52vQ0+fvvx/Lt6weC5ZGrnM9rC7x/97Zdxe9fP0uCH66tgfMnciH/+dPHkvgmmnwzdw0gT1I1fBNylnhvYK38m1evN5PVHUETcpZ4bwB5iuo78zcBX4yYcj0+PyPmC18PRjG5ylniL/4HSFRRf9DHfS5r8v254/F4AfHsjK8HxHTVUycm5CzxFw0ICuka8UVYCwT9uVkD8Qz1JOpliWlOTMhZ4mkDgmRdI+Rwc13Br2cNMGft68EoJuQscUbfuIVYHBAbkZ3J6s+Qs6nb6BvZDSsxbYCkL9//DOGJxc9D+Cf6SKYNKCETB4qUbqA6m96AoFD2FmC0z9kt7A1QKBOE0T5nt3C1geqsfgMUyJ5sJOZx9h7sDXixETGPs/fgagPVWf0GBEX80+UJZ/MRMf8W9gaEl0Eim4+I+bdwtYHqrH4DFBg9ychojzpr2RuIMn7tGe1RZy1XG6jOXd+AZ7YnOL+VvYFMTsz2BOe3MmxAZAcqgaecTd1G33gW5GzqNvqGPqNH40XWImdTt9GC3CB7dfcmCoFvVGQ5Qs6mbqMFkc/+AcVsT8T9LF8xEYUgNhBzWcvZ1G30w9lNYbYn4n6Wr5jwUp6nb0CQE3P9Ws6mbqP/xOQPPgqEIMsZofyLn5jOo/0KQhOVkaNc5WzqNtpm9SaQ11zOpm6jJ9FERZCPDbQA3xdNVAQ/XOXeG3CB8gTfNi4WTzDOvofDf0o2T46RsEJfAAAAAElFTkSuQmCC
// @match        https://ourworldofpixels.com/*
// @version      v9.1
// @grant        none
// ==/UserScript==

(function () {

	let MenuKillerInterval, MyID, chatWindowWidthCutHalf, worldname, lastMessage, PublicTabName;
	let requestanimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, cancelanimation = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
	let tabsList = [], ifWidthIsAbove500 = () => !window.matchMedia('(max-width: 500px)').matches, isMobile = 'ontouchstart' in document.documentElement;
	let DOMContextMenu = false, isMaximized = false;
	let afterCloseRunFunction = () => {};
	let scrollingright = false, scrollingleft = false;
	let ContextMenuShown = false;
	let IDMenuShown = false;
	let TellMenuShown = false;
	let localstr = window.localStorage;
	let InputValues = {};
	let InputStringBefore = '', InputStringAfter = '';
	let ContextMenuInputStringBefore = '';
	let ContextMenuInputStringAfter = '';
	let isContextMenuClicked = false;
	let Unread = {};
	let Muted = [];
	let CloseableTabs = [];
	let AntiSwearWasToggled = false;
	let SelectedTab, SelectedTabID;
	let TempWindowX, TempWindowY;
	let hidePart = true;
	let isWindowPositionDefault = true;
	let isWindowSizeDefault = true;
	let isMinimized = true;
	let AntiSwearEnabled = false;

	let style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'NewChat';

	let Body = document.createElement('div');
	Body.id = 'NewChat-Body';
	Body.setAttribute('hidePart', true);

	let chatCounter = {};

	let $hts = true;
	let ContextMenuBoolean = true;

	let ChatWindow = document.createElement('div');
	ChatWindow.id = 'NewChat-Window';
	ChatWindow.setAttribute('minimized', 'true');
	ChatWindow.setAttribute('dragging', 'false');
	ChatWindow.setAttribute('Maximized', 'false');

	let Top = document.createElement('div');
	Top.id = 'NewChat-Top';

	Top.oncontextmenu = (eve) => {
		eve = eve || window.event;
		if (eve.preventDefault) eve.preventDefault();
		return false;
	};

	let Title = document.createElement('div');
	Title.id = 'NewChat-WindowTitle';
	Title.textContent = 'Chat';

	let TitleIcon = document.createElement('div');
	TitleIcon.id = 'NewChat-TitleIcon';

	let posX,
		posY,
		divTop,
		divLeft;

	let unreadelement = document.createElement('div');
	unreadelement.id = 'NewChat-Unread';

	let FlexTop = document.createElement('div');
	FlexTop.id = 'NewChat-FlexTop';

	let TabsContainer = document.createElement('div');
	TabsContainer.id = 'NewChat-TabsContainer';

	let TabsLeftBorder = document.createElement('div');
	TabsLeftBorder.id = 'NewChat-TabsLeftBorder';

	let Tabs = document.createElement('div');
	Tabs.id = 'NewChat-Tabs';

	let TabsRightBorder = document.createElement('div');
	TabsRightBorder.id = 'NewChat-TabsRightBorder';

	let Minimize = document.createElement('div');
	Minimize.id = 'NewChat-Minimize';

	let MaximizeRestore = document.createElement('div');
	MaximizeRestore.id = 'NewChat-Maximize';

	let MessagesContainer = document.createElement('div');
	MessagesContainer.id = 'NewChat-MessagesContainer';

	let Messages = document.createElement('div');
	Messages.id = 'NewChat-Messages';

	let TellToButton = document.createElement('div');
	TellToButton.id = 'NewChat-TellToButton';

	let TabInnerBorder = document.createElement('div');
	TabInnerBorder.id = 'NewChat-TabInnerBorder';

	TellToButton.appendChild(TabInnerBorder);

	let TellToIcon = document.createElement('div');
	TellToIcon.id = 'NewChat-TellToIcon';

	let FlexBottom = document.createElement('div');
	FlexBottom.id = 'NewChat-FlexBottom';

	let Input = document.createElement(typeof OWOP == 'undefined' ? 'textarea' : 'input');
	Input.id = 'NewChat-Input';
	Input.type = 'text';
	Input.draggable = false;
	Input.maxLength = '128';

	let ContextMenu = document.createElement('div');

	let ContextMenuBg = document.createElement('div');

	let Send = document.createElement('div');
	Send.id = 'NewChat-Send';
	Send.textContent = 'Send';

	let TabsLeftButton = document.createElement('div');
	TabsLeftButton.id = 'NewChat-TabsLeftButton';

	TabsLeftButton.addEventListener('mousedown', () => {
		scrollingright = false;
		scrollingleft = true;
	}, {
		passive: true
	});
	TabsLeftButton.addEventListener('touchstart', () => {
		scrollingright = false;
		scrollingleft = true;
	}, {
		passive: true
	});

	let TabsSpan = document.createElement('span');

	let GradientLeft = document.createElement('div');
	GradientLeft.id = 'NewChat-GradientLeft';

	let GradientRight = document.createElement('div');
	GradientRight.id = 'NewChat-GradientRight';

	let TabsRightButton = document.createElement('div');
	TabsRightButton.id = 'NewChat-TabsRightButton';

	TabsRightButton.addEventListener('mousedown', () => {
		scrollingright = true;
		scrollingleft = false;
	}, {
		passive: true
	});
	TabsRightButton.addEventListener('touchstart', () => {
		scrollingright = true;
		scrollingleft = false;
	}, {
		passive: true
	});

	let Minimized = document.createElement('div');
	Minimized.id = 'NewChat-Minimized';
	Minimized.style.display = '';

	let LastTabSpace = document.createElement('div');
	LastTabSpace.id = 'NewChat-LastTabSpace';

	let ChatTooltip = document.createElement('div');
	ChatTooltip.id = 'NewChat-ChatTooltip';
	ChatTooltip.textContent = 'Chat';

	let TellTo = document.createElement('div');
	TellTo.id = 'NewChat-TellTo';

	let TellToMenu = document.createElement('div');
	TellToMenu.id = `NewChat-TellToMenu${isMobile ? 'Mobile' : ''}`;
	TellToMenu.innerHTML = 'Tell to: ';
	TellToMenu.style.display = 'none';
	
	let TellToMenuBg = document.createElement('div');
	if (isMobile) TellToMenuBg.id = 'NewChat-TellToMenuBg';

	let TellToInput = document.createElement('input');
	TellToInput.id = 'NewChat-TellToInput';
	TellToInput.type = 'text';
	TellToInput.placeholder = 'ID';

	let RemoveRedBorderOnTellToInput = () => {
		if (TellToInput.id == 'NewChat-TellToInputError') TellToInput.id = 'NewChat-TellToInput';
	};

	TellToInput.addEventListener('input', () => {
		let newValue = TellToInput.value.replace(/[^\d]/ig, '');
		TellToInput.value = TellToInput.value == '' ? '' : TellToInput.value < 1 ? 1 : newValue;
		if (TellToInput.value > 0 || TellToInput.value !== '') RemoveRedBorderOnTellToInput();
	});

	TellToInput.addEventListener('mousedown', RemoveRedBorderOnTellToInput, {
		passive: true
	});
	TellToInput.addEventListener('touchstart', RemoveRedBorderOnTellToInput, {
		passive: true
	});

	let TellToIDListButton = document.createElement('div');
	TellToIDListButton.id = 'NewChat-TellToIDButton';
	if (isMobile) TellToIDListButton.innerHTML = 'List of cursors online...';

	let TellToGo = document.createElement('div');
	TellToGo.id = 'NewChat-TellToGo';
	if (isMobile) TellToGo.innerHTML = 'Go';

	let TellToLine = document.createElement('div');
	if (isMobile) TellToLine.id = 'NewChat-TellToLine';

	let ResizeBottom = document.createElement('div');
	ResizeBottom.id = 'NewChat-ResizeBottom';

	let ResizerX, ResizerY, ResizerWidth, ResizerHeight;

	let ResizeRight = document.createElement('div');
	ResizeRight.id = 'NewChat-ResizeRight';

	let ResizeBottomRight = document.createElement('div');
	ResizeBottomRight.id = 'NewChat-ResizeBottomRight';

	let doResizeBottom = function (ev) {
		let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
		ChatWindow.style.height = `${ResizerHeight + ev.clientY - ResizerY}px`;
		isWindowSizeDefault = false;
		if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
	};
	let doResizeRight = function (ev) {
		ChatWindow.style.width = `${ResizerWidth + ev.clientX - ResizerX}px`;
		isWindowSizeDefault = false;
	};
	let doResizeBottomRight = function (ev) {
		let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
		ChatWindow.style.width = `${ResizerWidth + ev.clientX - ResizerX}px`;
		ChatWindow.style.height = `${ResizerHeight + ev.clientY - ResizerY}px`;
		isWindowSizeDefault = false;
		if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
	};

	let stopResize = () => {
		document.documentElement.removeEventListener('mousemove', doResizeBottom, false);
		document.documentElement.removeEventListener('mousemove', doResizeRight, false);
		document.documentElement.removeEventListener('mousemove', doResizeBottomRight, false);
		document.documentElement.removeEventListener('mouseup', stopResize, false);
		document.documentElement.removeEventListener('touchmove', doResizeBottom, false);
		document.documentElement.removeEventListener('touchmove', doResizeRight, false);
		document.documentElement.removeEventListener('touchmove', doResizeBottomRight, false);
		document.documentElement.removeEventListener('touchend', stopResize, false);
		ChatWindow.setAttribute('dragging', 'false');
	};
	let initResize = function (ev) {
		ev = ev || window.event;
		ResizerX = ev.clientX;
		ResizerY = ev.clientY;
		ResizerWidth = parseInt(document.defaultView.getComputedStyle(ChatWindow).width, 10);
		ResizerHeight = parseInt(document.defaultView.getComputedStyle(ChatWindow).height, 10);
		ChatWindow.setAttribute('dragging', 'true');
		chatWindowWidthCutHalf = 50 / 100 * ChatWindow.offsetWidth;
		document.documentElement.addEventListener('mousemove', this.id == 'NewChat-ResizeBottom' ? doResizeBottom : this.id == 'NewChat-ResizeRight' ? doResizeRight : this.id == 'NewChat-ResizeBottomRight' ? doResizeBottomRight : null, false);
		document.documentElement.addEventListener('touchmove', this.id == 'NewChat-ResizeBottom' ? doResizeBottom : this.id == 'NewChat-ResizeRight' ? doResizeRight : this.id == 'NewChat-ResizeBottomRight' ? doResizeBottomRight : null, false);
		document.documentElement.addEventListener('mouseup', stopResize, false);
		document.documentElement.addEventListener('touchend', stopResize, false);
	};

	ResizeBottom.addEventListener('mousedown', initResize, false);
	ResizeRight.addEventListener('mousedown', initResize, false);
	ResizeBottomRight.addEventListener('mousedown', initResize, false);
	ResizeBottom.addEventListener('touchstart', initResize, {
		passive: true
	});
	ResizeRight.addEventListener('touchstart', initResize, {
		passive: true
	});
	ResizeBottomRight.addEventListener('touchstart', initResize, {
		passive: true
	});

	let clearTab = (tab) => {
		chatCounter[tab] = 0;
		for (let i = 0; i < tabsList.length; i++) {
			if (tabsList[i] == tab) {
				Messages.childNodes[i].innerHTML = '';
				let e = document.createElement('div');
				e.id = 'NewChat-EmptyTabMessage';
				e.textContent = 'There\'s no available messages on this tab.';
				Messages.childNodes[i].appendChild(e);
			}
		}
	};

	let clearAll = () => {
		chatCounter = {};
		for (let i = 0; i < tabsList.length; i++) {
			Messages.childNodes[i].innerHTML = '';
			let e = document.createElement('div');
			e.id = 'NewChat-EmptyTabMessage';
			e.textContent = 'There\'s no available messages on this tab.';
			Messages.childNodes[i].appendChild(e);
		}
	};

	let ClearUnreadTab = (tab) => {
		for (let i = 0; i < Object.keys(Unread).length; i++) if (Object.keys(Unread)[i] == tab) Unread[Object.keys(Unread)[i]] = 0;
	};

	let UpdateUnread = () => {
		let unreadMsg = 0;
		for (let i = 0; i < Object.keys(Unread).length; i++) unreadMsg = unreadMsg + Number(Unread[Object.keys(Unread)[i]]);
		if (unreadMsg > 0) Minimized.appendChild(unreadelement);
		ChatTooltip.textContent = `Chat${unreadMsg > 0 ? ` (${unreadMsg} unread message${unreadMsg !== 1 ? 's' : ''})` : ''}`;
		unreadelement.setAttribute('data-num', unreadMsg);
		unreadelement.textContent = unreadMsg < 100 ? unreadMsg : '99+';
		unreadelement.setAttribute('data-more-than-99', unreadMsg < 100 ? 'false' : 'true');
		if (unreadMsg < 1 && Minimized.contains(unreadelement)) Minimized.removeChild(unreadelement);
	};

	let areTabsUnread = () => {
		let unreadMsg = 0;
		for (let i = 0; i < Object.keys(Unread).length; i++) unreadMsg = unreadMsg + Number(Unread[Object.keys(Unread)[i]]);
		return unreadMsg > 0 ? true : false;
	};

	let ClearAllUnreadTabs = () => {
		for (let i = 0; i < Object.keys(Unread).length; i++) Unread[Object.keys(Unread)[i]] = 0;
	};

	PublicTabName = 'Public';

	let mainworldfilter = ['eldit', 'infraraven', 'kit', '5h1t', '5hit', 'a55', 'anal', 'anus', 'ar5e', 'arrse', 'arse', 'ass', 'ass-fucker', 'asses', 'assfucker', 'assfukka', 'asshole', 'assholes', 'asswhole', 'a_s_s', 'b00bs', 'b17ch', 'b1tch', 'ballbag', 'balls', 'ballsack', 'bastard', 'beastial', 'beastiality', 'bellend', 'bestial', 'bestiality', 'bi&plus;ch', 'biatch', 'bitch', 'bitcher', 'bitchers', 'bitches', 'bitchin', 'bitching', 'bloody', 'blowjob', 'blowjobs', 'boiolas', 'bollock', 'bollok', 'boner', 'boob', 'boobs', 'booobs', 'boooobs', 'booooobs', 'breasts', 'buceta', 'bugger', 'bum', 'butt', 'butthole', 'buttmuch', 'buttplug', 'c0ck', 'c0cksucker', 'cawk', 'chink', 'cipa', 'cl1t', 'clit', 'clitoris', 'clits', 'cnut', 'cock', 'cock-sucker', 'cockface', 'cockhead', 'cockmunch', 'cockmuncher', 'cocks', 'cocksuck', 'cocksucked', 'cocksucker', 'cocksucking', 'cocksucks', 'cocksuka', 'cocksukka', 'cok', 'cokmuncher', 'coksucka', 'coon', 'cox', 'cum', 'cummer', 'cumming', 'cums', 'cumshot', 'cunilingus', 'cunillingus', 'cunnilingus', 'cunt', 'cuntlick', 'cuntlicker', 'cuntlicking', 'cunts', 'cyalis', 'cyberfuc', 'cyberfuck', 'cyberfucked', 'cyberfucker', 'cyberfuckers', 'cyberfucking', 'd1ck', 'damn', 'dick', 'dickhead', 'dildo', 'dildos', 'dink', 'dinks', 'dirsa', 'dlck', 'doggin', 'dogging', 'donkeyribber', 'doosh', 'duche', 'dyke', 'ejaculate', 'ejaculated', 'ejaculates', 'ejaculating', 'ejaculatings', 'ejaculation', 'ejakulate', 'f4nny', 'fag', 'fagging', 'faggitt', 'faggot', 'faggs', 'fagot', 'fagots', 'fags', 'fanny', 'fannyflaps', 'fannyfucker', 'fanyy', 'fatass', 'fcuk', 'fcuker', 'fcuking', 'feck', 'fecker', 'felching', 'fellate', 'fellatio', 'fingerfuck', 'fingerfucked', 'fingerfucker', 'fingerfuckers', 'fingerfucking', 'fingerfucks', 'fistfuck', 'fistfucked', 'fistfucker', 'fistfuckers', 'fistfucking', 'fistfuckings', 'fistfucks', 'flange', 'fook', 'fooker', 'fuck', 'fucka', 'fucked', 'fucker', 'fuckers', 'fuckhead', 'fuckheads', 'fuckin', 'fucking', 'fuckings', 'fuckingshitmotherfucker', 'fuckme', 'fucks', 'fuckwhit', 'fuckwit', 'fudgepacker', 'fuk', 'fuker', 'fukker', 'fukkin', 'fuks', 'fukwhit', 'fukwit', 'fux', 'fux0r', 'f_u_c_k', 'gangbang', 'gangbanged', 'gangbangs', 'gaylord', 'gaysex', 'goatse', 'hardcoresex', 'heshe', 'hoar', 'hoare', 'hoer', 'homo', 'hore', 'horniest', 'horny', 'hotsex', 'jackoff', 'jap', 'jism', 'jiz', 'jizm', 'jizz', 'kawk', 'knob', 'knobead', 'knobed', 'knobend', 'knobhead', 'knobjocky', 'knobjokey', 'kock', 'kondum', 'kondums', 'kum', 'kummer', 'kumming', 'kums', 'kunilingus', 'l3i&plus;ch', 'l3itch', 'labia', 'lmfao', 'lust', 'lusting', 'm0f0', 'm0fo', 'm45terbate', 'ma5terb8', 'ma5terbate', 'masochist', 'masterb8', 'masterbat*', 'masterbat3', 'masterbate', 'masterbation', 'masterbations', 'masturbate', 'mof0', 'mofo', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz', 'mothafucked', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking', 'mothafuckings', 'mothafucks', 'mother fucker', 'motherfuck', 'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfuckka', 'motherfucks', 'muff', 'mutha', 'muthafecker', 'muthafuckker', 'muther', 'mutherfucker', 'n1gga', 'n1gger', 'nazi', 'nigg3r', 'nigg4h', 'nigga', 'niggah', 'niggas', 'niggaz', 'nigger', 'niggers', 'nob', 'nobhead', 'nobjocky', 'nobjokey', 'numbnuts', 'nutsack', 'orgasim', 'orgasims', 'orgasm', 'orgasms', 'p0rn', 'pawn', 'pecker', 'penis', 'penisfucker', 'phonesex', 'phuck', 'phuk', 'phuked', 'phuking', 'phukked', 'phukking', 'phuks', 'phuq', 'pigfucker', 'pimpis', 'piss', 'pissed', 'pisser', 'pissers', 'pisses', 'pissflaps', 'pissin', 'pissing', 'pissoff', 'poop', 'porn', 'porno', 'pornography', 'pornos', 'prick', 'pricks', 'pron', 'pube', 'pusse', 'pussi', 'pussies', 'pussy', 'pussys', 'rectum', 'retard', 'rimjaw', 'rimming', 'sadist', 'schlong', 'screwing', 'scroat', 'scrote', 'scrotum', 'semen', 'sex', 'sh1t', 'shag', 'shagger', 'shaggin', 'shagging', 'shemale', 'shi&plus;', 'shit', 'shitdick', 'shite', 'shited', 'shitey', 'shitfuck', 'shitfull', 'shithead', 'shiting', 'shitings', 'shits', 'shitted', 'shitter', 'shitters', 'shitting', 'shittings', 'shitty', 'skank', 'slut', 'sluts', 'smegma', 'smut', 'snatch', 'spac', 'spunk', 's_h_i_t', 't1tt1e5', 't1tties', 'teets', 'teez', 'testical', 'testicle', 'tit', 'titfuck', 'tits', 'titt', 'tittie5', 'tittiefucker', 'titties', 'tittyfuck', 'tittywank', 'titwank', 'tosser', 'turd', 'tw4t', 'twat', 'twathead', 'twatty', 'twunt', 'twunter', 'v14gra', 'v1gra', 'vagina', 'viagra', 'vulva', 'w00se', 'wang', 'wank', 'wanker', 'wanky', 'whoar', 'whore', 'willies', 'willy', 'xrated', 'xxx']; // OWOP antiswear

	let re_weburl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i; //dperini's regex url - https://gist.github.com/dperini/729294

	let newChatAntiSwear = (m) => {
		return AntiSwearEnabled ? m.replace( /* OWOP antiswear (edited) */ /\b\w+\b/g, w => mainworldfilter.indexOf(w.toLowerCase()) !== -1 ? `<s>${w}</s>` : w) : m;
	};

	let WaitUntilOWOPExists = function () {

		if (typeof OWOP !== 'undefined') {
			
			let IDlist = [];
			Body.appendChild(ChatWindow);

			let oldChat = document.getElementById('chat');
			let oldChatMessages = document.getElementById('chat-messages');
			let oldDevChat = document.getElementById('dev-chat');
			let oldDevChatMessages = document.getElementById('dev-chat-messages');
			let oldChatInput = document.getElementById('chat-input');
			let paletteElement = document.getElementById('palette');
			let xyDisplayElement = document.getElementById('xy-display');
			let playerCountDisplayElement = document.getElementById('playercount-display');
			let canvasElement = document.getElementById('animations');
			let helpWindowContent = document.querySelector('#help .content');

			let minimizeWindow = () => {
				let unreadMsg = 0;
				for (let i = 0; i < Object.keys(Unread).length; i++) {
					unreadMsg = unreadMsg + Number(Unread[Object.keys(Unread)[i]]);
				}
				if (ChatWindow.style.left == '') TempWindowX = undefined;
				else TempWindowX = ChatWindow.style.left;
				if (ChatWindow.style.top == '') TempWindowY = undefined;
				else TempWindowY = ChatWindow.style.top;
				ChatWindow.style.left = '';
				if (!isWindowPositionDefault || isMaximized) ChatWindow.style.top = `${window.innerHeight - 120}px`;
				else ChatWindow.style.top = '';
				ChatWindow.setAttribute('minimized', 'true');
				if (isMaximized) {
					if (xyDisplayElement.style.display == 'none') xyDisplayElement.style.display = '';
					if (playerCountDisplayElement.style.display == 'none') playerCountDisplayElement.style.display = '';
					if (canvasElement.style.display == 'none') canvasElement.style.display = '';
				}
				Minimized.style.pointerEvents = 'auto';
				Minimized.style.opacity = '1';
				isMinimized = true;
				let containsunread = false;
				for (let i = 0; i < Minimized.childNodes.length; i++) {
					if (Minimized.childNodes[i].id == 'NewChat-Unread') containsunread = true;
				}
				if (!containsunread && unreadMsg !== 0) {
					unreadelement.setAttribute('data-num', unreadMsg);
					Minimized.appendChild(unreadelement);
				} else if (containsunread && unreadMsg !== 0) unreadelement.setAttribute('data-num', unreadMsg);
				if (containsunread) {
					unreadelement.textContent = unreadMsg < 100 ? unreadMsg : '99+';
					unreadelement.setAttribute('data-more-than-99', unreadMsg < 100 ? 'false' : 'true');
				}
				ChatTooltip.textContent = `Chat (${unreadMsg} unread message${unreadMsg !== 1 ? 's)' : ')'}`;
				if (unreadMsg == 0) ChatTooltip.textContent = 'Chat';
				if (unreadMsg == 0 && containsunread) Minimized.removeChild(unreadelement);
			};
			let restoreWindow = () => {
				ChatWindow.setAttribute('minimized', 'false');
				if (TempWindowX !== undefined) ChatWindow.style.left = TempWindowX;
				else ChatWindow.style.left = '';
				if (TempWindowY !== undefined) ChatWindow.style.top = TempWindowY;
				else ChatWindow.style.top = '';
				Minimized.style.pointerEvents = 'none';
				Minimized.style.opacity = 0;
				isMinimized = false;
				Messages.scrollTop = Messages.scrollHeight;
				if (window.getSelection) window.getSelection().removeAllRanges();
				else if (document.selection) document.selection.empty();
				for (let i = 0; i < Object.keys(Unread).length; i++) {
					if (Object.keys(Unread)[i] == SelectedTab) Unread[Object.keys(Unread)[i]] = 0;
				}
				if (parseFloat(ChatWindow.style.top) > window.innerHeight - 30) {
					if (!isMinimized && !isMaximized) ChatWindow.style.top = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
					TempWindowY = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
				}
				if (parseFloat(ChatWindow.style.left) > window.innerWidth - 30) {
					if (!isMinimized && !isMaximized) ChatWindow.style.left = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
					TempWindowY = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
				}
			};

			let isMinimizeClicked = false;
		
			let isMaximizeRestoreClicked = false;
		
			MaximizeRestore.onmousedown = () => isMaximizeRestoreClicked = true;
		
			MaximizeRestore.ontouchstart = () => isMaximizeRestoreClicked = true;
		
			Minimized.onclick = (e) => {
				e = e || window.event;
				if (e.preventDefault) e.preventDefault();
				return false;
			};
			
			Minimized.addEventListener('mouseup', (e) => {
				e = e || window.event;
				let eve = e.button;
				let eve2 = e.which;
				if (eve == 0 || eve2 == 1) restoreWindow();
			}, {
				passive: true
			});
		
			Minimized.ontouchend = restoreWindow;
		
			Minimize.onmousedown = () => isMinimizeClicked = true;
		
			Minimize.ontouchstart = () => isMinimizeClicked = true;
		
			Minimize.onmouseup = (e) => {
				e = e || window.event;
				let eve = e.button;
				let eve2 = e.which;
				if ((eve == 0 || eve2 == 1) && isMinimizeClicked) minimizeWindow();
				isMinimizeClicked = false;
			};
		
			Minimize.ontouchend = () => {
				if (isMinimizeClicked) minimizeWindow();
				isMinimizeClicked = false;
			};

			let MaximizeFunct = () => {
				let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
				ChatWindow.setAttribute('dragging', 'true');
				chatWindowWidthCutHalf = 50 / 100 * ChatWindow.offsetWidth;
				isMaximized = true;
				MaximizeRestore.id = 'NewChat-Restore';
				ChatWindow.setAttribute('Maximized', true);
				window.setTimeout(() => {
					if (parseFloat(ChatWindow.style.top) > window.innerHeight - 30) {
						if (!isMinimized && !isMaximized) ChatWindow.style.top = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
						TempWindowY = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
					}
					if (parseFloat(ChatWindow.style.left) > window.innerWidth - 30) {
						if (!isMinimized && !isMaximized) ChatWindow.style.left = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
						TempWindowY = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
					}
					ChatWindow.setAttribute('dragging', 'false');
				}, 100);
				if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
			};
		
			let restoreMaximizedWindow = () => {
				let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
				ChatWindow.setAttribute('dragging', 'true');
				isMaximized = false;
				MaximizeRestore.id = 'NewChat-Maximize';
				ChatWindow.setAttribute('Maximized', false);
				window.setTimeout(() => {
					if (parseFloat(ChatWindow.style.top) > window.innerHeight - 30) {
						if (!isMinimized && !isMaximized) ChatWindow.style.top = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
						TempWindowY = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
					}
					if (parseFloat(ChatWindow.style.left) > window.innerWidth - 30) {
						if (!isMinimized && !isMaximized) ChatWindow.style.left = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
						TempWindowY = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
					}
					ChatWindow.setAttribute('dragging', 'false');
				}, 100);
				if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
			};
		
			MaximizeRestore.onmouseup = (e) => {
				e = e || window.event;
				let eve = e.button;
				let eve2 = e.which;
				if ((eve == 0 || eve2 == 1) && isMaximizeRestoreClicked) if (isMaximized) restoreMaximizedWindow(); else MaximizeFunct();
				isMaximizeRestoreClicked = false;
			};
		
			MaximizeRestore.ontouchend = () => {
				if (isMaximizeRestoreClicked) if (isMaximized) restoreMaximizedWindow(); else MaximizeFunct();
				isMaximizeRestoreClicked = false;
			};

			let TellToButtonFunct = (eve) => {
				eve = eve || window.event;
				if (eve.preventDefault) eve.preventDefault();
				if (eve.stopPropagation) eve.stopPropagation();
				$hts = true;
				TellToButton.id = `NewChat-TellToButton${TellMenuShown ? '' : 'Clicked'}`;
				TellToMenu.style.display = TellMenuShown ? 'none' : 'block';
				TellToMenu.style.opacity = 0;
				if (isMobile) TellToMenuBg.style.display = TellMenuShown ? 'none' : 'block';
				if (isMobile) TellToMenuBg.style.opacity = 0;
				let height = TellToMenu.offsetHeight + 2;
				let Opacity = 0;
				if (!TellMenuShown) {
					let fadeIn = () => {
						if (Opacity >= 1 || !ContextMenuBoolean) {
							if (!isMobile) TellToMenu.style.height = '';
							TellToMenu.style.height = '';
							TellToMenu.style.opacity = 1;
							if (isMobile) TellToMenuBg.style.opacity = .5;
							TellToMenu.style.pointerEvents = '';
							cancelanimation(fadeIn);
						} else {
							if (!isMobile && Opacity * height < height - 13) TellToMenu.style.height = `${Opacity * height}px`;
							TellToMenu.scrollTop = TellToMenu.scrollHeight;
							TellToMenu.style.opacity = Opacity;
							if (isMobile) TellToMenuBg.style.opacity = Opacity * .5;
							if (Opacity <= height) Opacity += .1;
							requestanimation(fadeIn);
						}
					};
					if (typeof requestanimation == 'function') requestanimation(fadeIn); else {
						let MenuKillerInterval = window.setInterval(() => {
							if (Opacity >= 1) {
								clearInterval(MenuKillerInterval);
								if (!isMobile) TellToMenu.style.height = '';
								TellToMenu.style.opacity = 1;
								if (isMobile) TellToMenuBg.style.opacity = .5;
								TellToMenu.style.pointerEvents = '';
							} else {
								if (!isMobile && Opacity * height < height - 15) TellToMenu.style.height = `${Opacity * height}px`;
								TellToMenu.scrollTop = TellToMenu.scrollHeight;
								TellToMenu.style.opacity = Opacity;
								if (isMobile) TellToMenuBg.style.opacity = Opacity * .5;
							}
							Opacity += .023;
						}, 1);
					}
				}
				TellToInput[TellMenuShown ? 'blur' : 'focus']();
				oldDevChat.className = document.activeElement.id == 'NewChat-Input' && document.activeElement.value == '' ? '' : 'active selectable';
				TellToInput.value = '';
				if (TellMenuShown) {
					TellMenuShown = false;
					clearInterval(MenuKillerInterval);
					$hts = false;
				} else TellMenuShown = true;
			};
		
			TellToButton.addEventListener('click', TellToButtonFunct);
			TellToButton.addEventListener('contextmenu', TellToButtonFunct);

			let ContextMenuElements = {
				'HTML': {
					'resetWindow': function (textContextChange = 'Reset window size and position') {
						let resetWindow = document.createElement('div');
						resetWindow.id = 'NewChat-ContextMenuButton';
						resetWindow.textContent = textContextChange;
						if (!isWindowPositionDefault || !isWindowSizeDefault) {
							resetWindow.onclick = function () {
								ChatWindow.setAttribute('dragging', 'true');
								let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
								isWindowSizeDefault = true;
								isWindowPositionDefault = true;
								ChatWindow.style.right = '';
								ChatWindow.style.bottom = '';
								ChatWindow.style.top = '';
								ChatWindow.style.left = '';
								ChatWindow.style.height = '';
								ChatWindow.style.width = '';
								if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
								TempWindowX = undefined;
								TempWindowY = undefined;
								ContextMenuBoolean = false;
								window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 40);
							};
						} else resetWindow.setAttribute('disabled', true);
						return {
							'resetWindow': resetWindow
						};
					},
					'resetWindowSize': function (textContextChange = 'Reset window size') {
						let resetWindowSize = document.createElement('div');
						resetWindowSize.id = 'NewChat-ContextMenuButton';
						resetWindowSize.textContent = textContextChange;
						if (!isWindowSizeDefault) {
							resetWindowSize.onclick = function () {
								let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
								isWindowSizeDefault = true;
								ChatWindow.style.height = '';
								ChatWindow.style.width = '';
								if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
								ContextMenuBoolean = false;
							};
						} else resetWindowSize.setAttribute('disabled', true);
						return {
							'resetWindowSize': resetWindowSize
						};
					},
					'resetWindowPosition': function (textContextChange = 'Reset window position') {
						let resetWindowPosition = document.createElement('div');
						resetWindowPosition.id = 'NewChat-ContextMenuButton';
						resetWindowPosition.textContent = textContextChange;
						if (!isWindowPositionDefault) {
							resetWindowPosition.onclick = function () {
								ChatWindow.setAttribute('dragging', 'true');
								isWindowPositionDefault = true;
								ChatWindow.style.right = '';
								ChatWindow.style.bottom = '';
								ChatWindow.style.top = '';
								ChatWindow.style.left = '';
								TempWindowX = undefined;
								TempWindowY = undefined;
								ContextMenuBoolean = false;
								window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 40);
							};
						} else resetWindowPosition.setAttribute('disabled', true);
						return {
							'resetWindowPosition': resetWindowPosition
						};
					},
					'markAllAsRead': function (textContextChange = 'Mark all tabs as read') {
						let markAllAsRead = document.createElement('div');
						markAllAsRead.id = 'NewChat-ContextMenuButton';
						markAllAsRead.textContent = textContextChange;
						if (areTabsUnread()) {
							markAllAsRead.onclick = function () {
								ClearAllUnreadTabs();
								UpdateUnread();
								for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') TabsSpan.children[i].children[1].style.display = 'none';
								ContextMenuBoolean = false;
							};
						} else markAllAsRead.setAttribute('disabled', true);
						return {
							'markAllAsRead': markAllAsRead
						};
					},
					'moveToFirst': function (textContextChange = 'Move to first', TabName = PublicTabName) {
						let moveToFirst = document.createElement('div');
						moveToFirst.id = 'NewChat-ContextMenuButtonWithIcon';
						moveToFirst.innerHTML = `<div id="NewChat-ContextMenuIcon" class="moveToFirst"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						ContextMenu.appendChild(moveToFirst);
						if (TabsSpan.firstChild.children[2].innerHTML !== TabName) {
							moveToFirst.onclick = function () {
								for (let i = 0; i < TabsSpan.childNodes.length; i++) {
									if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) TabsSpan.insertAdjacentElement('afterbegin', TabsSpan.childNodes[i]);
								}
								ContextMenuBoolean = false;
							};
						} else moveToFirst.setAttribute('disabled', true);
						return {
							'moveToFirst': moveToFirst
						};
					},
					'moveToLast': function (textContextChange = 'Move to last', TabName = PublicTabName) {
						let moveToLast = document.createElement('div');
						moveToLast.id = 'NewChat-ContextMenuButtonWithIcon';
						moveToLast.innerHTML = `<div id="NewChat-ContextMenuIcon" class="moveToLast"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						ContextMenu.appendChild(moveToLast);
						if (TabsSpan.childNodes[TabsSpan.childNodes.length - 5].children[2].innerHTML !== TabName) {
							moveToLast.onclick = function () {
								for (let i = 0; i < TabsSpan.childNodes.length; i++) {
									if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
										if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
											TabsSpan.appendChild(TabsSpan.childNodes[i]);
											TabsSpan.appendChild(TellToButton);
											TabsSpan.appendChild(LastTabSpace);
											TabsSpan.appendChild(GradientLeft);
											TabsSpan.appendChild(GradientRight);
										}
									}
								}
								ContextMenuBoolean = false;
							};
						} else moveToLast.setAttribute('disabled', true);
						return {
							'moveToLast': moveToLast
						};
					},
					'MarkAsRead': function (textContextChange = 'Mark as read', TabName = PublicTabName) {
						let MarkAsRead = document.createElement('div');
						MarkAsRead.id = 'NewChat-ContextMenuButton';
						MarkAsRead.textContent = textContextChange;
						for (let i = 0; i < TabsSpan.childNodes.length; i++) {
							if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
								if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
									if (TabsSpan.childNodes[i].childNodes[1].style.display !== 'none') {
										MarkAsRead.onclick = function () {
											TabsSpan.childNodes[i].childNodes[1].style.display = 'none';
											Unread[TabName] = 0;
											UpdateUnread();
											ContextMenuBoolean = false;
										};
									} else MarkAsRead.setAttribute('disabled', true);
								}
							}
						}
						return {
							'MarkAsRead': MarkAsRead
						};
					},
					'Close': function (textContextChange = 'Close', TabName = PublicTabName) {
						let close = document.createElement('div');
						close.id = 'NewChat-ContextMenuButtonWithIcon';
						close.innerHTML = `<div id="NewChat-ContextMenuIcon" class="Close"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						ContextMenu.appendChild(close);
						if (isTabCloseable(TabName)) {
							close.onclick = function () {
								for (let i = 0; i < TabsSpan.childNodes.length; i++) {
									if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
										if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
											if (SelectedTab == TabName) selectTab(PublicTabName in tabsList ? PublicTabName : tabsList[0]);
											closeTab(TabName);
											ContextMenuBoolean = false;
										}
									}
								}
							};
						} else close.setAttribute('disabled', true);
						return {
							'Close': close
						};
					},
					'Mute': function (id = Math.round(Math.random() * 1000), textContextChange = '') {
						let mute = document.createElement('div');
						mute.id = 'NewChat-ContextMenuButton';
						mute.textContent = textContextChange == '' ? `${Muted.indexOf(`<div id="NewChat-UserTabIcon"></div>${id}`) > -1 ? 'Unm' : 'M'}ute ${id}` : textContextChange;
						mute.onclick = function () {
							if (Muted.indexOf(id) < 0) Muted.push(id); else {
								for (let i = Muted.length - 1; i >= 0; i--) {
									if (Muted[i] == id) {
										Muted.splice(i, 1);
										break;
									}
								}
							}
							IDMenuShown = false;
							ContextMenuBoolean = false;
							chatLocal(`${Muted.indexOf(id) > -1 ? 'M' : 'Unm'}uted ${id}`);
						};
						return {
							'Mute': mute
						};
					},
					'TellToInput': function (nick = Math.round(Math.random() * 1000)) {
						let TellToInput = document.createElement('input');
						TellToInput.type = 'text';
						TellToInput.id = 'NewChat-ContextMenuInput';
						TellToInput.className = 'ContextMenuTellTo';
						TellToInput.maxLength = (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - 7 - nick.split('] ')[0].slice((nick.indexOf('[') == 0) ? 1 : 0).length;
						TellToInput.placeholder = `Tell to ${nick.split('] ')[0].slice((nick.indexOf('[') == 0) ? 1 : 0)}`;
						return {
							'TellToInput': TellToInput
						};
					},
					'InputTab': function (StringBefore = '', StringAfter = '', Placeholder = '') {
						let InputTab = document.createElement('input');
						InputTab.type = 'text';
						InputTab.id = 'NewChat-ContextMenuInput';
						InputTab.className = 'ContextMenuInputTab';
						InputTab.maxLength = (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - StringBefore.length - StringAfter.length;
						InputTab.placeholder = Placeholder;
						return {
							'InputTab': InputTab
						};
					},
					'MinimizeWindow': function (textContextChange = 'Minimize', bool = !isMinimized) {
						let MinimizeWindow = document.createElement('div');
						MinimizeWindow.innerHTML = `<div id="NewChat-ContextMenuIcon" class="MinimizeWindow"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						MinimizeWindow.id = 'NewChat-ContextMenuButtonWithIcon';
						if (bool) {
							MinimizeWindow.onclick = function () {
								minimizeWindow();
								ContextMenuBoolean = false;
							};
						} else MinimizeWindow.setAttribute('disabled', true);
						return {
							'MinimizeWindow': MinimizeWindow
						};
					},
					'RestoreWindow': function (textContextChange = 'Restore', bool = isMinimized || isMaximized) {
						let RestoreWindow = document.createElement('div');
						RestoreWindow.innerHTML = `<div id="NewChat-ContextMenuIcon" class="RestoreWindow"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						RestoreWindow.id = 'NewChat-ContextMenuButtonWithIcon';
						if (bool) {
							RestoreWindow.onclick = function () {
								if (isMinimized) restoreWindow(); else if (isMaximized) restoreMaximizedWindow();
								ContextMenuBoolean = false;
							};
						} else RestoreWindow.setAttribute('disabled', true);
						return {
							'RestoreWindow': RestoreWindow
						};
					},
					'MaximizeWindow': function (textContextChange = 'Maximize', bool = !isMaximized) {
						let MaximizeWindow = document.createElement('div');
						MaximizeWindow.innerHTML = `<div id="NewChat-ContextMenuIcon" class="MaximizeWindow"></div>${textContextChange.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
						MaximizeWindow.id = 'NewChat-ContextMenuButtonWithIcon';
						if (bool) {
							MaximizeWindow.onclick = function () {
								if (isMinimized) restoreWindow(); 
								MaximizeFunct();
								ContextMenuBoolean = false;
							};
						} else MaximizeWindow.setAttribute('disabled', true);
						return {
							'MaximizeWindow': MaximizeWindow
						};
					},
					'Cursor': function (textContextChange = '', ID = Math.round(Math.random() * 1000), type = 0) {
						let Cursor = document.createElement('div');
						Cursor.innerHTML = `<div id="NewChat-ContextMenuIcon" class="Cursor"></div>${textContextChange == '' ? ID : textContextChange}`;
						Cursor.id = 'NewChat-ContextMenuButtonWithIcon';
						Cursor.onclick = function () {
							if (tabsList.indexOf(`<div id="NewChat-UserTabIcon"></div>${ID}`) < 0) if (type == 0) {
								TellToInput.value = ID;
								if (TellToInput.id == 'NewChat-TellToInputError') TellToInput.id = 'NewChat-TellToInput';
								TellToInput.focus();
							} else if (type == 1) newTab(`<div id="NewChat-UserTabIcon"></div>${ID}`, true, `/tell ${ID} `, '', `Tell to ${ID}`, true);
							ContextMenuBoolean = false;
							if (type == 1) $hts = false;
						};
						return {
							'Cursor': Cursor
						};
					},
					'line': function () {
						let line = document.createElement('div');
						line.id = 'NewChat-ContextMenuLine';
						return {
							'line': line
						};
					}
				},
				'JSON': {
					'resetWindow': function (textContextChange = 'Reset window size and position') {
						let e = !isWindowPositionDefault || !isWindowSizeDefault;
						return {
							'resetWindow': {
								'type': 'button',
								'textcontent': textContextChange,
								'disabled': !e,
								'onclick': function () {
									if (e) {
										ChatWindow.setAttribute('dragging', 'true');
										let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
										isWindowSizeDefault = true;
										isWindowPositionDefault = true;
										ChatWindow.style.right = '';
										ChatWindow.style.bottom = '';
										ChatWindow.style.top = '';
										ChatWindow.style.left = '';
										ChatWindow.style.height = '';
										ChatWindow.style.width = '';
										if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
										TempWindowX = undefined;
										TempWindowY = undefined;
										ContextMenuBoolean = false;
										window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 40);
									}
								}
							}
						};
					},
					'resetWindowSize': function (textContextChange = 'Reset window size') {
						let e = isWindowSizeDefault;
						return {
							'resetWindowSize': {
								'type': 'button',
								'textcontent': textContextChange,
								'disabled': e,
								'onclick': function () {
									if (!e) {
										let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
										isWindowSizeDefault = true;
										ChatWindow.style.height = '';
										ChatWindow.style.width = '';
										if (!IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
										ContextMenuBoolean = false;
									}
								}
							}
						};
					},
					'resetWindowPosition': function (textContextChange = 'Reset window position') {
						let e = isWindowPositionDefault;
						return {
							'resetWindowPosition': {
								'type': 'button',
								'textcontent': textContextChange,
								'disabled': e,
								'onclick': function () {
									if (!e) {
										ChatWindow.setAttribute('dragging', 'true');
										isWindowPositionDefault = true;
										ChatWindow.style.right = '';
										ChatWindow.style.bottom = '';
										ChatWindow.style.top = '';
										ChatWindow.style.left = '';
										TempWindowX = undefined;
										TempWindowY = undefined;
										ContextMenuBoolean = false;
										window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 40);
									}
								}
							}
						};
					},
					'markAllAsRead': function (textContextChange = 'Mark all tabs as read') {
						let e = areTabsUnread();
						return {
							'markAllAsRead': {
								'type': 'button',
								'textcontent': textContextChange,
								'disabled': !e,
								'onclick': function () {
									if (e) {
										ClearAllUnreadTabs();
										UpdateUnread();
										for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') TabsSpan.children[i].children[1].style.display = 'none';
										ContextMenuBoolean = false;
									}
								}
							}
						};
					},
					'moveToFirst': function (textContextChange = 'Move to first', TabName = PublicTabName) {
						let e = TabsSpan.firstChild.children[2].innerHTML == TabName;
						return {
							'moveToFirst': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'moveToFirst',
								'disabled': e,
								'onclick': function () {
									if (!e) {
										for (let i = 0; i < TabsSpan.childNodes.length; i++) {
											if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) TabsSpan.insertAdjacentElement('afterbegin', TabsSpan.childNodes[i]);
											ContextMenuBoolean = false;
										}
									}
								}
							}
						};
					},
					'moveToLast': function (textContextChange = 'Move to last', TabName = PublicTabName) {
						let e = TabsSpan.childNodes[TabsSpan.childNodes.length - 5].children[2].innerHTML == TabName;
						return {
							'moveToLast': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'moveToLast',
								'disabled': e,
								'onclick': function () {
									if (!e) {
										for (let i = 0; i < TabsSpan.childNodes.length; i++) {
											if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
												if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
													TabsSpan.appendChild(TabsSpan.childNodes[i]);
													TabsSpan.appendChild(TellToButton);
													TabsSpan.appendChild(LastTabSpace);
													TabsSpan.appendChild(GradientLeft);
													TabsSpan.appendChild(GradientRight);
													ContextMenuBoolean = false;
												}
											}
										}
									}
								}
							}
						};
					},
					'MarkAsRead': function (textContextChange = 'Mark as read', TabName = PublicTabName) {
						return {
							'MarkAsRead': {
								'type': 'button',
								'textcontent': textContextChange,
								'disabled': Unread[TabName] < 1,
								'onclick': function () {
									for (let i = 0; i < TabsSpan.childNodes.length; i++) {
										if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
											if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
												if (Unread[TabName] > 0) {
													TabsSpan.childNodes[i].childNodes[1].style.display = 'none';
													Unread[TabName] = 0;
													UpdateUnread();
													ContextMenuBoolean = false;
												}
											}
										}
									}
								}
							}
						};
					},
					'Close': function (textContextChange = 'Close', TabName = PublicTabName) {
						return {
							'Close': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'Close',
								'disabled': !isTabCloseable(TabName),
								'onclick': function () {
									if (isTabCloseable(TabName)) {
										for (let i = 0; i < TabsSpan.childNodes.length; i++) {
											if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
												if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName) {
													if (SelectedTab == TabName) selectTab(PublicTabName in tabsList ? PublicTabName : tabsList[0]);
													closeTab(TabName);
													ContextMenuBoolean = false;
												}
											}
										}
									}
								}
							}
						};
					},
					'Mute': function (id = Math.round(Math.random() * 1000)) {
						let e = Muted.indexOf(id) > -1;
						return {
							'Mute': {
								'type': 'button',
								'textcontent': `${e ? 'Unm' : 'M'}ute ${id}`,
								'onclick': function () {
									if (!e) Muted.push(id); else {
										for (let i = Muted.length - 1; i >= 0; i--) {
											if (Muted[i] == id) {
												Muted.splice(i, 1);
												break;
											}
										}
									}
									IDMenuShown = false;
									ContextMenuBoolean = false;
									chatLocal(`${e ? 'Unm' : 'M'}uted ${id}`);
								}
							}
						};
					},
					'TellToInput': function (nick = Math.round(Math.random() * 1000)) {
						return {
							'TellToInput': {
								'type': 'input',
								'typeAttr': 'text',
								'className': 'ContextMenuTellTo',
								'placeholder': `Tell to ${nick.split('] ')[0].slice((nick.indexOf('[') == 0) ? 1 : 0)}`,
								'maxLength': (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - 7 - nick.split('] ')[0].slice((nick.indexOf('[') == 0) ? 1 : 0).length
							}
						};
					},
					'InputTab': function (StringBefore = '', StringAfter = '', Placeholder = '') {
						return {
							'InputTab': {
								'type': 'input',
								'typeAttr': 'text',
								'className': 'ContextMenuInputTab',
								'placeholder': Placeholder,
								'maxLength': (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - StringBefore.length - StringAfter.length
							}
						};
					},
					'MinimizeWindow': function (textContextChange = 'Minimize', bool = !isMinimized) {
						return {
							'MinimizeWindow': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'MinimizeWindow',
								'disabled': !bool,
								'onclick': function () {
									if (bool) {
										minimizeWindow();
										ContextMenuBoolean = false;
									}
								}
							}
						};
					},
					'RestoreWindow': function (textContextChange = 'Restore', bool = isMinimized || isMaximized) {
						return {
							'RestoreWindow': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'RestoreWindow',
								'disabled': !bool,
								'onclick': function () {
									if (bool) {
										if (isMinimized) restoreWindow(); else if (isMaximized) restoreMaximizedWindow();
										ContextMenuBoolean = false;
									}
								}
							}
						};
					},
					'MaximizeWindow': function (textContextChange = 'Maximize', bool = !isMaximized) {
						return {
							'MaximizeWindow': {
								'type': 'button',
								'textcontent': textContextChange,
								'icon': 'MaximizeWindow',
								'disabled': !bool,
								'onclick': function () {
									if (bool) {
										if (isMinimized) restoreWindow(); 
										MaximizeFunct();
										ContextMenuBoolean = false;
									}
								}
							}
						};
					},
					'Cursor': function (textContextChange = '', ID = Math.round(Math.random() * 1000), type = 0) {
						return {
							'Cursor': {
								'type': 'button',
								'textcontent': textContextChange == '' ? ID : textContextChange,
								'icon': 'Cursor',
								'onclick': function () {
									if (tabsList.indexOf(`<div id="NewChat-UserTabIcon"></div>${ID}`) < 0) if (type == 0) {
										TellToInput.value = ID;
										if (TellToInput.id == 'NewChat-TellToInputError') TellToInput.id = 'NewChat-TellToInput';
										TellToInput.focus();
									} else if (type == 1) newTab(`<div id="NewChat-UserTabIcon"></div>${ID}`, true, `/tell ${ID} `, '', `Tell to ${ID}`, true);
									ContextMenuBoolean = false;
									if (type == 1) $hts = false;
								}
							}
						};
					},
					'line': function () {
						return {
							'line': {
								'type': 'line'
							}
						};
					},
					'none': function () {
						return {
							'none': {
								'type': 'none'
							}
						};
					}
				}
			};

			ChatWindow.setAttribute('hidden', 'false');
			Minimized.setAttribute('hidden', 'false');

			document.addEventListener('mouseup', () => {
				scrollingright = false;
				scrollingleft = false;
			});
			document.addEventListener('mouseout', () => {
				scrollingright = false;
				scrollingleft = false;
			});
			document.addEventListener('touchend', () => {
				scrollingright = false;
				scrollingleft = false;
			});

			window.addEventListener('mouseup', function () {
				ChatWindowDragging = false;
				window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 90);
			});
			window.addEventListener('touchend', function () {
				ChatWindowDragging = false;
				window.setTimeout(() => ChatWindow.setAttribute('dragging', 'false'), 90);
			});

			window.OWOP.chat.clear = function () {
				oldChatMessages.innerHTML = '';
				oldDevChatMessages.innerHTML = '';
				ClearAllUnreadTabs();
				UpdateUnread();
			};

			worldname = window.location.pathname == '/' ? typeof window.OWOP.options.defaultWorld == 'string' ? window.OWOP.options.defaultWorld : 'main' : window.location.pathname.slice(1);

			let sendChat = window.OWOP.chat.send;
			let chatLocal = window.OWOP.chat.local;

			TellToGo.onclick = () => {
				if (TellToInput.value !== '' && TellToInput.value > 0) {
					$hts = false;
					TellMenuShown = false;
					if (tabsList.indexOf(`<div id="NewChat-UserTabIcon"></div>${TellToInput.value}`) < 0) newTab(`<div id="NewChat-UserTabIcon"></div>${TellToInput.value}`, true, `/tell ${TellToInput.value} `, '', `Tell to ${TellToInput.value}`, true);
					if (TellToButton.id == 'NewChat-TellToButtonClicked') TellToButton.id = 'NewChat-TellToButton';
					TellToMenu.style.display = 'none';
					if (isMobile) TellToMenuBg.style.display = 'none';
					TellToInput.value = '';
				} else TellToInput.id = 'NewChat-TellToInputError';
			};

			Send.onclick = () => {
				if (Input.value.replace(/[ \t\r\n]+/g, '') !== '') {
					if (Input.value.startsWith('/nick')) {
						localstr.removeItem('nick');
						if (Input.value.slice(6).replace(/ /g, '') !== '') localstr.setItem('nick', Input.value.slice(6));
					} else if (Input.value.startsWith('/pass')) {
						try {
							let worldpass = JSON.parse(localstr.worldPasswords);
							worldpass[worldname] = Input.value.slice(6);
							if (Input.value.slice(6).replace(/ /g, '') !== '') localstr.setItem('worldPasswords', JSON.stringify(worldpass));
						} catch (e) {
							if (Input.value.slice(6).replace(/ /g, '') !== '') localstr.setItem('worldPasswords', `{"${worldname}":"${Input.value.slice(6)}"}`);
						}
					} else if (Input.value.startsWith('/adminlogin')) {
						localstr.removeItem('adminlogin');
						if (Input.value.slice(12).replace(/ /g, '') !== '') localstr.setItem('adminlogin', Input.value.slice(12));
					} else if (Input.value.startsWith('/modlogin')) {
						localstr.removeItem('modlogin');
						if (Input.value.slice(10).replace(/ /g, '') !== '') localstr.setItem('modlogin', Input.value.slice(10));
					}
					sendChat(Input.value.startsWith('/') ? Input.value : InputStringBefore + Input.value + InputStringAfter);
					Input.value = '';
					Messages.scrollTop = Messages.scrollHeight;
				}
			};
			
			if (localStorage.getItem('chatTabsEnabled') == null) localstr.chatTabsEnabled = true;
			let TabsEnabled = JSON.parse(localstr.chatTabsEnabled.toLowerCase());

			let NewChatCSS = `
					#NewChat-Window, #NewChat-Minimized, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ResizeBottom:active, #NewChat-ResizeRight:active, #NewChat-ResizeLeft:active, #NewChat-ResizeBottomRight:active, #NewChat-WindowTitle:active:before { position: fixed; }
					#NewChat-Window, #NewChat-Send { background-color: #aba389; }
					#NewChat-Window { border: 11px solid #aba389; }
					#NewChat-Window { border-width: 11px; }
					#NewChat-Window { -webkit-border-image: url(/img/window_out.png) 11 repeat; }
					#NewChat-Window { -moz-border-image: url(/img/window_out.png) 11 repeat; }
					#NewChat-Window { -o-border-image: url(/img/window_out.png) 11 repeat; }
					#NewChat-Window { border-image: url(/img/window_out.png) 11 repeat; }
					#NewChat-Window, #NewChat-Minimized, #NewChat-ChatTooltip, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -moz-box-shadow: 0 0 5px #000; }
					#NewChat-Window, #NewChat-Minimized, #NewChat-ChatTooltip, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -webkit-box-shadow: 0 0 5px #000; }
					#NewChat-Window, #NewChat-Minimized, #NewChat-ChatTooltip, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { box-shadow: 0 0 5px #000; }
					#NewChat-Window { bottom: 8px; }
					#NewChat-Window, #NewChat-Minimized, #NewChat-ChatTooltip { left: 8px; }
					#NewChat-Window { width: 450px; }
					#NewChat-Window { height: 40%; }
					#NewChat-Window { min-height: 243px; }
					#NewChat-Top, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-Send, #NewChat-GradientLeft, #NewChat-GradientRight, #NewChat-Unread, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-ChatTooltip:before, #NewChat-UnreadBorder, #NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-ResizeBottom, #NewChat-ResizeBottomRight, #NewChat-ResizeRight, #NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, #NewChat-ResizeLeft, #NewChat-CloseTabButton, #NewChat-ContextMenuIcon, #NewChat-TitleIcon, #NewChat-TabInnerBorder { position: absolute; }
					#NewChat-WindowTitle, #NewChat-GradientRight, #NewChat-GradientLeft, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-ResizeBottom:active, #NewChat-ResizeBottomRight:active, #NewChat-TabSelected:after, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-WindowTitle:active:before, #NewChat-Window[Maximized="true"], #NewChat-TabInnerBorder { top: 0; }
					#NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { top: 7px; }
					#NewChat-Top, #NewChat-Messages, #NewChat-UnreadBorder, #NewChat-Body, #NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-TabsContainer, #NewChat-Input, #NewChat-ResizeRight:active, #NewChat-ResizeLeft:active, #NewChat-ResizeBottomRight:active${TabsEnabled ? '' : ', #NewChat-WindowTitle'}, #NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuInput, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-WindowTitle:active:before, #NewChat-TabInnerBorder, #NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { width: 100%; }
					#NewChat-Window, #NewChat-TabsLeftBorder, #NewChat-Messages li, #NewChat-GradientLeft, #NewChat-Minimized, #NewChat-ChatTooltip:before, #NewChat-TellToMenu, #NewChat-WindowTitle:active:before, #NewChat-CloseTabButton, #NewChat-TitleIcon, #NewChat-TabInnerBorder, #NewChat-UserTabIcon { display: block; }
					#NewChat-WindowTitle, #NewChat-Send { color: #7e635c; }
					#NewChat-WindowTitle, #NewChat-Send:hover:active { text-shadow: 1px 1px #4d313b; }
					#NewChat-WindowTitle, #NewChat-Tabs, #NewChat-TabsContainer, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftButton, #NewChat-Tabs span, #NewChat-Tab, #NewChat-TabSelected, #NewChat-Unread, #NewChat-LastTabSpace, #NewChat-RepeatCounter, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Input, #NewChat-Send, #NewChat-TellToIcon, #NewChat-ContextMenuIcon { display: inline-block; }
					#NewChat-Tabs, #NewChat-TabsContainer, #NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-LastTabSpace, #NewChat-TellToIcon { height: 27px; }
					#NewChat-TabsContainer { -webkit-transform: translateY(4px); }
					#NewChat-TabsContainer { -ms-transform: translateY(4px); }
					#NewChat-TabsContainer { transform: translateY(4px); }
					#NewChat-TabsLeftBorder, #NewChat-TabsLeftButton, #NewChat-Tab, #NewChat-TabSelected, #NewChat-TellToButton, #NewChat-TellToButtonClicked, #NewChat-WindowTitle, #NewChat-UserTabIcon { float: left; }
					#NewChat-TabsRightBorder, #NewChat-TabsRightButton, #NewChat-TellToGo, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-Send, #NewChat-TellToIDButton { float: right; }
					#NewChat-TabsLeftBorder, #NewChat-TabsRightBorder { width: 6px; }
					#NewChat-Tabs { width: -webkit-calc(100% - 12px); }
					#NewChat-Tabs { width: -moz-calc(100% - 12px); }
					#NewChat-Tabs { width: calc(100% - 12px); }
					#NewChat-Tabs span { width: -webkit-calc(100% - 36px); }
					#NewChat-Tabs span { width: -moz-calc(100% - 36px); }
					#NewChat-Tabs span { width: calc(100% - 36px); }
					#NewChat-Minimize:hover, #NewChat-Maximize:hover, #NewChat-Restore:hover, #NewChat-Send:hover, #NewChat-TabsLeftButton:hover, #NewChat-TabsRightButton:hover, #NewChat-CloseTabButton:hover { -webkit-filter: brightness(110%); }
					#NewChat-Minimize:hover, #NewChat-Maximize:hover, #NewChat-Restore:hover, #NewChat-Send:hover, #NewChat-TabsLeftButton:hover, #NewChat-TabsRightButton:hover, #NewChat-CloseTabButton:hover { filter: brightness(110%); }
					#NewChat-Minimize:hover:active, #NewChat-Maximize:hover:active, #NewChat-Restore:hover:active, #NewChat-Send:hover:active, #NewChat-TabsLeftButton:hover:active, #NewChat-TabsRightButton:hover:active, #NewChat-CloseTabButton, #NewChat-CloseTabButton:hover:active { -webkit-filter: brightness(90%); }
					#NewChat-Minimize:hover:active, #NewChat-Maximize:hover:active, #NewChat-Restore:hover:active, #NewChat-Send:hover:active, #NewChat-TabsLeftButton:hover:active, #NewChat-TabsRightButton:hover:active, #NewChat-CloseTabButton:hover:active { filter: brightness(90%); }
					#NewChat-CloseTabButton { -webkit-filter: brightness(1); }
					#NewChat-CloseTabButton { filter: brightness(1); }
					#NewChat-GradientLeft { left: 24px; }
					#NewChat-GradientRight { right: 24px; }
					#NewChat-MessagesContainer, #NewChat-Messages, #NewChat-Tabs span, #NewChat-Tab, #NewChat-TabSelected, #NewChat-UnreadBorder, #NewChat-Body, #NewChat-TellToButton, #NewChat-TellToButtonClicked, #NewChat-ResizeBottom:active, #NewChat-ResizeBottomRight:active, #NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-WindowTitle:active:before, #NewChat-TabInnerBorder { height: 100%; }
					#NewChat-MessagesContainer { padding-top: 22px; }
					#NewChat-MessagesContainer, #NewChat-UnreadBorder, #NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-WindowTitle, #NewChat-ContextMenuInput, #NewChat-NameTab, #NewChat-TabInnerBorder, #NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError { -webkit-box-sizing: border-box; }
					#NewChat-MessagesContainer, #NewChat-UnreadBorder, #NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-WindowTitle, #NewChat-ContextMenuInput, #NewChat-NameTab, #NewChat-TabInnerBorder, #NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError { -moz-box-sizing: border-box; }
					#NewChat-MessagesContainer, #NewChat-UnreadBorder, #NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-WindowTitle, #NewChat-ContextMenuInput, #NewChat-NameTab, #NewChat-TabInnerBorder, #NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError { box-sizing: border-box; }
					#NewChat-MessagesContainer { padding-bottom: 51px; }
					#NewChat-Tabs, #NewChat-Messages, #NewChat-Input, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { background-color: #7e635c; }
					#NewChat-Messages, #NewChat-Input, #NewChat-Send { border: 5px solid #7e635c; }
					#NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { border: 5px solid #aba389; }
					#NewChat-Messages, #NewChat-Input, #NewChat-Send { border-width: 5px; }
					#NewChat-Messages, #NewChat-Input { -o-border-image: url(/img/window_in.png) 5 repeat; }
					#NewChat-Messages, #NewChat-Input { border-image: url(/img/window_in.png) 5 repeat; }
					#NewChat-Messages { margin: 0 -5px; }
					#NewChat-Input { margin: 0 14px 0 -5px; }
					#NewChat-Input { height: 32px; }
					#NewChat-Input, #NewChat-TellToInput, #NewChat-TellToInputError, #NewChat-Messages, #NewChat-Body, #NewChat-ContextMenuInput { font-family: pixel-op, monospace; }
					#NewChat-Input, #NewChat-TellToInput:focus, #NewChat-TellToInputError:focus, #NewChat-ContextMenuInput { outline: 0; }
					#NewChat-Input, #NewChat-Messages, #NewChat-Tab, #NewChat-TabSelected, #NewChat-ContextMenu, #NewChat-ContextMenuInput, #NewChat-ContextMenuInput::placeholder, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { color: #f7f3ee; }
					#NewChat-Input::placeholder { color: #d2bdb7; }
					#NewChat-Window, #NewChat-Input, #NewChat-Messages, #NewChat-RepeatCounter, #NewChat-Minimized:hover #NewChat-Unread, #NewChat-TellToInput, #NewChat-TellToInputError, #NewChat-Body, #NewChat-ContextMenuInput { font-size: 16px; }
					#NewChat-FlexBottom { -webkit-transform: translateY(-37px); }
					#NewChat-FlexBottom { -ms-transform: translateY(-37px); }
					#NewChat-FlexBottom { transform: translateY(-37px); }
					#NewChat-Send, #NewChat-Unread, #NewChat-WindowTitle, #NewChat-EmptyTabMessage, #NewChat-ContextMenuMobile #NewChat-ContextMenuButton, #NewChat-ContextMenuMobile #NewChat-ContextMenuButtonWithIcon, #NewChat-ContextMenuMobile #NewChat-ContextMenuInput::placeholder, #NewChat-TellToMenuMobile, #NewChat-TellToMenuMobile #NewChat-TellToInput::placeholder, #NewChat-TellToMenuMobile #NewChat-TellToInputError::placeholder { text-align: center; }
					#NewChat-Send { text-shadow: -1px -1px #4d313b; }
					#NewChat-Send { border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABSSURBVDhPY/j//z8cr17c+Z8QRlZPtCZkXJccAzaELM0gDNaMTYIYDLJ9VDMJeAhqBmkEayYnhYE0glMYiABxsClCxzAbUTTDMLIkLoxQ/58BAKbPcjdL5cp0AAAAAElFTkSuQmCC) 5 repeat; }
					#NewChat-Send { -o-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABSSURBVDhPY/j//z8cr17c+Z8QRlZPtCZkXJccAzaELM0gDNaMTYIYDLJ9VDMJeAhqBmkEayYnhYE0glMYiABxsClCxzAbUTTDMLIkLoxQ/58BAKbPcjdL5cp0AAAAAElFTkSuQmCC) 5 repeat; }
					#NewChat-Send:hover:active { border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABOSURBVDhPY/j//z8c1yXH/CeEkdVjaFq9uJMghhkC14xNET4M1kyKjeiYLFtheFQziXgANYNSCjYJQhicwkAEObbDNcMwNkXoGKH+PwMAJvJyN7CChIAAAAAASUVORK5CYII=) 5 repeat; }
					#NewChat-Send:hover:active { -o-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABOSURBVDhPY/j//z8c1yXH/CeEkdVjaFq9uJMghhkC14xNET4M1kyKjeiYLFtheFQziXgANYNSCjYJQhicwkAEObbDNcMwNkXoGKH+PwMAJvJyN7CChIAAAAAASUVORK5CYII=) 5 repeat; }
					#NewChat-GradientLeft, #NewChat-GradientRight, #NewChat-TellToIDButton { height: 25px; }
					#NewChat-Send { line-height: 12px; }
					#NewChat-Messages, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { overflow: auto; }
					#NewChat-Tab:hover, #NewChat-TabSelected, #NewChat-ContextMenuButtonWithIcon:hover, #NewChat-ContextMenuButton:hover, #NewChat-ContextMenuInput, #NewChat-TellToInput, #NewChat-TellToInput::placeholder, #NewChat-TellToInputError::placeholder, #NewChat-TellToGo, #NewChat-Messages, #NewChat-Input, #NewChat-Tab, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, #NewChat-TellToMenu { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
					#NewChat-Messages .server, #NewChat-Messages .server .nick, #NewChat-Messages .server .ClickableNick { color: #d5b5ff; }
					#NewChat-Messages .admin, #NewChat-Messages .admin .nick, #NewChat-Messages .admin .ClickableNick { color: #ffa097; }
					#NewChat-Messages .moderator, #NewChat-Messages .moderator .nick, #NewChat-Messages .moderator .ClickableNick { color: #98ff80; }
					#NewChat-Messages .discord .nick, #NewChat-Messages .discord .ClickableNick { color: #80f2ff; }
					#NewChat-Messages .tell, #NewChat-Messages .tell .nick, #NewChat-Messages .tell .ClickableNick { color: #f0af78; }
					#NewChat-Messages .muted, #NewChat-Messages .muted .nick, #NewChat-Messages .muted .ClickableNick { color: #ffb897; }
					#NewChat-Messages .nick, #NewChat-Messages .ClickableNick { color: #a1c7e3; }
					#NewChat-TabsLeftButton { background: #aba389 url(/img/gui.png) -34px -18px no-repeat; }
					#NewChat-TabsRightButton { background: #aba389 url(/img/gui.png) -2px -18px no-repeat; }
					#NewChat-Minimized { width: 31px; }
					#NewChat-WindowTitle, #NewChat-FlexTop { height: 31px; }
					#NewChat-WindowTitle, #NewChat-NameTab { white-space: nowrap; }
					#NewChat-WindowTitle, #NewChat-TellToMenuMobile { line-height: 32px; }
					#NewChat-Minimized { height: 50px; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-CloseTabButton { width: 12px; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-Send, #NewChat-CloseTabButton { height: 12px; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton { border: 3px outset #aba389; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton { -o-border-image: url(/img/button.png) 3 repeat; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton { border-image: url(/img/button.png) 3 repeat; }
					#NewChat-TabsLeftButton:hover:active, #NewChat-TabsRightButton:hover:active { -o-border-image: url(/img/button_pressed.png) 3 repeat; }
					#NewChat-TabsLeftButton:hover:active, #NewChat-TabsRightButton:hover:active { border-image: url(/img/button_pressed.png) 3 repeat; }
					#NewChat-TabsLeftButton:hover:active { background: #aba389 url(/img/gui.png) -33px -17px no-repeat; }
					#NewChat-TabsRightButton:hover:active { background: #aba389 url(/img/gui.png) -1px -17px no-repeat; }
					#NewChat-TabsLeftButton, #NewChat-TabsRightButton { margin-top: 4px; }
					#NewChat-Messages { -webkit-user-select: text; }
					#NewChat-Messages { -moz-user-select: text; }
					#NewChat-Messages { -ms-user-select: text; }
					#NewChat-Messages { user-select: text; }
					#NewChat-Messages .discordEmote { width: 16px; }
					#NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after { width: 5px; }
					#NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Messages .discordEmote { height: 16px; }
					#NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after, #NewChat-WindowTitle:active:before, #NewChat-ChatTooltip:before { content: ''; }
					#NewChat-GradientLeft, #NewChat-GradientRight, #NewChat-ChatTooltip:before { width: 13px; }
					#NewChat-GradientLeft { background: -moz-linear-gradient(left, #7e635c 0%, rgba(126, 99, 92, 0) 100%); }
					#NewChat-GradientLeft { background: -webkit-linear-gradient(left, #7e635c 0%, rgba(126, 99, 92, 0) 100%); }
					#NewChat-GradientLeft { background: linear-gradient(to right, #7e635c 0%, rgba(126, 99, 92, 0) 100%); }
					#NewChat-GradientRight { background: -moz-linear-gradient(left, rgba(126, 99, 92, 0) 0%, #7e635c 100%); }
					#NewChat-GradientRight { background: -webkit-linear-gradient(left, rgba(126, 99, 92, 0) 0%, #7e635c 100%); }
					#NewChat-GradientRight { background: linear-gradient(to right, rgba(126, 99, 92, 0) 0%, #7e635c 100%); }
					#NewChat-GradientLeft, #NewChat-GradientRight { margin-top: 1px; }
					#NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-LastTabSpace, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Body[hidePart='true'], #NewChat-ChatTooltip, #NewChat-Window[minimized='true'], #NewChat-EmptyTabMessage, #NewChat-Send[disabled='true'], #NewChat-TellToIDButton[disabled='true'] { pointer-events: none; }
					#NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-LastTabSpace, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Body[hidePart='true'], #NewChat-ChatTooltip, #NewChat-Window[minimized='true'], #NewChat-EmptyTabMessage, #NewChat-Send[disabled='true'], #NewChat-TellToIDButton[disabled='true'] { -webkit-pointer-events: none; }
					#NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-LastTabSpace, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-Body[hidePart='true'], #NewChat-ChatTooltip, #NewChat-Window[minimized='true'], #NewChat-EmptyTabMessage, #NewChat-Send[disabled='true'], #NewChat-TellToIDButton[disabled='true'] { -moz-pointer-events: none; }
					#NewChat-Window { pointer-events: auto; }
					#NewChat-Messages a:link, #NewChat-Messages a { color: #a9daff; }
					#NewChat-Messages a:hover { color: #96c2e6; }
					#NewChat-Messages a:visited { color: #c4a4ff; }
					#NewChat-Messages a:visited:hover { color: #aa8ae6; }
					#NewChat-Tab, #NewChat-TabSelected { line-height: ${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 26 : 27}px; }
					#NewChat-NameTab { padding: 0 12px; }
					#NewChat-NameTab.closeable { padding: 0 34px 0 12px; }
					#NewChat-Tab, #NewChat-TabSelected, #NewChat-TellToButton, #NewChat-TellToButtonClicked { margin-left: 13px; }
					#NewChat-LastTabSpace { width: 0; }
					#NewChat-LastTabSpace { padding-right: 13px; }
					#NewChat-Tabs span, #NewChat-Tab, #NewChat-TabSelected, #NewChat-TellToButton, #NewChat-TellToButtonClicked, #NewChat-ContextMenu, #NewChat-TellToMenu { overflow: hidden; }
					#NewChat-Tabs span { display: inline-flex; }
					#NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-Window[minimized='true'], #NewChat-Body[hidePart='true'], #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg { opacity: 0; }
					#NewChat-Minimized { transition: opacity .5s ease-out; }
					#NewChat-Unread${TabsEnabled ? ', #NewChat-WindowTitle' : ''}, #NewChat-Send { width: auto; }
					#NewChat-Unread, #NewChat-ContextMenuIcon, #NewChat-UserTabIcon { height: 11px; }
					#NewChat-Unread { right: 4px; }
					#NewChat-Unread { top: 2px; }
					#NewChat-Unread, #NewChat-Minimized:hover #NewChat-Unread, #NewChat-ChatTooltip, #NewChat-TellToMenu, #NewChat-TellToInput::placeholder, #NewChat-TellToInput, #NewChat-TellToInputError::placeholder, #NewChat-TellToInputError { color: #fff; }
					#NewChat-Unread { background-color: #ff7979; }
					#NewChat-Unread { box-shadow: 1px 1px 0 0 #4d313b; }
					#NewChat-Unread { line-height: ${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 9 : 10}px; }
					#NewChat-Unread { font-size: 12px; }
					#NewChat-Unread { text-shadow: 1px 1px 0 #4d3131; }
					#NewChat-Unread, #NewChat-TellToGo { padding: 0 3px; }
					#NewChat-Send { margin-right: -3px; }
					#NewChat-Input { resize: none; }
					#NewChat-RepeatCounter { margin-left: 3px; }
					${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? '' : '#NewChat-RepeatCounter, '}#NewChat-ChatTooltip { line-height: ${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 15 : 16}px; }${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? '\n					#NewChat-RepeatCounter { line-height: 16px; }' : ''}
					#NewChat-RepeatCounter, #NewChat-Tab, #NewChat-TabSelected, #NewChat-TabsContainer, #NewChat-WindowTitle, #NewChat-Send, #NewChat-ContextMenuButtonWithIcon { position: relative; }
					#NewChat-RepeatCounter { margin: 0 10px; }
					#NewChat-RepeatCounter:before { left: -5px; }
					#NewChat-RepeatCounter:after { right: -5px; }
					#NewChat-Input:focus { -webkit-filter: brightness(.899); }
					#NewChat-Input:focus { filter: brightness(.899); }
					#NewChat-Minimized:hover #NewChat-Unread { height: 13px; }
					#NewChat-Minimized:hover #NewChat-Unread { line-height: ${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 12 : 13}px; }
					#NewChat-Minimized:hover #NewChat-Unread { padding-left: 3px; }
					#NewChat-Minimized:hover #NewChat-Unread { top: 1px; }
					#NewChat-Minimized:hover #NewChat-Unread { right: 2px; }
					#NewChat-Minimized:hover #NewChat-Unread[data-num='0'], #NewChat-Minimized:hover #NewChat-Unread[data-num='1'], #NewChat-Minimized:hover #NewChat-Unread[data-num='2'], #NewChat-Minimized:hover #NewChat-Unread[data-num='3'], #NewChat-Minimized:hover #NewChat-Unread[data-num='4'], #NewChat-Minimized:hover #NewChat-Unread[data-num='5'], #NewChat-Minimized:hover #NewChat-Unread[data-num='6'], #NewChat-Minimized:hover #NewChat-Unread[data-num='7'], #NewChat-Minimized:hover #NewChat-Unread[data-num='8'], #NewChat-Minimized:hover #NewChat-Unread[data-num='9'] { right: 3px; }
					#NewChat-Minimized:hover #NewChat-Unread[data-more-than-99='true'], #NewChat-Maximize, #NewChat-Restore { right: 1px; }
					#NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { border-image: url(/img/small_border.png) 5 repeat; }
					#NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -o-border-image: url(/img/small_border.png) 5 repeat; }
					#NewChat-ChatTooltip { bottom: 55px; }
					#NewChat-Window, #NewChat-ChatTooltip, #NewChat-ContextMenu, #NewChat-TellToMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { border-image-outset: 1px; }
					#NewChat-ChatTooltip:before { bottom: -1${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 0 : 1}px; }
					#NewChat-ChatTooltip:before { left: 4px; }
					#NewChat-Minimized:hover #NewChat-ChatTooltip { opacity: 1; }
					#NewChat-ChatTooltip { transition: opacity .15s ease-out; }
					#NewChat-Messages > div > div { padding: 1px 0; }
					#NewChat-ContextMenu, #NewChat-TellToMenu { box-shadow: 0 0 5px rgba(0, 0, 0, .5); }
					#NewChat-ContextMenu, #NewChat-TellToMenu { -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .5); }
					#NewChat-ContextMenu { padding: 1px 0; }
					#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon { padding: 4px 13px 4px 36px; }
					#NewChat-ContextMenuInput { padding: 4px 6px 4px 11px; }
					#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon { margin: 2px 0; }
					#NewChat-ContextMenu, #NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile, #NewChat-TellToMenu, #NewChat-ContextMenuInput { line-height: 1.2em; }
					#NewChat-ContextMenuLine, #NewChat-TellToLine { height: 1px; }
					#NewChat-ContextMenuLine, #NewChat-TellToLine { margin: 3px 0 3px 26px; }
					#NewChat-ContextMenuLine, #NewChat-TellToLine { background-color: #674b4d; }
					#NewChat-Top { top: -9px; }
					#NewChat-Minimized { transition: opacity .35s ease-in, bottom .06s ease-in; }
					#NewChat-Window[minimized='true'] { left: -200px; }
					#NewChat-Window[minimized='true']:not([style*="top:"]) { bottom: -100px; }
					#NewChat-Window[dragging='true'], #NewChat-Window[maximized="true"] { -webkit-transition: none; }
					#NewChat-Window[dragging='true'], #NewChat-Window[maximized="true"] { -moz-transition: none; }
					#NewChat-Window[dragging='true'], #NewChat-Window[maximized="true"] { transition: none; }
					#NewChat-Window[minimized='true'] { top: auto; }
					#NewChat-Minimized { bottom: -16px; }
					#NewChat-Minimized:hover { bottom: -11px; }
					#NewChat-Minimized, #NewChat-Minimized:hover:active { background-color: rgba(0, 0, 0, .55); }
					#NewChat-TellToButton, #NewChat-TellToButtonClicked, #NewChat-TellToIcon { width: 39px; }
					#NewChat-TellToButton, #NewChat-TellToButtonClicked { min-width: 39px; }
					#NewChat-Minimized, #NewChat-Tabs, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-ContextMenu { background-position: 0 0; }
					#NewChat-ContextMenu, #NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-TellToIcon, #NewChat-TellToGo, #NewChat-Minimized, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-Tabs, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-CloseTabButton, #NewChat-ContextMenuIcon, #NewChat-ChatTooltip:before, #NewChat-TitleIcon, #NewChat-TellToIDButton, #NewChat-UserTabIcon { background-repeat: no-repeat; }
					#NewChat-Messages .discordEmote { vertical-align: bottom; }
					#NewChat-TabSelected:after, #NewChat-RepeatCounter, #NewChat-ContextMenuButton:hover, #NewChat-ContextMenuButtonWithIcon:hover, #NewChat-ContextMenuInput, #NewChat-TellToInput, #NewChat-TellToGo, #NewChat-TellToInputError, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-TellToIDButton, #NewChat-Tab:after, #NewChat-TellToButton:after, #NewChat-TellToMenuMobile #NewChat-TellToIDButton:hover, #NewChat-TellToMenuMobile #NewChat-TellToGo:hover { background-color: #4d313b; }
					#NewChat-TellToInput::-webkit-outer-spin-button, #NewChat-TellToInput::-webkit-inner-spin-button, #NewChat-TellToInputError::-webkit-outer-spin-button, #NewChat-TellToInputError::-webkit-inner-spin-button { -webkit-appearance: none; }
					#NewChat-TellToInput::-webkit-outer-spin-button, #NewChat-TellToInput::-webkit-inner-spin-button, #NewChat-TellToInputError::-webkit-outer-spin-button, #NewChat-TellToInputError::-webkit-inner-spin-button, #NewChat-ContextMenuInput { margin: 0; }
					#NewChat-TellToInput, #NewChat-TellToInputError { -moz-appearance: textfield; }
					#NewChat-TellToInput, #NewChat-TellToInputError { width: 70px; }
					#NewChat-TellToInput, #NewChat-TellToGo, #NewChat-TellToInputError { height: 23px; }
					#NewChat-TellToInput, #NewChat-TellToInputError { padding: 0 5px; }
					#NewChat-TellToInput, #NewChat-TellToGo { border: 1px solid #4d313b; }
					#NewChat-TellToInputError { border: 1px solid #e53b44; }
					#NewChat-TellToGo { line-height: ${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 21 : 22}px; }
					#NewChat-TellToGo { width: 15px; }
					#NewChat-Minimized[hidden='true'] #NewChat-ChatTooltip, #NewChat-ContextMenuMobile #NewChat-ContextMenuIcon, #NewChat-Window[Maximized="true"] #NewChat-ResizeBottom, #NewChat-Window[Maximized="true"] #NewChat-ResizeRight, #NewChat-Window[Maximized="true"] #NewChat-ResizeBottomRight { display: none; }
					#NewChat-UnreadBorder { border: 6px solid rgba(0, 0, 0, 0); }
					#NewChat-UnreadBorder { -webkit-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABbSURBVDhPY/j//z8Y+xpa/ycFw/TBNf+vrCQJwwzB0AyzARdGV4tiAJgNdRoujK4eLkCMZhhG1jNqwPAygFhD0NWjCMAE8WF0tRimEovBeoB6UZxGCobo+88AAF81ilvbo/pkAAAAAElFTkSuQmCC") 6 6 stretch; }
					#NewChat-UnreadBorder { -o-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABbSURBVDhPY/j//z8Y+xpa/ycFw/TBNf+vrCQJwwzB0AyzARdGV4tiAJgNdRoujK4eLkCMZhhG1jNqwPAygFhD0NWjCMAE8WF0tRimEovBeoB6UZxGCobo+88AAF81ilvbo/pkAAAAAElFTkSuQmCC") 6 6 stretch; }
					#NewChat-UnreadBorder { border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABbSURBVDhPY/j//z8Y+xpa/ycFw/TBNf+vrCQJwwzB0AyzARdGV4tiAJgNdRoujK4eLkCMZhhG1jNqwPAygFhD0NWjCMAE8WF0tRimEovBeoB6UZxGCobo+88AAF81ilvbo/pkAAAAAElFTkSuQmCC") 6 6 stretch; }
					#NewChat-UnreadBorder { -moz-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABbSURBVDhPY/j//z8Y+xpa/ycFw/TBNf+vrCQJwwzB0AyzARdGV4tiAJgNdRoujK4eLkCMZhhG1jNqwPAygFhD0NWjCMAE8WF0tRimEovBeoB6UZxGCobo+88AAF81ilvbo/pkAAAAAElFTkSuQmCC") 6 6 stretch; }
					#NewChat-UnreadBorder { -webkit-animation-name: NewChatUnreadBorder; }
					#NewChat-UnreadBorder { animation-name: NewChatUnreadBorder; }
					#NewChat-UnreadBorder { -webkit-animation-duration: .15s; }
					#NewChat-UnreadBorder { animation-duration: .15s; }
					#NewChat-UnreadBorder { -webkit-animation-iteration-count: 1; }
					#NewChat-UnreadBorder { animation-iteration-count: 1; }
					#NewChat-UnreadBorder { -webkit-animation-timing-function: linear; }
					#NewChat-UnreadBorder { animation-timing-function: linear; }
					#NewChat-TellToInput::placeholder, #NewChat-TellToInputError::placeholder, #NewChat-ContextMenuInput::placeholder, #NewChat-Input[disabled], #NewChat-Send[disabled='true'], #NewChat-TellToIDButton[disabled='true'] { opacity: .65; }
					#NewChat-TellToInput, #NewChat-TellToInputError { -webkit-transition: border .15s linear; }
					#NewChat-TellToInput, #NewChat-TellToInputError { -moz-transition: border .15s linear; }
					#NewChat-TellToInput, #NewChat-TellToInputError { transition: border .15s linear; }
					#NewChat-FlexTop, #NewChat-FlexBottom { display: flex; }
					#NewChat-FlexTop { padding-right: 56px; }
					#NewChat-FlexTop, #NewChat-FlexBottom, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabSelected:after, #NewChat-Tab:after, #NewChat-TellToIcon { z-index: 1; }
					#NewChat-WindowTitle { padding-right: 8px; }
					#NewChat-TellToMenu { padding: 2px 7px; }
					#NewChat-Send { padding: 0 20px; }
					#NewChat-TabsContainer { min-width: 0; }
					#NewChat-TellToMenu { width: -moz-fit-content; }
					#NewChat-TellToMenu { width: -webkit-fit-content; }
					#NewChat-TellToMenu { width: fit-content; }
					#NewChat-Send, #NewChat-Send:hover:active { border-image-outset: 2px; }
					#NewChat-Send { margin-top: 2px; }
					#NewChat-ResizeBottom, #NewChat-ResizeBottomRight { height: 5px; }
					#NewChat-ResizeBottom, #NewChat-ResizeBottomRight { bottom: -12px; }
					#NewChat-ResizeBottomRight, #NewChat-ResizeRight, #NewChat-ResizeLeft { width: 5px; }
					#NewChat-ResizeBottomRight, #NewChat-ResizeRight { right: -12px; }
					#NewChat-ResizeLeft { left: -12px; }
					#NewChat-ResizeBottom { cursor: n-resize; }
					#NewChat-ResizeRight, #NewChat-ResizeLeft { cursor: e-resize; }
					#NewChat-ResizeBottomRight { cursor: nw-resize; }
					#NewChat-ResizeBottom:active, #NewChat-ResizeRight:active, #NewChat-ResizeLeft:active, #NewChat-ResizeBottomRight:active, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after, #NewChat-ContextMenuBg, #NewChat-TellToMenuBg, #NewChat-WindowTitle:active:before, #NewChat-TitleIcon, #NewChat-Window[Maximized="true"], #NewChat-TabInnerBorder { left: 0; }
					#NewChat-Window { min-width: 299px; }
					#NewChat-ResizeBottom { width: -webkit-calc(100% + 13px); }
					#NewChat-ResizeBottom { width: -moz-calc(100% + 13px); }
					#NewChat-ResizeBottom { width: calc(100% + 13px); }
					#NewChat-ResizeBottom { left: -6px; }
					#NewChat-Tab:after, #NewChat-TellToButton:after { top: 100%; }
					#NewChat-GradientLeft, #NewChat-GradientRight { z-index: 3; }
					#NewChat-UnreadBorder, #NewChat-NameTab, #NewChat-CloseTabButton, #NewChat-TabInnerBorder { z-index: 2; }
					#NewChat-NameTab, #NewChat-TellToButton, #NewChat-TellToButtonClicked, #NewChat-TellToIcon { position: sticky; }
					#NewChat-Tab, #NewChat-TabSelected { min-width: -moz-max-content; }
					#NewChat-Tab, #NewChat-TabSelected { min-width: -webkit-max-content; }
					#NewChat-Tab, #NewChat-TabSelected { min-width: max-content; }
					#NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after { -webkit-transition: top .3s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after { -moz-transition: top .3s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Tab:after, #NewChat-TabSelected:after, #NewChat-TellToButton:after, #NewChat-TellToButtonClicked:after { transition: top .3s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Messages > div > div { -webkit-animation: NewChatFadeIn .75s cubic-bezier(0, 1, .50, 1) 0s; }
					#NewChat-Messages > div > div { -moz-animation: NewChatFadeIn .75s cubic-bezier(0, 1, .50, 1) 0s; }
					#NewChat-Messages > div > div { -o-animation: NewChatFadeIn .75s cubic-bezier(0, 1, .50, 1) 0s; }
					#NewChat-Messages > div > div { animation: NewChatFadeIn .75s cubic-bezier(0, 1, .50, 1) 0s; }
					#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { -webkit-transition: background .1s linear 0s; }
					#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { -moz-transition: background .1s linear 0s; }
					#NewChat-ContextMenuButton, #NewChat-ContextMenuButtonWithIcon, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { transition: background .1s linear 0s; }
					#NewChat-ResizeRight, #NewChat-ResizeLeft { top: -6px; }
					#NewChat-ResizeRight, #NewChat-ResizeLeft { height: -webkit-calc(100% + 13px); }
					#NewChat-ResizeRight, #NewChat-ResizeLeft { height: -moz-calc(100% + 13px); }
					#NewChat-ResizeRight, #NewChat-ResizeLeft { height: calc(100% + 13px); }
					#NewChat-EmptyTabMessage { color: #c7b3ad; }
					#NewChat-EmptyTabMessage { white-space: normal; }
					#NewChat-Window[minimized='true'] { bottom: auto; }
					#NewChat-Window { -webkit-transition: transform .35s cubic-bezier(.4, .98, 1, 1), opacity .35s cubic-bezier(.5, 0, 0, 1), top .35s ease-out, left .35s ease-out, bottom .35s ease-out; }
					#NewChat-Window { -moz-transition: transform .35s cubic-bezier(.4, .98, 1, 1), opacity .35s cubic-bezier(.5, 0, 0, 1), top .35s ease-out, left .35s ease-out, bottom .35s ease-out; }
					#NewChat-Window { transition: transform .35s cubic-bezier(.4, .98, 1, 1), opacity .35s cubic-bezier(.5, 0, 0, 1), top .35s ease-out, left .35s ease-out, bottom .35s ease-out; }
					#NewChat-Messages .nick, #NewChat-Messages .ClickableNick { margin-right: 1px; }
					#NewChat-Messages .ClickableNick:hover { text-decoration: underline; }
					#NewChat-Body { -webkit-transition: transform .7s cubic-bezier(1, 0, 0, 1.05), opacity .4s ease-out; }
					#NewChat-Body { -moz-transition: transform .7s cubic-bezier(1, 0, 0, 1.05), opacity .4s ease-out; }
					#NewChat-Body { transition: transform .7s cubic-bezier(1, 0, 0, 1.05), opacity .4s ease-out; }
					#NewChat-Body[hidePart='true'] { -webkit-transform: translateY(100%); }
					#NewChat-Body[hidePart='true'] { -moz-transform: translateY(100%); }
					#NewChat-Body[hidePart='true'] { transform: translateY(100%); }
					#NewChat-ContextMenuInput { border-top: 1px solid #7e635c; }
					#NewChat-ContextMenuInput { border-left: 25px solid #7e635c; }
					#NewChat-ContextMenuInput { border-right: 6px solid #7e635c; }
					#NewChat-ContextMenuInput { border-bottom: 1px solid #7e635c; }
					#NewChat-NameTab { min-width: 100%; }
					#NewChat-TellToGo, #NewChat-TellToIDButton { margin-left: 1px; }
					#NewChat-Messages > div { word-break: break-word; }
					#NewChat-Messages > div > div { white-space: pre-line; }
					#NewChat-TellToInput:invalid, #NewChat-TellToInput, #NewChat-TellToInputError, #NewChat-Window[Maximized="true"], #NewChat-TellToMenuMobile #NewChat-TellToIDButton:hover:active, #NewChat-TellToMenuMobile #NewChat-TellToGo:hover:active { box-shadow: none; }
					#NewChat-ContextMenuBg, #NewChat-TellToMenuBg { z-index: 999; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { width: 500px; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -webkit-transform: translate(-50%, -50%); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -moz-transform: translate(-50%, -50%); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { transform: translate(-50%, -50%); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -webkit-transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px)); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -moz-transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px)); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px)); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { -webkit-transform: translate(-webkit-calc(-50% + 0.5px), -webkit-calc(-50% + 0.5px)); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { transform: translate(-webkit-calc(-50% + 0.5px), -webkit-calc(-50% + 0.5px)); }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { max-height: 80%; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { max-width: 80%; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { overflow: overlay; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { top: 50%; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { margin-left: 50%; }
					#NewChat-ContextMenuMobile, #NewChat-TellToMenuMobile { z-index: 1000; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuButton, #NewChat-ContextMenuMobile #NewChat-ContextMenuButtonWithIcon { padding: 8px 16px; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuButton, #NewChat-ContextMenuMobile #NewChat-ContextMenuButtonWithIcon, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo, #NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError { margin: 5px 0; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuInput { padding: 8px 13px; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuInput, #NewChat-TellToMenuMobile #NewChat-TellToGo { border: 0; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuInput { margin: 5px 0; }
					#NewChat-TellToIcon, #NewChat-TellToGo, #NewChat-Minimized, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftBorder, #NewChat-TabsRightBorder, #NewChat-Tabs, #NewChat-RepeatCounter:before, #NewChat-RepeatCounter:after, #NewChat-CloseTabButton, #NewChat-ContextMenuIcon, #NewChat-ChatTooltip:before, #NewChat-TitleIcon, #NewChat-TellToIDButton, #NewChat-UserTabIcon { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACACAYAAADktbcKAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOsAAADrABTsv9PgAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAEDdJREFUeF7tnT2S9LjRhPdKsnUG3UDedwo58nUAOTIl8zuBDIWusfdQhNwVk8PkJIsJAiRBNrunEPEMgapCFYhGYvrd31/+/H9//OUPv/v9b3vAnCPzlKM5etX+/3/85bcjsP67MrTfgPORlpjkMxiF5A56CQoI7J2rUIzOV6Jn7ZJ9qlGMYf13BKJmKwm8JSb5HHYJaZgwi4S4uBb2zu9d29lQIxLjBpvdyHdAxY0WBV7zJ5/Hqd+kZzgr4jPEuiXxE40dxnYj34WSyEv25LNZXACDYXHYryReAHfXjmPUL6Gxw9huZAsQ1ROEhTVoc2M3L/k8FhdAFMYVDEUpuJfWpm0aV5EcdiNrqMieIDBdj7YnrC25j/EHRECG8XzYr4RCfFVt7aNuDcYP/dUmtqCCe4rIdE1oT1lXch+L38J3QtE739XkBfAN1/WkNSX3kRfAhRcARKWwRbubeydPWEPyGvICuOgCgKhaG2IdLm+S9KTpAqBY9+DyKK1xV6B10R82ogrjh77dyAgE3NpKsXkJJFdTvQAo1CO4fKQl5iq0LvrDRlRh/NC3G+mAgBW2aC/BWJc7SXqweQFQpH/91z9/+/W//2kG8Zzr8oKanzBuDy6PojHoDxtRhfFD325kDQoaTfu1lhdAciXFC4Bi2it+UrsEtnwE/mGRu2nJq32XI8L4oW83ska8AFpgrMuXJD2wFwBs4Kj4AeaWLoGhsLUr8CHuKKXc0ddaR+bbjaxBQaNpv9byAkiuZPMCcMJupXQBcBztEfiGBZ7C5Yx1W+swfujbjWwBYq4RG2wuV5L04CUXAIurPTLFnaKQc6wdbFUYP/QXG7gXJ/JSS/EnV3PJBUDx5zcAD4QdLwLaFDc3SXrS/a8BqPjdBQCGwtauwIe4M7i8sGvd1joy327kESBythR88gqqFwBwQo+o6BXmKtWIdgLfsMBTuLxA67bWYfzQtxt5FF4CeQEkr6DpAjgDc5VqRDuBb1jgKVxeoHVb6zB+6NuNPAPEnxdA8grGHxQBDzmFAZyoW2EOzav5S7VDzCFcPqJraq3B+KG/2sQe5AWQvAL7DYDAB5y4a3CuywtqfoKYYaG7cHkUrduan/FD325kkrwjmxcAgF9xIi/h8pGWmAjih0UvBHkEras5t2D80LcbmSTvSPUCAIhRWi4AnT8UWvlRPMa1MM21PkepNv3MV0Py2Y1MkndktwgpIr0AXJxDY/fOVY7Mi7W1P2xEFcYPfbuRSfKOHP4tTJy/xFBw7h+ZfwZX+wi6eUny7hy6AMDReYSCcr6rYe0juE1Mknfl8AVwFgrK+a5mp5DHbw87OTpX6ybJ5eQFUCeKtIWj80Csv2DrHxra8iWJAxfAeAkMAyuW3qAOBfjK2q1wLte5hdY5iV0LxM0Whb7lS5IStwpQQd1X1tZN4FpkTQtfmGdpiWklrkFxQne2JGlhccDvBHVfWZsbwHVEdJMwDnMXmLyrmD3E+pEoeLYUf7KXH30BcA0ldKMwDvNHYs6J2X+EWNuhwkdL8SdHWBzswTD3rwR1UPeVtfHyXEMJxCiwMU/sh9ixzlFcbQcvgRR/cpTiob4K1FDUrnFXEGu3EDcMtpgzxgyMQj5KIaclxZ+cYfzBw04G2+KQ9yQe7lfVjnVLMF6BPeYzjO+yl626SdKb1W+0q+EBJy7mKmLtFtymgS2fMAu7hVrNJOnN7RcAGArPh935r0Rrt6CbdQTJM6P5I5yXJHfwkgsA8MA739Wwdgtu004wXwDBniQvIS+ACm7TTnJV3iTZzfhjOpBWLFdBEby69haIuYIrcyfJHn7sNwC8PNdQIm5WknwaP/oCAFxHRDcpST6V2y+AoegssFfWVmBToj9JPpXx8A8dK5grEbFZ/5WkyJPki8VvPyeWq9C6r6jtNiNJfhr5DSBJfjC3/zmc8AJwvqvJCyBJvsgLIEl+MNaYJMnPAP9FiUezWvCw5NK/A7/lS5JkjRXdk1gsdlzuV4tC3/IlSeJZiO2JLBYrIkej0Ev2o5ydnyTvwkJsT2S1YCN2bWfFy3xn8yTJOzAL7anYRQfRs/UQrebukU/pnS9JzrIQ2xNxiwYqVLRe4ro6b698SdKDWWhPxS46iJSth7hc7t55e+RLkh7MQnsqqwUHgbpxnLOHmI+td96z+ZKkB6PInsxisQURlexHiLm09c57Jl+S9GAU2ZNZLFZEFMWz5duD5nHtaO5S3qP5kqQHo8iezGrBw5JLotnytYL5pXYmt8t7Jl+S9GAhtifiFn0lTqhoZ8Ua857NlyQ9WIjtiawWPCyZRJ/SGhdBfGx7czg0b498SdKDhdieyGKxWO6f/jRTElJrnGOcK23P3C2Yt1e+JOnBKLIns1gslivCduJuidlinD+1PfNa6J0vSc4yC+2pLBaL5QZxq8Br/hbGHCi8Y06SvCuz0J7KasEbIi/ZY44aR+YkyTuyENsTsYsuiD2SQk6SbVaCexpu0aB2CaT4k6TOSnBPwy2alC6BFH+StGGN70BJ/CQvgSSpY41PpyZ+kpdAkmwzikmZjCvbVcT8tXrwl8Resrs8SZJMF4CKhTgBqd+N94J5aJwfx5HRP61LYXzN/xPh/4DlDFfmS17LSjRuLMGzjcSYPYzzpzbnm5rLOfplba52S0xP3AHfy1X5ZNyD7vmS1zMKxomGwgESPMfqE2jSVsYc0tx4FR/Wp/69cWd5usA65gLd8yWv5+vHIBAnGiccjS3FtDLmqbSYH2Oi9khr3BmeLrCY79dff21G503kBfCBzEJR8RP6JHiO1SfQpK2MORra0fxX804XgBN5DckF7PrcvBJhrt3T5F6+RBhEH8cSPNtIjNnDOL/SYm6Ma2j8UWJOhTGffgGE9azW5+bUkPmrPU/uB20hdqI2CZ79brwXzNPmxlvxpRbn7aVWh/nf7QLAuBXGl/IBFXYrMt/ufXIv42FXJuPKdgXIzcZabK6u+ream9sK5pZgQx+xURAnueUCEP8mJt5eADqukRfA87DGu6CoKKg4jqi/BP1ufg3OL7WY/0rBdiAvgKSKNd4JxVQaK/CpAPf6a3B+qcX8Vwq2A3kBJFWs8alEAe7119D5Edr5RPyVgu1AXgBJleVgOuxqa/H1JNbQMfoqwEjNX6M0X+18wn6lYDuQF0BS5buDw23+yn/N15OxjgisNo44P/o1tuZHO5+wXynYDuQFkFT57uBwTyJXoZfsvRnrTA39ONYY+h30x5xbLcbjGYl2xEeB1WBsgbwAkttZDnDQg9jjWON7MdaR5sYurtSuimcciQKrURGgFVgNjQ/kBZBUWRsgAhH93eJ3jbXxbEXz1zgSC6IgMK6h8YHLL4C9hPXkBfCBeONw0J8ifrSr6p+lIui9XJ4P473IfHsB7EXm2z1N7mVtCOJ/wiWgtdHXseJ8tXEJxJVgTBTESX5cvuT1LAfD4Y6ij2ON78VYR5obM+7ff//bCG2aI/poK41LMK4E57+JwJxvL7o/zr8XzZe8kO/OcKid2Ev23ox1poZ+HDPGCbHFjn4cs7bCOEdhLvpn0TU4/140X5IU+e4Mh7ok8i1fT8Y6QfA6po1CpBjj+Eisi4/QH+c9GXyrOMuV+ZLXshwMB7t0uLd8PYk1XE3YojidMEtxis6pxdOPJ+6lpyOC60H3fMnrscZ3IIoV41pMCc5lPJ4R2vmMYnsiHcUKuudLXo81Ph0KMQJ7S5yicxivtmjnM4rtidQE6/42HTHxeQF8INb4ZChC4sZHYjV+y85nFNsT2RKsE30kzGm6AFweEmLn/U1ehzU+FQqQYNxqRz+ONbfGM1aJ9ii2J3L2AgjzT32jIBK/2PvkNVjjU6EQnYCdj7bSOEJ/CZ3nBPc0ahcA/CXolzl5AXwg1tgKDpmzXwlEqEKs+WpjBb4ajI1ieyJRsE6QROMYe+QCcHYS/Kv9T+7HGlvBIXN2on4eSvW/M3yfJ6OCpdC3YCzjWy6AmENxsTK2+5rcizUCd6B6gzrxN6wjru0MMd/R/O59etKjxt4LIMbXLoA43xHjZbza0+R+rBG4A9UbiM/9WTtyVKQR1mO+OKaN/S0QF9H3AoxVm7IVz+cZnKBL0B/jOR7IC+ADsUbgDlRvcOhV6CVUHEfRWujHscbpuARiOF9zErXxXbXRR9SGLmrgeYaKoBeoaEnLBaDjSPSH8WpPk/uxRuAOVG9w2J14FPrdGlthHuLGGoumNgf8gPNdn2O+69SfY2IfbeqPNfA8w94LAP6IxBy6ACLiX+1pcj/WCNyB6g0OexSgUvO3wBxbaH702dQe+XJ/r09zxTFiGT8Opica+nGMB2ucQQUL8UUBKzX/wOlvAIHVnib3Y43AHaje4LBTJG4NNX8Nzq+h+dHXpj7ly/W9vpiTTPnm+HEwPV1jPGucIS+ApIY1AnegeoPDTpG4NdT8LTDHFpof/djUT77M6wsA/ThGLOPHwfREQz+O8WCNM8QLoEZeAD8PawTuQPUGh50icWtwfvRraA7OoSCZL4411jWNAV+m7/WxH8d4Ipbx42Dys+l4es41zhAFi3ENjQ/YC6CGxgfmvUxehzUCd6B6g8OugnHQjzVxXIPxis5FP441jo1xCuO+3N/r45j90ngcTDY82Y9j1jhDRdB76Z4veT3WCNyB6g0OO0W4BeKwpr3xEc6nP45pQ1ObA37A+QDTSkhMUzxqOPseprXiPc4yv7fYzqD5khdijcAdqN5QCC1wXdHu0PeIRL8bR5sDMbxweAnE91Mm/9xq8ajh7HuIa1ZaYpLPxxqJHqYrcDVfDYTp7BHEReL7KTEWxBgFNZy9Nz+5xc/0J2KNRwkHa3HYgfojMRbEGBLjFMboemKMovF74LyruKNGieHP+j+S+Bn/BOwBOAuEpV+Pa1+TJ/uquXjYXG7COXg5xm81jR83ZBizvwXmXMkdNRJP/Kw/GbsBZ4GItsQZmeyrFuMxjvkUtY8vNzy1MY6woT9vyOTjuASmXckdNRJP/Kw/GbsBZ4GAVKgqzBgLJvuqxXiMt3LSj+f4cl++RZtsc/w4mOI5R3OUYI6ruKNG4omf9SdjN+AsFFEE9hgLJvuqxXiMmcflVf/4cl92+uc2jRf+eUOGvualPYJpV3JHjcQTP+tPxm5ADyCeSIxRYixwMRQm+ypW9Y8vNzzR6NOmNjznDRn6MS99CqZdyR01Ek/8rD8ZuwFngWhKxFgQY5QYR1HqWMWqosVzCpzjtal/3pChrzk1n4JpV3JHjcQTP+tPxm7AGZyAFPhj/FbTePRjDtpijfHlvuJW8bHBNm/I0I/5NCfBtCu5o0bi0c/507EbcJSSeCKIY3xL03jNocT848sNTzbGEW0Yzxsy9Es1AOMw7UruqJF4+Bn/BOwGHAUCUSGWQBzjWxrjv7rbNRiLl2P8VtP4cUOm/HjS5sCcK7mjRuKJn/UnYzfgKBBNK0fiSfQpjMHL7Y0fN2Syc1yC867ijhqJJ37Wn4zdgKfiXqA3LeIHbn09uaNG4omf9SdjN+Cn4TamBZerF65eT1zN5Au3X5/JH3/5H6B5bMTU27VyAAAAAElFTkSuQmCC); }
					#NewChat-Minimized:hover:active { background-position: -31px 0; }
					#NewChat-TabsLeftBorder { background-position: -63px 0; }
					#NewChat-TabsRightBorder { background-position: -69px 0; }
					#NewChat-Minimize { background-position: -79px -75px; }
					#NewChat-Minimize:hover:active { background-position: -99px -75px; }
					#NewChat-RepeatCounter:before { background-position: -62px -30px; }
					#NewChat-RepeatCounter:after { background-position: -67px -30px; }
					#NewChat-TellToIcon { background-position: -76px 0; }
					#NewChat-TellToGo { background-position: -62px -49px; }
					#NewChat-TellToGo:hover:active { background-position: -83px -49px; }
					#NewChat-Tabs { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAbCAYAAAC9WOV0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAXSURBVBhXY/A1tP7PUJccM3CEr6H1fwCPRDtN5NPu8AAAAABJRU5ErkJggg==); }
					#NewChat-Tabs { background-repeat: repeat-x; }
					#NewChat-Input, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-CloseTabButton { -webkit-transition: filter .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Input, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-CloseTabButton { -moz-transition: filter .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Input, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore, #NewChat-TabsLeftButton, #NewChat-TabsRightButton, #NewChat-CloseTabButton { transition: filter .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Send { -webkit-transition: filter .125s cubic-bezier(0, 0, 0, 1), opacity .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Send { -moz-transition: filter .125s cubic-bezier(0, 0, 0, 1), opacity .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-Send { transition: filter .125s cubic-bezier(0, 0, 0, 1), opacity .125s cubic-bezier(0, 0, 0, 1); }
					#NewChat-CloseTabButton { background-position: 1px -72px; }
					#NewChat-CloseTabButton:hover:active { background-position: -9px -72px; }
					#NewChat-CloseTabButton { right: 11px; }
					#NewChat-CloseTabButton${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? '' : ', #NewChat-ContextMenuIcon'} { top: 8px; }${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? '\n					#NewChat-ContextMenuIcon { top: 9px; }' : ''}
					#NewChat-Body { -ms-interpolation-mode: nearest-neighbor; }
					#NewChat-Body { image-rendering: -webkit-optimize-contrast; }
					#NewChat-Body { image-rendering: -moz-crisp-edges; }
					#NewChat-Body { image-rendering: -o-pixelated; }
					#NewChat-Body { image-rendering: pixelated; }
					#NewChat-TellToGo:hover:active { box-shadow: inset 0 0 0 2px #7e635c; }
					#NewChat-TellToIDButton:hover:active { box-shadow: inset 0 0 0 3px #7e635c; }
					#NewChat-TellToGo:hover:active { border-color: #7e635c; }
					#NewChat-ContextMenuIcon, #NewChat-UserTabIcon { width: 11px; }
					#NewChat-ContextMenuIcon.Close { background-position: -43px -51px; }
					#NewChat-ContextMenuIcon.moveToFirst { background-position: -31px -85px; }
					#NewChat-ContextMenuIcon.moveToLast { background-position: -31px -73px; }
					#NewChat-ContextMenuIcon { left: 6px; }
					#NewChat-ContextMenuIcon.RestoreWindow { background-position: -67px -79px; }
					#NewChat-ContextMenuIcon.MinimizeWindow { background-position: -55px -79px; }
					#NewChat-ContextMenuIcon.MaximizeWindow { background-position: -43px -79px; }
					#NewChat-ContextMenu { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAATSURBVBhXY6hLjvlPa5zu7fsfANbsOdsUCZdYAAAAAElFTkSuQmCC); }
					#NewChat-ContextMenu { background-size: 26px 100%; }
					#NewChat-ContextMenuMobile #NewChat-ContextMenuLine, #NewChat-TellToMenuMobile #NewChat-TellToLine { margin: 3px 0; }
					#NewChat-ContextMenuButton[disabled=true], #NewChat-ContextMenuButtonWithIcon[disabled=true] { color: #bfa29a; }
					#NewChat-ContextMenuButton[disabled=true], #NewChat-ContextMenuButton[disabled=true]:hover, #NewChat-ContextMenuButtonWithIcon[disabled=true], #NewChat-ContextMenuButtonWithIcon[disabled=true]:hover, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { background: none; }
					[disabled=true] #NewChat-ContextMenuIcon.Close { background-position: -43px -91px; }
					[disabled=true] #NewChat-ContextMenuIcon.moveToFirst { background-position: -55px -103px; }
					[disabled=true] #NewChat-ContextMenuIcon.moveToLast { background-position: -55px -91px; }
					[disabled=true] #NewChat-ContextMenuIcon.RestoreWindow { background-position: -67px -91px; }
					[disabled=true] #NewChat-ContextMenuIcon.MinimizeWindow { background-position: -43px -103px; }
					[disabled=true] #NewChat-ContextMenuIcon.MaximizeWindow { background-position: -31px -103px; }
					#NewChat-ChatTooltip:before { background-position: -72px -28px; }
					#NewChat-ChatTooltip:before { height: 10px; }
					#NewChat-Messages .ClickableNick { cursor: pointer; }
					#NewChat-WindowTitle { padding-left: 25px; }
					#NewChat-TitleIcon { width: 17px; }
					#NewChat-TitleIcon { height: 15px; }
					#NewChat-TitleIcon { background-position: -85px -28px; }
					#NewChat-TitleIcon { top: 10px; }
					[disabled=true] #NewChat-ContextMenuIcon.Cursor { background-position: -67px -116px; }
					#NewChat-ContextMenuIcon.Cursor, #NewChat-UserTabIcon { background-position: -67px -104px; }
					#NewChat-TellToIDButton { background-position: -120px 9px; }
					#NewChat-TellToIDButton, #NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { width: 19px; }
					#NewChat-TellToIDButton:hover:active { background-position: -103px -19px; }
					#NewChat-Minimize, #NewChat-Maximize, #NewChat-Restore { height: 19px; }
					#NewChat-Minimize { right: 29px; }
					#NewChat-Maximize { background-position: -119px -74px; }
					#NewChat-Maximize:hover:active { background-position: -139px -74px; }
					#NewChat-Restore { background-position: -119px -94px; }
					#NewChat-Restore:hover:active { background-position: -139px -94px; }
					#NewChat-Window[Maximized="true"] { border: 10px solid #aba389; }
					#NewChat-Window[Maximized="true"] { height: -webkit-calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { height: -moz-calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { height: calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { width: -webkit-calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { width: -moz-calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { width: calc(100% - 20px) !important; }
					#NewChat-Window[Maximized="true"] { top: 0 !important; }
					#NewChat-Window[Maximized="true"] { left: 0 !important; }
					#NewChat-Window[Maximized="true"] { min-height: -webkit-calc(100% - 20px); }
					#NewChat-Window[Maximized="true"] { min-height: -moz-calc(100% - 20px); }
					#NewChat-Window[Maximized="true"] { min-height: calc(100% - 20px); }
					#NewChat-FlexBottom { height: 44px; }
					#NewChat-Input, #NewChat-TellToMenuMobile #NewChat-TellToGo { padding: 0; }
					#NewChat-Messages { scrollbar-color: #4d313b #7e635c; }
					#NewChat-TabInnerBorder { border: 3px solid rgba(0, 0, 0, 0); }
					#NewChat-TabInnerBorder { -webkit-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAkSURBVChTY/j//z9ezFCXHAOksUuC5AaFAmwSyBirIAL/ZwAAjUC3t5EDsNgAAAAASUVORK5CYII=) 3 3 stretch; }
					#NewChat-TabInnerBorder { -o-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAkSURBVChTY/j//z9ezFCXHAOksUuC5AaFAmwSyBirIAL/ZwAAjUC3t5EDsNgAAAAASUVORK5CYII=) 3 3 stretch; }
					#NewChat-TabInnerBorder { border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAkSURBVChTY/j//z9ezFCXHAOksUuC5AaFAmwSyBirIAL/ZwAAjUC3t5EDsNgAAAAASUVORK5CYII=) 3 3 stretch; }
					#NewChat-TabInnerBorder { -moz-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAkSURBVChTY/j//z9ezFCXHAOksUuC5AaFAmwSyBirIAL/ZwAAjUC3t5EDsNgAAAAASUVORK5CYII=) 3 3 stretch; }
					#NewChat-Window[maximized="true"] { box-shadow: 0 -1px #93928f, 0 -2px #e1ded5, 0 -3px 5px #000; }
					#NewChat-Input { line-height: 1em; }
					#NewChat-Messages::-webkit-scrollbar-button:horizontal:decrement, #NewChat-ContextMenu::-webkit-scrollbar-button:horizontal:decrement { background-position: -32px -16px; }
					#NewChat-Messages::-webkit-scrollbar-button:horizontal:increment, #NewChat-ContextMenu::-webkit-scrollbar-button:horizontal:increment { background-position: 0 -16px; }
					#NewChat-UserTabIcon { margin-top: 8px; }
                    #NewChat-UserTabIcon { margin-right: 4px; }
					#NewChat-UserTabIcon { margin-left: -1px; }
					#NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError, #NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { height: 35px; }
					#NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { line-height: 35px; }
					#NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToIDButton:hover:active, #NewChat-TellToMenuMobile #NewChat-TellToGo, #NewChat-TellToMenuMobile #NewChat-TellToGo:hover:active { background-image: none; }
					#NewChat-TellToMenuMobile #NewChat-TellToIDButton, #NewChat-TellToMenuMobile #NewChat-TellToGo { float: none; }
					#NewChat-TellToMenuMobile #NewChat-TellToInput, #NewChat-TellToMenuMobile #NewChat-TellToInputError { padding: 0 12px; }
					@media (max-width: 500px) {
						#NewChat-Window { border: 0; }
						#NewChat-Window, #NewChat-Window[minimized='true'] { left: 0; }
						#NewChat-Window { top: auto; }
						#NewChat-Window, #NewChat-Window[minimized='true']:not([style*="top:"]), #NewChat-Window[minimized='true'] { bottom: -50px; }
						#NewChat-Window { padding: 0 10px 60px 11px; }
						#NewChat-Window, #NewChat-FlexBottom { -moz-box-sizing: border-box; }
						#NewChat-Window, #NewChat-FlexBottom { -webkit-box-sizing: border-box; }
						#NewChat-Window, #NewChat-FlexBottom { box-sizing: border-box; }
						#NewChat-Window { box-shadow: 0 -9px #aba389, 0 -10px #93928f, 0 -11px #e1ded5, 0 -12px 5px #000; }
						#NewChat-FlexBottom { padding-right: 20px; }
						#NewChat-Minimize { right: 24px; }
						#NewChat-FlexTop { padding-right: 52px; }
						#NewChat-Window[minimized='true'] { -webkit-transform: none; }
						#NewChat-Window[minimized='true'] { -moz-transform: none; }
						#NewChat-Window[minimized='true'] { transform: none; }
						#NewChat-Window { min-height: 273px; }
						#NewChat-Window { min-width: 0; }
						#NewChat-Window { height: 50% !important; }
						#NewChat-Window { -webkit-transition: opacity .35s cubic-bezier(.5, 0, 0, 1), transform .35s ease-out; }
						#NewChat-Window { -moz-transition: opacity .35s cubic-bezier(.5, 0, 0, 1), transform .35s ease-out; }
						#NewChat-Window { transition: opacity .35s cubic-bezier(.5, 0, 0, 1), transform .35s ease-out; }
						#NewChat-Window[minimized='true'] { -webkit-transition: none; }
						#NewChat-Window[minimized='true'] { -moz-transition: none; }
						#NewChat-Window[minimized='true'] { transition: none; }
						#NewChat-Window[minimized='true']:not([style*="top:"]), #NewChat-Window[minimized='true'] { -webkit-transform: translateY(243px); }
						#NewChat-Window[minimized='true']:not([style*="top:"]), #NewChat-Window[minimized='true'] { -moz-transform: translateY(243px); }
						#NewChat-Window[minimized='true']:not([style*="top:"]), #NewChat-Window[minimized='true'] { transform: translateY(243px); }
						#NewChat-Window { top: auto !important; }
						#NewChat-Window { left: 0 !important; }
						#NewChat-Window[minimized='true'] { top: -webkit-calc(100vh - 120px) !important; }
						#NewChat-Window[minimized='true'] { top: -moz-calc(100vh - 120px) !important; }
						#NewChat-Window[minimized='true'] { top: calc(100vh - 120px) !important; }
						#NewChat-Window { max-width: 100%; }
						#NewChat-Window { min-width: 100%; }
						#NewChat-Send { margin-right: -2px; }
						#NewChat-Maximize, #NewChat-Restore { display: none; }
					}
					@media (max-width: 500px) and (max-height: 232px) { 
						#NewChat-Window { min-height: -webkit-calc(100% + 41px); }
						#NewChat-Window { max-height: -moz-calc(100% + 41px); }
						#NewChat-Window { max-height: calc(100% + 41px); }
					}
					@-webkit-keyframes NewChatUnreadBorder { 0% { opacity: 0; } 100% { opacity: 1; } }
					@-moz-keyframes NewChatUnreadBorder { 0% { opacity: 0; } 100% { opacity: 1; } }
					@-o-keyframes NewChatUnreadBorder { 0% { opacity: 0; } 100% { opacity: 1; } }
					@-ms-keyframes NewChatUnreadBorder { 0% { opacity: 0; } 100% { opacity: 1; } }
					@keyframes NewChatUnreadBorder { 0% { opacity: 0; } 100% { opacity: 1; } }
					@-webkit-keyframes NewChatFadeIn { from { opacity: 0; } to { opacity: 1; } }
					@-moz-keyframes NewChatFadeIn { from { opacity: 0; } to { opacity: 1; } }
					@-o-keyframes NewChatFadeIn { from { opacity: 0; } to { opacity: 1; } }
					@-ms-keyframes NewChatFadeIn { from { opacity: 0; } to { opacity: 1; } }
					@keyframes NewChatFadeIn { from { opacity: 0; } to { opacity: 1; } }
			`;

			window.addEventListener('keydown', (eve) => {
				eve = eve || window.event;
				if (document.activeElement === Input) {
					eve.stopPropagation();
					eve.stopImmediatePropagation();
				}
				let activeelem = document.activeElement;
				let keyCode = eve.which || eve.keyCode;
				if (activeelem === Input) {
					switch (keyCode) {
					case 13:
						ContextMenuBoolean = false;
						$hts = false;
						if (!eve.shiftKey && !isMinimized) {
							if (Input.value.replace(/[ \t\r\n]+/g, '') !== '') {
								if (eve.preventDefault) eve.preventDefault();
								Send.click();
							}
							Input.blur();
						}
						break;
					default:
						return true;
					}
				} else {
					switch (keyCode) {
					case 13:
						if (Body.getAttribute('hidePart') == 'false') {
							if (activeelem.id == 'NewChat-TellToInput' || activeelem.id == 'NewChat-TellToInputError') {
								if (TellToInput.value !== '' && TellToInput.value > 0) {
									$hts = false;
									TellMenuShown = false;
									if (tabsList.indexOf(`<div id="NewChat-UserTabIcon"></div>${TellToInput.value}`) < 0 && TabsEnabled) newTab(`<div id="NewChat-UserTabIcon"></div>${TellToInput.value}`, true, `/tell ${TellToInput.value} `, '', `Tell to ${TellToInput.value}`, false);
									if (TabsEnabled) selectTab(`<div id="NewChat-UserTabIcon"></div>${TellToInput.value}`);
									if (TellToButton.id == 'NewChat-TellToButtonClicked') TellToButton.id = 'NewChat-TellToButton';
									TellToMenu.style.display = 'none';
									if (isMobile) TellToMenuBg.style.display = 'none';
									TellToInput.value = '';
									$hts = false;
								} else TellToInput.id = 'NewChat-TellToInputError';
							} else if (activeelem.className == 'ContextMenuTellTo') {
								if (activeelem.value.replace(/\s/g, '').length > 0) {
									let str1 = activeelem.placeholder.split(' ')[2].substring(0, activeelem.placeholder.split(' ')[2].length);
									if (tabsList.indexOf(`<div id="NewChat-UserTabIcon"></div>${str1}`) < 0 && TabsEnabled) newTab(`<div id="NewChat-UserTabIcon"></div>${str1}`, true, `/tell ${str1} `, '', `Tell to ${str1}`, false);
									selectTab(`<div id="NewChat-UserTabIcon"></div>${str1}`);
									Input.focus();
									sendChat(activeelem.value.startsWith('/') ? activeelem.value : `/tell ${str1} ${activeelem.value}`);
									if (typeof ContextMenu !== 'undefined' && ContextMenuBoolean) ContextMenuBoolean = false;
								}
							} else if (activeelem.className == 'ContextMenuInputTab') {
								if (activeelem.value.split(' ').join('') !== '') {
									sendChat(`${ContextMenuInputStringBefore}${activeelem.value}${ContextMenuInputStringAfter}`);
									if (typeof ContextMenu !== 'undefined' && ContextMenuBoolean) ContextMenuBoolean = false;
								}
							} else if (activeelem.className !== 'ContextMenuTellTo' || activeelem.className !== 'ContextMenuInputTab') {
								if (isMinimized) restoreWindow();
								Input[activeelem.id == 'NewChat-Input' && activeelem.value == '' ? 'blur' : 'focus']();
								if (typeof ContextMenu !== 'undefined' && ContextMenuBoolean) ContextMenuBoolean = false;
							}
						}
						if (eve.preventDefault) eve.preventDefault();
						break;
					case 27:
						ContextMenuBoolean = false;
						$hts = false;
						if (eve.preventDefault) eve.preventDefault();
						break;
					case 37:
						if (eve.shiftKey && !isMinimized) {
							getCurrentTabThen: for (let i = 0; i < TabsSpan.childNodes.length; i++) {
								if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
									if (TabsSpan.childNodes[i].childNodes[2].innerHTML == SelectedTab && typeof TabsSpan.childNodes[i - 1] !== 'undefined') {
										if (typeof TabsSpan.childNodes[i - 1].childNodes[2] !== 'undefined') {
											if (eve.stopPropagation) eve.stopPropagation();
											if (eve.stopImmediatePropagation) eve.stopImmediatePropagation();
											selectTab(TabsSpan.childNodes[i - 1].childNodes[2].innerHTML);
											break getCurrentTabThen;
										}
									}
								}
							}
						}
						break;
					case 39:
						if (eve.shiftKey && !isMinimized) {
							getCurrentTabThen: for (let i = 0; i < TabsSpan.childNodes.length; i++) {
								if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') {
									if (TabsSpan.childNodes[i].childNodes[2].innerHTML == SelectedTab && typeof TabsSpan.childNodes[i + 1] !== 'undefined') {
										if (typeof TabsSpan.childNodes[i + 1].childNodes[2] !== 'undefined') {
											if (eve.stopPropagation) eve.stopPropagation();
											if (eve.stopImmediatePropagation) eve.stopImmediatePropagation();
											selectTab(TabsSpan.childNodes[i + 1].childNodes[2].innerHTML);
											break getCurrentTabThen;
										}
									}
								}
							}
						}
						break;
					case 112:
						ChatWindowDragging = false;
						ChatWindow.setAttribute('dragging', 'false');
						if (eve.preventDefault) eve.preventDefault();
						break;
					default:
						return true;
					}
				}
				return false;
			});
			
			if (!TabsEnabled) Input.placeholder = 'Chat here';

			let toggleTabslabel = document.createElement('label');
			let toggleTabsText = document.createElement('span');
		
			toggleTabsText.innerHTML = 'Disable chat tabs (requires refresh)';
		
			let toggleTabsCheckBox = document.createElement('input');
			toggleTabsCheckBox.type = 'checkbox';
			toggleTabsCheckBox.checked = !JSON.parse(localstr.chatTabsEnabled.toLowerCase());
			toggleTabsCheckBox.id = 'disable-chat-tabs';
			toggleTabsCheckBox.onchange = () => {
				localstr.chatTabsEnabled = !TabsEnabled;
			};

			toggleTabslabel.appendChild(toggleTabsCheckBox);
			toggleTabslabel.appendChild(toggleTabsText);

			helpWindowContent.appendChild(toggleTabslabel);
			
			let TitleMenu = () => {
				return [ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].RestoreWindow()['RestoreWindow'] : null, ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].MinimizeWindow()['MinimizeWindow'] : !isMinimized ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].MinimizeWindow()['MinimizeWindow'] : ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].RestoreWindow()['RestoreWindow'], ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].MaximizeWindow()['MaximizeWindow'] : null, ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].line()['line'], ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].resetWindowPosition()['resetWindowPosition'] : null, ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].resetWindowSize()['resetWindowSize'] : null, ifWidthIsAbove500() ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].line()['line'] : null, ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].markAllAsRead(TabsEnabled ? 'Mark all tabs as read' : 'Mark as read')['markAllAsRead']];
			};
			
			TitleIcon.addEventListener('mousedown', function (eve) {
				eve = eve || window.event;
				if (eve.stopPropagation) eve.stopPropagation();
				let eve1 = eve.button;
				let eve2 = eve.which;
				ContextMenuBoolean = false;
				$hts = false;
				if (eve1 == 0 || eve2 == 1) newContextMenu(TitleMenu(), ContextMenu.offsetTop + ContextMenu.offsetHeight - 1 > window.innerHeight ? window.innerHeight - ContextMenu.offsetHeight : Math.round(this.getBoundingClientRect().top + 17), ContextMenu.offsetLeft + ContextMenu.offsetWidth - 1 > window.innerWidth ? window.innerWidth - ContextMenu.offsetWidth : Math.round(this.getBoundingClientRect().left - 2));
			});

			let diffX, diffY, mouseX, ChatWindowDragging = false;

			let titlefunct = function (e) {
				e = e || window.event;
				let eve = e.button;
				let eve2 = e.which;
				if ((eve == 0 || eve2 == 1) && ifWidthIsAbove500()) {
					posX = e.clientX;
					posY = e.clientY;
					mouseX = e.clientX;
					divTop = isMaximized ? 0 : ChatWindow.style.top == '' ? ChatWindow.offsetTop : ChatWindow.style.top;
					divLeft = isMaximized ? TabsEnabled ? 0 : mouseX - chatWindowWidthCutHalf : ChatWindow.style.left == '' ? ChatWindow.offsetLeft : ChatWindow.style.left;
					if (!isMaximized) {
						if (ChatWindow.style.top !== '') divTop = divTop.replace('px', '');
						if (ChatWindow.style.left !== '') divLeft = divLeft.replace('px', '');
					}
					diffX = posX - divLeft;
					diffY = posY - divTop;
					ChatWindowDragging = true;
				}
			};
			
			window.addEventListener('mousemove', (e) => {
				e = e || window.event;
				if (ChatWindowDragging) {
					isWindowPositionDefault = false;
					if (isMaximized) {
						restoreMaximizedWindow();
						ChatWindow.style.left = `${mouseX - chatWindowWidthCutHalf}px`;
						ChatWindow.style.top = 0;
					}
					ChatWindow.setAttribute('dragging', 'true');
					if (ChatWindow.style.left == '') ChatWindow.style.left = `${divLeft}px`;
					if (ChatWindow.style.top == '') ChatWindow.style.top = `${divTop}px`;
					let posX = e.clientX,
						posY = e.clientY,
						aX = posX - diffX,
						aY = posY - diffY,
						bodywidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
						bodyheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					ChatWindow.style.left = `${posX < 0 ? - diffX : posX > bodywidth ? bodywidth - diffX : aX}px`;
					ChatWindow.style.top = `${posY < 0 ? - diffY : posY > bodyheight ? bodyheight - diffY : aY}px`;
				}
			});
		
			Title.addEventListener('mousedown', titlefunct, {
				passive: true
			});
			Title.addEventListener('touchstart', titlefunct, {
				passive: true
			});

			let newContextMenu = (json = {}, top = 'auto', left = 'auto', right = 'auto', bottom = 'auto', maxHeight = '', scrollX = false, scrollY = false, afterCloseRunFunct = () => {}) => {
				window.setTimeout(() => {
					ContextMenuBoolean = false;
					if (!ContextMenuShown) {
						ContextMenuBoolean = true;
						afterCloseRunFunction = afterCloseRunFunct;
						ContextMenuBg = document.createElement('div');
						ContextMenuBg.id = 'NewChat-ContextMenuBg';
						ContextMenuBg.addEventListener('mouseup', () => ContextMenuBoolean = false, {
							passive: true
						});
						ContextMenuBg.addEventListener('contextmenu', () => ContextMenuBoolean = false, {
							passive: true
						});
						ContextMenuBg.addEventListener('touchend', () => ContextMenuBoolean = false, {
							passive: true
						});
						if (isMobile) Body.appendChild(ContextMenuBg);
						ContextMenu = document.createElement('div');
						if (isMobile) ContextMenu.id = 'NewChat-ContextMenuMobile';
						else ContextMenu.id = 'NewChat-ContextMenu';
						if (!isMobile) {
							ContextMenu.style.top = `${top}px`;
							if (ContextMenu.style.top !== `${top}px`) ContextMenu.style.top = top;
							ContextMenu.style.bottom = `${bottom}px`;
							if (ContextMenu.style.bottom !== `${bottom}px`) ContextMenu.style.bottom = bottom;
							ContextMenu.style.left = `${left}px`;
							if (ContextMenu.style.left !== `${left}px`) ContextMenu.style.left = left;
							ContextMenu.style.right = `${right}px`;
							if (ContextMenu.style.right !== `${right}px`) ContextMenu.style.right = right;
							ContextMenu.style.maxHeight = maxHeight;
							if (scrollY) ContextMenu.style.overflowY = 'scroll';
							if (scrollX) ContextMenu.style.overflowX = 'scroll';
						}
						if (!isMobile) ContextMenu.style.pointerEvents = 'none';
						ContextMenu.addEventListener('mousedown', () => isContextMenuClicked = true, {
							passive: true
						});
						ContextMenu.addEventListener('touchstart', () => isContextMenuClicked = true, {
							passive: true
						});
						for (let i = 0; i < Object.keys(json).length; i++) {
							let elemItem;
							if (typeof json[Object.keys(json)[i]] !== 'undefined') {
								if (typeof HTMLElement === 'object' ? json[Object.keys(json)[i]] instanceof HTMLElement : json[Object.keys(json)[i]] && typeof json[Object.keys(json)[i]] === 'object' && json[Object.keys(json)[i]] !== null && json[Object.keys(json)[i]].nodeType === 1 && typeof json[Object.keys(json)[i]].nodeName === 'string') ContextMenu.appendChild(json[Object.keys(json)[i]]); else if (json[Object.keys(json)[i]] !== null) {
									elemItem = document.createElement(json[Object.keys(json)[i]].type.toLowerCase() == 'input' ? 'input' : 'div');
									elemItem.id = json[Object.keys(json)[i]].type.toLowerCase() == 'button' ? `NewChat-ContextMenuButton${typeof json[Object.keys(json)[i]].icon !== 'undefined' ? 'WithIcon' : ''}` : json[Object.keys(json)[i]].type.toLowerCase() == 'line' ? 'NewChat-ContextMenuLine' : json[Object.keys(json)[i]].type.toLowerCase() == 'input' ? 'NewChat-ContextMenuInput' : undefined;
									if (typeof json[Object.keys(json)[i]].style !== 'undefined') elemItem.style.cssText = json[Object.keys(json)[i]].style;
									if (json[Object.keys(json)[i]].type.toLowerCase() !== 'line' && json[Object.keys(json)[i]].type.toLowerCase() !== 'input') elemItem.textContent = json[Object.keys(json)[i]].textcontent;
									if (typeof json[Object.keys(json)[i]].icon !== 'undefined' && json[Object.keys(json)[i]].type.toLowerCase() !== 'line' && json[Object.keys(json)[i]].type.toLowerCase() !== 'input') { 
										let iconElem = document.createElement('div');
										iconElem.id = 'NewChat-ContextMenuIcon';
										iconElem.className = json[Object.keys(json)[i]].icon;
										elemItem.appendChild(iconElem);
									}
									ContextMenu.appendChild(elemItem);
									if (typeof json[Object.keys(json)[i]].onclick !== 'undefined') elemItem.onclick = json[Object.keys(json)[i]].onclick;
									if (typeof json[Object.keys(json)[i]].placeholder !== 'undefined') elemItem.placeholder = json[Object.keys(json)[i]].placeholder;
									if (typeof json[Object.keys(json)[i]].maxLength !== 'undefined') elemItem.maxLength = json[Object.keys(json)[i]].maxLength;
									if (typeof json[Object.keys(json)[i]].className !== 'undefined') elemItem.className = json[Object.keys(json)[i]].className;
									if (typeof json[Object.keys(json)[i]].typeAttr !== 'undefined') elemItem.type = json[Object.keys(json)[i]].typeAttr;
									if (typeof json[Object.keys(json)[i]].disabled == 'boolean') elemItem.setAttribute('disabled', json[Object.keys(json)[i]].disabled);
								}
							}
						}
						Body.appendChild(ContextMenu);
						let height = ContextMenu.offsetHeight + 1;
						let Opacity = 0;
						let fadeIn = () => {
							if (Opacity >= 1 || !ContextMenuBoolean) {
								if (!isMobile) ContextMenu.style.height = '';
								ContextMenu.style.opacity = 1;
								if (isMobile) ContextMenuBg.style.opacity = .5;
								ContextMenu.style.pointerEvents = '';
								cancelanimation(fadeIn);
							} else {
								if (!isMobile && Opacity * height < height - 13) ContextMenu.style.height = `${Opacity * height}px`;
								ContextMenu.scrollTop = ContextMenu.scrollHeight;
								ContextMenu.style.opacity = Opacity;
								if (isMobile) ContextMenuBg.style.opacity = Opacity * .5;
								Opacity += .1;
								requestanimation(fadeIn);
							}
						};
						if (typeof requestanimation == 'function') requestanimation(fadeIn); else {
							let MenuKillerInterval = window.setInterval(() => {
								if (Opacity >= 1) {
									clearInterval(MenuKillerInterval);
									if (!isMobile) ContextMenu.style.height = '';
									ContextMenu.style.opacity = 1;
									ContextMenuBg.style.opacity = .5;
									ContextMenu.style.pointerEvents = '';
								} else {
									if (!isMobile && Opacity * height < height - 14) ContextMenu.style.height = `${Opacity * height}px`;
									ContextMenu.scrollTop = ContextMenu.scrollHeight;
									ContextMenu.style.opacity = Opacity;
									ContextMenuBg.style.opacity = Opacity * .5;
								}
								Opacity += .023;
							}, 0);
						}
						if (!isMobile && ContextMenu.style.top !== '' && ContextMenu.offsetTop + ContextMenu.offsetHeight - 1 > window.innerHeight) ContextMenu.style.top = `${window.innerHeight - ContextMenu.offsetHeight}px`;
						if (!isMobile && ContextMenu.style.left !== '' && ContextMenu.offsetLeft + ContextMenu.offsetWidth - 1 > window.innerWidth) ContextMenu.style.left = `${window.innerWidth - ContextMenu.offsetWidth}px`;
						ContextMenuShown = true;
					}
				}, 40);
			};
			
			let onmouseclose = false, isTabPressed = false;

			let newTab = (name, isCloseable, StringBefore, StringAfter, Placeholder, SelectAfterCreating) => {
				let v = document.createElement('div');
				v.id = 'NewChat-Tab';
				v.innerHTML = `<div id="NewChat-TabInnerBorder"></div><div id="NewChat-UnreadBorder" style="display: none;"></div><div id="NewChat-NameTab" ${isCloseable && TabsEnabled && !isMobile ? 'class="closeable"' : ''}>${name}</div>`;
				let UnreadBorder = v.children[1];
				v.addEventListener('mousedown', (e) => {
					e = e || window.event;
					if (e.preventDefault) e.preventDefault();
					if (e.stopPropagation) e.stopPropagation();
					onmouseclose = false;
					isTabPressed = true;
					$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
					if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
				});
				v.addEventListener('mousestart', (e) => {
					e = e || window.event;
					if (e.preventDefault) e.preventDefault();
					if (e.stopPropagation) e.stopPropagation();
					onmouseclose = false;
					isTabPressed = true;
					$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
					if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
				});
				v.onmouseup = function (e = window.event || {
					'button': '-1',
					'which': '-1',
				}, forceClick = false) {
					let eve = e.button;
					let eve2 = e.which;
					if (forceClick) isTabPressed = true;
					if ((eve === 0 || eve2 === 1 || forceClick) && isTabPressed && SelectedTab !== name) {
						InputValues[SelectedTab] = Input.value;
						if (TabsEnabled) {
							for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected') TabsSpan.childNodes[i].id = 'NewChat-Tab';
							v.id = 'NewChat-TabSelected';
						}
						for (let i = 0; i < Messages.childNodes.length; i++) Messages.childNodes[i].style.display = Messages.childNodes[i].getAttribute('page') == name ? 'block' : 'none';
						Messages.scrollTop = Messages.scrollHeight;
						SelectedTab = name;
						Unread[name] = 0;
						for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].contains(TabsSpan.childNodes[i].childNodes[2]) && TabsSpan.childNodes[i].id == 'NewChat-TabSelected') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == name) SelectedTabID = i;
						if (FlexTop.contains(TabsSpan)) TabsSpan.childNodes[SelectedTabID].childNodes[1].style.display = 'none';
						Input.value = InputValues[SelectedTab];
						Input.placeholder = Placeholder;
						Input.maxLength = (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - StringBefore.length - StringAfter.length;
						InputStringBefore = StringBefore;
						InputStringAfter = StringAfter;
						UnreadBorder.style.display = 'none';
						v.scrollIntoView();
					}
				};
				v.ontouchstart = function (e = window.event || {
					'button': '-1',
					'which': '-1',
				}, forceClick = false) {
					let eve = e.button;
					let eve2 = e.which;
					if (forceClick) isTabPressed = true;
					if ((eve === 0 || eve2 === 1 || forceClick) && isTabPressed && SelectedTab !== name) {
						InputValues[SelectedTab] = Input.value;
						if (TabsEnabled) {
							for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected') TabsSpan.childNodes[i].id = 'NewChat-Tab';
							v.id = 'NewChat-TabSelected';
						}
						for (let i = 0; i < Messages.childNodes.length; i++) Messages.childNodes[i].style.display = Messages.childNodes[i].getAttribute('page') == name ? 'block' : 'none';
						Messages.scrollTop = Messages.scrollHeight;
						SelectedTab = name;
						Unread[name] = 0;
						for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].contains(TabsSpan.childNodes[i].childNodes[2]) && TabsSpan.childNodes[i].id == 'NewChat-TabSelected') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == name) SelectedTabID = i;
						if (FlexTop.contains(TabsSpan)) TabsSpan.childNodes[SelectedTabID].childNodes[1].style.display = 'none';
						Input.value = InputValues[SelectedTab];
						Input.placeholder = Placeholder;
						Input.maxLength = (window.OWOP.player.rank == 3 ? 16384 : window.OWOP.player.rank == 2 ? 512 : 128) - StringBefore.length - StringAfter.length;
						InputStringBefore = StringBefore;
						InputStringAfter = StringAfter;
						UnreadBorder.style.display = 'none';
						v.scrollIntoView();
					}
				};
				if (TabsEnabled) TabsSpan.appendChild(v);
				if (isCloseable && TabsEnabled && !isMobile) {
					let closetabbutton = document.createElement('div');
					closetabbutton.id = 'NewChat-CloseTabButton';
					closetabbutton.addEventListener('mousedown', (e) => {
						e = e || window.event;
						if (e.preventDefault) e.preventDefault();
						if (e.stopPropagation) e.stopPropagation();
						onmouseclose = true;
						isTabPressed = false;
						$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
						if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
					}, false);
					closetabbutton.addEventListener('touchstart', (e) => {
						e = e || window.event;
						if (e.preventDefault) e.preventDefault();
						if (e.stopPropagation) e.stopPropagation();
						onmouseclose = true;
						isTabPressed = false;
						$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
						if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
					}, {
						passive: true
					});
					closetabbutton.addEventListener('mouseup', (e) => {
						if (e.preventDefault) e.preventDefault();
						if (e.stopPropagation) e.stopPropagation();
						$hts = false;
						ContextMenuBoolean = false;
						let eve = e.button;
						let eve2 = e.which;
						let Public = tabsList.indexOf(PublicTabName) > -1 ? PublicTabName : tabsList[0];
						if ((eve == 0 || eve2 == 1) && onmouseclose) {
							if (SelectedTab == name) selectTab(Public);
							closeTab(name);
						}
						onmouseclose = false;
						stopResize();
					}, false);
					closetabbutton.addEventListener('touchend', (e) => {
						if (e.preventDefault) e.preventDefault();
						if (e.stopPropagation) e.stopPropagation();
						$hts = false;
						ContextMenuBoolean = false;
						let eve = e.button;
						let eve2 = e.which;
						let Public = tabsList.indexOf(PublicTabName) > -1 ? PublicTabName : tabsList[0];
						if ((eve == 0 || eve2 == 1) && onmouseclose) {
							if (SelectedTab == name) selectTab(Public);
							closeTab(name);
						}
						onmouseclose = false;
						stopResize();
					}, false);
					v.appendChild(closetabbutton);
				}
				Unread[name] = 0;
				InputValues[name] = '';
				if (isCloseable) CloseableTabs.push(name);
				tabsList.push(name);
				let u = document.createElement('div');
				u.setAttribute('page', name);
				u.style.display = 'none';
				let e = document.createElement('div');
				e.id = 'NewChat-EmptyTabMessage';
				e.textContent = 'There\'s no available messages on this tab.';
				u.appendChild(e);
				Messages.appendChild(u);
				if (TabsEnabled) {
					TabsSpan.appendChild(TellToButton);
					TabsSpan.appendChild(LastTabSpace);
					TabsSpan.appendChild(GradientLeft);
					TabsSpan.appendChild(GradientRight);
					v.addEventListener('contextmenu', (eve) => {
						eve = eve || window.event;
						if (eve.preventDefault) eve.preventDefault();
						if (eve.stopPropagation) eve.stopPropagation();
						window.setTimeout(() => {
							v.id = 'NewChat-TabSelected';
							ContextMenuInputStringBefore = StringBefore;
							ContextMenuInputStringAfter = StringAfter;
							newContextMenu([ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].Close(undefined, name)['Close'], ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].MarkAsRead(undefined, name)['MarkAsRead'], ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].line()['line'], ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].moveToFirst(undefined, name)['moveToFirst'], ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].moveToLast(undefined, name)['moveToLast'], /^\d+$/.test(name) || name.startsWith('<div id="NewChat-UserTabIcon"></div>') || name !== SelectedTab ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].line()['line'] : undefined, /^\d+$/.test(name) || name.startsWith('<div id="NewChat-UserTabIcon"></div>') ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].Mute(name.startsWith('<div id="NewChat-UserTabIcon"></div>') ? name.slice(36, name.length) : name)['Mute'] : undefined, name !== SelectedTab ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].InputTab(StringBefore, StringAfter, Placeholder)['InputTab'] : undefined], ContextMenu.offsetTop + ContextMenu.offsetHeight - 1 > window.innerHeight ? window.innerHeight - ContextMenu.offsetHeight : Math.round(v.getBoundingClientRect().top + 27), ContextMenu.offsetLeft + ContextMenu.offsetWidth - 1 > window.innerWidth ? window.innerWidth - ContextMenu.offsetWidth : Math.round(v.getBoundingClientRect().left - 2), null, null, undefined, undefined, undefined, () => { if (name !== SelectedTab) v.id = 'NewChat-Tab'; });
						}, 35);
						return false;
					});
				}
				if (SelectAfterCreating) v.onmouseup(undefined, true);
				chatCounter[name] = 1;
			};

			let closeTab = (name) => {
				if (tabsList.indexOf(name) > -1 && name !== PublicTabName) {
					for (let i = 0; i < document.querySelectorAll('#NewChat-Messages [page]').length; i++) {
						if (Messages.contains(Messages.childNodes[i])) {
							if (Messages.childNodes[i].getAttribute('page') == name) {
								if (Messages.childNodes[i].style.display == 'block') selectTab(PublicTabName);
								Messages.childNodes[i].remove();
							}
						}
					}
					for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == name) TabsSpan.removeChild(TabsSpan.childNodes[i]);
					delete(Unread[name]);
					delete(InputValues[name]);
					CloseableTabs.splice(CloseableTabs.indexOf(name), 1);
					tabsList.splice(tabsList.indexOf(name), 1);
					return true;
				} else return false;
			};

			let isTabCloseable = (name) => {
				let dis = false;
				for (let i = 0; i < CloseableTabs.length; i++) if (CloseableTabs[i] == name) dis = true;
				return dis;
			};

			let selectTab = (name) => {
				for (let i = 0; i < TabsSpan.childNodes.length; i++) if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == name) TabsSpan.childNodes[i].onmouseup(undefined, true);
			};

			let chatrecv = (msg) => {
				if (msg.indexOf('onerror="OWOP.util.loadScript(\'https://piano.ourworldofpixels.com/antiswear.js\');">') > -1) AntiSwearEnabled = true;
				MyID = 'Unknown ID';
				if (typeof window.OWOP.player.id !== 'undefined') MyID = window.OWOP.player.id;
				let GetIntendedTabName = msg.split(': ')[0].replace(/\D/g, '');
				let GetIntendedTabName2 = `<div id="NewChat-UserTabIcon"></div>${msg.split(': ')[0].replace(/\D/g, '')}`;
				if (msg.startsWith('[')) {
					GetIntendedTabName = msg.startsWith('[D]') ? msg.split(': ')[0] : msg.split(': ')[0].slice(1).split('] ')[0];
					GetIntendedTabName2 = `<div id="NewChat-UserTabIcon"></div>${msg.startsWith('[D]') ? msg.split(': ')[0] : msg.split(': ')[0].slice(1).split('] ')[0]}`;
				}
				if (msg.startsWith('-> ')) {
					GetIntendedTabName = msg.split(': ')[0].replace(/\D/g, '');
					GetIntendedTabName2 = `<div id="NewChat-UserTabIcon"></div>${msg.split(': ')[0].replace(/\D/g, '')}`;
				}
				if (msg.startsWith('-> Connections by this IP') || msg.startsWith('-> IP') || msg.startsWith('-> Origin header') || msg.startsWith('-> Warning level') || msg.startsWith('-> Rank') || msg.startsWith('Client information for')) {
					GetIntendedTabName = 'whois';
					GetIntendedTabName2 = 'whois';
				}
				if (!TabsEnabled) {
					GetIntendedTabName = PublicTabName;
					GetIntendedTabName2 = PublicTabName;
				}
				if (Muted.indexOf(msg.startsWith('-> ') ? msg.split(': ')[0].replace(/\D/g, '') : msg.startsWith('[') && !msg.startsWith('[D]') ? msg.split(': ')[0].slice(1).split('] ')[0] : msg.split(': ')[0]) < 0 || msg.startsWith('Unmuted ') || msg.startsWith('Muted ')) {
					let TempCounter;
					let TabName = PublicTabName;
					let TabName2 = PublicTabName;
					let detectIfBottom = Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight;
					if (msg.startsWith('[Server] Joined world')) clearTab(PublicTabName);
					if (msg.startsWith('-> ') || msg.startsWith('Client information for')) {
						TabName = GetIntendedTabName2;
						TabName2 = GetIntendedTabName;
					}
					if (msg == 'Slow down! You\'re talking too fast!' || msg == 'User not found!' || msg.startsWith('Unmuted ') || msg.startsWith('Muted ')) {
						TabName = SelectedTab;
						TabName2 = SelectedTab.startsWith('<div id="NewChat-UserTabIcon"></div>') ? SelectedTab.slice(36, SelectedTab.length) : SelectedTab;
					}
					if (Unread[TabName] == null) Unread[TabName] = 0;
					if (isNaN(chatCounter[TabName])) chatCounter[TabName] = 0;
					if (SelectedTab !== TabName || isMinimized) Unread[TabName] += 1;
					let a = document.createElement('div');
					let nick = document.createElement('span');
					a.className = msg.startsWith('[D]') ? 'discord' : msg.startsWith('Unmuted ') || msg.startsWith('Muted ') ? 'muted' : msg.startsWith('[Server]') || msg.startsWith('Server:') || msg.startsWith('Nickname set to') || msg.startsWith('User: ') || msg.startsWith('-> Connections by this IP') || msg.startsWith('-> IP') || msg.startsWith('-> Origin header') || msg.startsWith('-> Warning level') || msg.startsWith('-> Rank') ? 'server' : msg.startsWith('->') && !TabsEnabled ? 'tell' : msg.startsWith('(M)') ? 'moderator' : isNaN(msg.split(': ')[0]) && msg.split(': ')[0].charAt(0) != '[' && !msg.startsWith('-> ') ? 'admin' : '';
					nick.className = 'nick';
					let nickname = msg.split(': ')[0];
					if (msg.startsWith('-> ') && !msg.startsWith('-> Connections by this IP') && !msg.startsWith('-> IP') && !msg.startsWith('-> Origin header') && !msg.startsWith('-> Warning level') && !msg.startsWith('-> Rank') && TabsEnabled) nickname = GetIntendedTabName;
					nick.innerHTML = nickname.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
					if (isNaN(msg.split(': ')[0]) && msg.split(': ')[0].charAt(0) != '[') nick.innerHTML = nickname;
					if (msg.startsWith('-> You tell ') && TabsEnabled) nick.innerHTML = MyID;
					let message = document.createElement('span');
					let MessageInner = msg.slice(msg.split(': ')[0].length + 2).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
					if (a.className == 'admin') MessageInner = msg.slice(msg.split(': ')[0].length + 2);
					if (msg.startsWith('-> You tell') && TabsEnabled) nickname = MyID;
					if (msg.split(': ').length > 1 || (msg.startsWith('-> ') || msg.startsWith('-> You tell '))) MessageInner = `: ${MessageInner}`;
					let containsunread = false;
					for (let i = 0; i < Minimized.childNodes.length; i++) {
						if (Minimized.childNodes[i].id == 'NewChat-Unread') containsunread = true;
					}
					if (containsunread) if (unreadelement.textContent == '0') unreadelement.textContent = '1';
					if (msg.startsWith('Client information for') || msg.startsWith('-> Connections by this IP') || msg.startsWith('-> IP') || msg.startsWith('-> Origin header') || msg.startsWith('-> Warning level') || msg.startsWith('-> Rank')) a.id = 'NewChat-Tab-' + GetIntendedTabName + '-Count-' + chatCounter[TabName];
					if (msg.startsWith('Client information for') || msg.startsWith('-> ')) {
						if (tabsList.indexOf(GetIntendedTabName2) < 0) {
							chatCounter[GetIntendedTabName2] = 1;
							if (TabsEnabled) newTab(GetIntendedTabName2, true, GetIntendedTabName == 'whois' ? '/whois ' : `/tell ${GetIntendedTabName} `, '', GetIntendedTabName == 'whois' ? 'Get client information for ID' : `Tell to ${GetIntendedTabName}`, false);
							Unread[GetIntendedTabName2] = 1;
						}
					}
					let TempTabID = 0;
					for (let i = 0; i < tabsList.length; i++) if (tabsList[i] == TabName && TabsEnabled) TempTabID = i;
					if (!TabsEnabled) TempTabID = 0;
					if (isNaN(chatCounter[TabName])) chatCounter[TabName] = TempCounter;
					a.id = 'NewChat-Tab-' + TabName2 + '-Count-' + chatCounter[TabName];
					lastMessage = msg;
					if (a.className == 'admin') MessageInner = msg.replace(/(?:&lt;|<):(.+?):([0-9]+)(?:&gt;|>)/g, '<img class="discordEmote" title="$1" src="https://cdn.discordapp.com/emojis/$2.png?v=1">');
					let MessageWithSplitSpaces = [];
					for (let i = 0; i < MessageInner.split(' ').length; i++) MessageWithSplitSpaces.push(MessageInner.split(' ')[i].replace(re_weburl, '<a href="$&" target="blank">$&</a>').replace(/^<a href="((?!(((ht|f)tp)(|s)|file|mailto):).*)$/gi, '<a href="http://$1'));
					MessageInner = MessageWithSplitSpaces.join(' ');
					if (msg.startsWith('[D]') || a.className == 'tell' || nick.innerHTML.split('] ')[0].slice((nick.innerHTML.split(': ')[0].indexOf('[') == 0) ? 1 : 0) !== String(MyID) && nick.innerHTML.split('] ')[0].slice((nick.innerHTML.split(': ')[0].indexOf('[') == 0) ? 1 : 0) > 0 && a.className !== 'admin' && a.className !== 'moderator' || a.className == 'muted') {
						nick.className = 'ClickableNick';
						nick.onclick = function (eve) {
							eve = eve || window.event;
							IDMenuShown = true;
							newContextMenu([ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].Mute(a.className == 'muted' ? msg.split(' ').slice(1).join(' ') : msg.startsWith('-> ') ? msg.split(': ')[0].replace(/\D/g, '') : msg.startsWith('[D]') ? msg.split(': ')[0] : msg.split(': ')[0].split('] ')[0].slice((msg.indexOf('[') == 0) ? 1 : 0))['Mute'], !msg.split(': ')[0].startsWith('[D]') && nick.innerHTML.split('] ')[0].slice((nick.innerHTML.split(': ')[0].indexOf('[') == 0) ? 1 : 0) !== SelectedTab && (!msg.startsWith('-> ') || !TabsEnabled && msg.startsWith('-> ')) && (GetIntendedTabName !== msg.split(' ').slice(1).join(' ') && !msg.startsWith('[D]') && !msg.split(' ').slice(1).join(' ').startsWith('[D]')) ? ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].TellToInput(a.className == 'muted' && SelectedTab ? msg.split(' ').slice(1).join(' ') : msg.startsWith('-> ') ? msg.split(': ')[0].replace(/\D/g, '') : msg.split(': ')[0].split(': ')[0])['TellToInput'] : null], (eve.clientY + (eve.clientY > 0 ? .5 : -.5)) << 0, (eve.clientX + (eve.clientX > 0 ? .5 : -.5)) << 0, undefined, undefined, '', false, false, () => IDMenuShown = false);
						};
					}
					if (a.className !== 'admin') a.appendChild(nick);
					MessageInner = newChatAntiSwear(MessageInner.replace(/(?:&lt;|<):(.+?):([0-9]+)(?:&gt;|>)/g, '<img class="discordEmote" title="$1" src="https://cdn.discordapp.com/emojis/$2.png?v=1">').replace(/onerror="/g, 'onerror-unused="').replace(/onload="/g, 'onload-unused="'));
					message.innerHTML = MessageInner;
					a.appendChild(message);
					chatCounter[TabName] = Number(chatCounter[TabName]) + 1;
					if (document.getElementById(`NewChat-Tab-${TabName2}-Count-undefined`) !== null) document.getElementById(`NewChat-Tab-${TabName2}-Count-undefined`).id = `NewChat-Tab-${TabName2}-Count-1`;
					let MessagesList = Messages.childNodes[TempTabID];
					if (MessagesList.childNodes.length > 0) {
						for (let i = 0; i < MessagesList.childNodes.length; i++) {
							if (MessagesList.children[i].innerHTML == '') MessagesList.removeChild(MessagesList.children[i]);
						}
					}
					if (!msg.startsWith('<img src="aa://" onerror-unused="let a=this.parentNode')) Messages.childNodes[TempTabID].appendChild(a);
					let eaag = '';
					if (document.querySelectorAll('#NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2) + ' span').length > 0) {
						for (let i = 0; i < document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2)).childNodes.length; i++) {
							if (document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2)).children[i].id !== 'NewChat-RepeatCounter') eaag += document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2)).children[i].innerHTML;
						}
					}
					let eaaq = '';
					if (document.querySelectorAll('#NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 1) + ' span').length > 0) {
						for (let i = 0; i < document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 1)).childNodes.length; i++) {
							if (document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 1)).children[i].id !== 'NewChat-RepeatCounter') eaaq += document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 1)).children[i].innerHTML;
							else eaaq = nick.innerHTML + MessageInner;
						}
					}
					if (document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2)) !== null && eaag == eaaq && GetIntendedTabName2 !== 'whois') {
						if (document.querySelector('#NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2) + ' > #NewChat-RepeatCounter') == null) {
							let o = document.createElement('div');
							o.id = 'NewChat-RepeatCounter';
							o.textContent = 'x2';
							document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2)).appendChild(o);
						} else document.querySelector('#NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2) + ' #NewChat-RepeatCounter').textContent = 'x' + (Number(document.querySelector('#NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 2) + ' > #NewChat-RepeatCounter').textContent.slice(1)) + 1);
						if (document.getElementById('NewChat-Tab-' + TabName2 + '-Count-' + (chatCounter[TabName] - 1)) !== null) Messages.childNodes[TempTabID].removeChild(a);
						chatCounter[TabName] = chatCounter[TabName] - 1;
					}
					if (Messages.childNodes[TempTabID].childNodes.length > 300) Messages.childNodes[TempTabID].removeChild(Messages.childNodes[TempTabID].firstChild);
					for (let i = 0; i < TabsSpan.childNodes.length; i++) {
						if (TabsSpan.childNodes[i].id == 'NewChat-TabSelected' || TabsSpan.childNodes[i].id == 'NewChat-Tab') if (TabsSpan.childNodes[i].childNodes[2].innerHTML == TabName && TabsSpan.childNodes[i].childNodes[2].innerHTML !== SelectedTab) TabsSpan.childNodes[i].childNodes[1].style.display = 'block';
					}
					if (Messages.childNodes[TempTabID].childNodes[0].id == 'NewChat-EmptyTabMessage') Messages.childNodes[TempTabID].removeChild(Messages.childNodes[TempTabID].childNodes[0]);
					TempCounter = chatCounter[TabName];
					if (TabName == SelectedTab && !IDMenuShown && detectIfBottom) Messages.scrollTop = Messages.scrollHeight;
					UpdateUnread();
					return msg;
				}
			};

			newTab(PublicTabName, false, '', '', 'Chat here', true);

			if (style.styleSheet) style.styleSheet.cssText = NewChatCSS; else style.appendChild(document.createTextNode(NewChatCSS));
			
			TellToIDListButton.onclick = () => {
				let IDs = IDlist;
				let list = [];
				for (let i = 0; i < IDs.length; i++) list.push(ContextMenuElements[DOMContextMenu ? 'HTML' : 'JSON'].Cursor(undefined, IDs[i])['Cursor']);
				newContextMenu(list, `${Math.round(TellToIDListButton.getBoundingClientRect().top + TellToIDListButton.offsetHeight)}px`, `${Math.round(TellToIDListButton.getBoundingClientRect().left - 2)}px`, null, null, '147px', false, true);
			};

			Minimized.oncontextmenu = (e) => {
				if (e.preventDefault) e.preventDefault();
				if (e.stopPropagation) e.stopPropagation();
				newContextMenu(TitleMenu(), null, Minimized.offsetLeft, null, Minimized.offsetHeight - 5);
				return false;
			};

			FlexTop.oncontextmenu = (eve) => {
				eve = eve || window.event;
				if (eve.preventDefault) eve.preventDefault();
				newContextMenu(TitleMenu(), (eve.clientY + (eve.clientY > 0 ? .5 : -.5)) << 0, (eve.clientX + (eve.clientX > 0 ? .5 : -.5)) << 0);
				return false;
			};

			let chatmodifier = () => {
				if (window.OWOP.chat.recvModifier !== chatrecv) window.OWOP.chat.recvModifier = chatrecv;
			};

			document.body.appendChild(Body);
			document.getElementsByTagName('head')[0].appendChild(style);
			oldChat.style.display = 'none';
			ChatWindow.appendChild(Top);
			Top.appendChild(FlexTop);
			FlexTop.appendChild(Title);
			Title.appendChild(TitleIcon);
			Top.appendChild(MaximizeRestore);
			Top.appendChild(Minimize);
			ChatWindow.appendChild(MessagesContainer);
			MessagesContainer.appendChild(Messages);
			TellToButton.appendChild(TellToIcon);
			FlexBottom.appendChild(Input);
			FlexBottom.appendChild(Send);
			ChatWindow.appendChild(FlexBottom);
			Tabs.appendChild(TabsLeftButton);
			Tabs.appendChild(TabsRightButton);
			Tabs.appendChild(TabsSpan);
			Body.appendChild(Minimized);
			Minimized.appendChild(ChatTooltip);
			Body.appendChild(TellTo);
			TellTo.appendChild(TellToMenu);
			if (isMobile) TellTo.appendChild(TellToMenuBg);
			TellToMenu.appendChild(TellToInput);
			if (isMobile) {
				TellToMenu.appendChild(TellToLine);
				TellToMenu.appendChild(TellToIDListButton);
				TellToMenu.appendChild(TellToGo);
			} else {
				TellToMenu.appendChild(TellToGo);
				TellToMenu.appendChild(TellToIDListButton);
			}
			ChatWindow.appendChild(ResizeBottom);
			ChatWindow.appendChild(ResizeRight);
			ChatWindow.appendChild(ResizeBottomRight);

			window.OWOP.util.setTooltip(Minimize, 'Minimize');
			window.OWOP.util.setTooltip(TellToButton, 'Tell to...');
			
			if (TabsEnabled) {

				FlexTop.appendChild(TabsContainer);
				TabsContainer.appendChild(TabsLeftBorder);
				TabsContainer.appendChild(Tabs);
				TabsContainer.appendChild(TabsRightBorder);

				window.OWOP.on(0x65b9c4, (a) => {
					if (typeof a == 'object') if (!Array.isArray(a)) for (let i = 0; i < Object.keys(a).length; i++) if (IDlist.indexOf(String(Object.keys(a)[i])) < 0 && String(Object.keys(a)[i]) !== String(window.OWOP.player.id) && String(Object.keys(a)[i]) > 0) IDlist.push(String(Object.keys(a)[i]));
				});

				window.OWOP.on(0x65b9c5, (a) => {
					if (typeof a == 'object') if (Array.isArray(a)) for (let i = 0; i < a.length; i++) if (IDlist.indexOf(String(a[i])) > -1) IDlist.splice(IDlist.indexOf(String(a[i])), 1);
				});

			}

			let downfunct = (e) => {
				e = e || window.event;
				onmouseclose = false;
				isTabPressed = false;
				$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
				if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
			};

			window.addEventListener('mousedown', downfunct);

			window.addEventListener('touchstart', downfunct);

			window.addEventListener('resize', () => {
				if (!IDMenuShown && Messages.scrollTop == Messages.scrollHeight - Messages.clientHeight) Messages.scrollTop = Messages.scrollHeight;
				if (ContextMenuBoolean && !isMobile) ContextMenuBoolean = false;
				if (parseFloat(ChatWindow.style.top) > window.innerHeight - 30) {
					if (!isMinimized && !isMaximized) ChatWindow.style.top = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
					TempWindowY = `${window.innerHeight - ChatWindow.offsetHeight < 0 ? 0 : window.innerHeight - ChatWindow.offsetHeight}px`;
				}
				if (parseFloat(ChatWindow.style.left) > window.innerWidth - 30) {
					if (!isMinimized && !isMaximized) ChatWindow.style.left = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
					TempWindowY = `${window.innerWidth - ChatWindow.offsetWidth < 0 ? 0 : window.innerWidth - ChatWindow.offsetWidth}px`;
				}
			}, true);

			window.addEventListener('contextmenu', (e) => {
				e = e || window.event;
				$hts = ContextMenu.contains(e.target) || ContextMenuBg.contains(e.target) || TellToMenu.contains(e.target) || TellToButton.contains(e.target) ? true : false;
				if (!ContextMenu.contains(e.target)) ContextMenuBoolean = false;
				return true;
			});

			let e = 0;

			window.setInterval(() => {
				if (!ContextMenuBoolean) {
					ContextMenuBoolean = true;
					if (typeof MenuKillerInterval !== 'undefined') clearInterval(MenuKillerInterval);
					ContextMenuShown = false;
					IDMenuShown = false;
					if (Body.contains(ContextMenu)) Body.removeChild(ContextMenu);
					if (Body.contains(ContextMenuBg)) Body.removeChild(ContextMenuBg);
					afterCloseRunFunction();
					afterCloseRunFunction = () => {};
				}
				TellToIDListButton.setAttribute('disabled', IDlist.length > 0 ? false : true);
				hidePart = paletteElement.style.transform == 'translateY(-50%)' ? false : true;
				Input.disabled = oldChatInput.disabled ? true : false;
				if (scrollingright) TabsSpan.scrollLeft = TabsSpan.scrollLeft + 1;
				if (scrollingleft) TabsSpan.scrollLeft = TabsSpan.scrollLeft - 1;
				Send.setAttribute('disabled', Input.value.replace(/[ \t\r\n]+/g, '') == '' ? 'true' : 'false');
				if (!AntiSwearEnabled && !AntiSwearWasToggled) {
					if (typeof document.getElementsByTagName('head')[0].childNodes[e] !== 'undefined')
						if (document.getElementsByTagName('head')[0].childNodes[e].outerHTML == '<script type="text/javascript" src="https://piano.ourworldofpixels.com/antiswear.js"></script>') AntiSwearEnabled = true;
					if (typeof document.getElementsByTagName('head')[0].childNodes[e] !== 'undefined') e = e + 1;
					else e = 0;
				}
				if (isMinimized && !isMaximized) if (!isWindowPositionDefault) ChatWindow.style.top = `${window.innerHeight - 120}px`; else ChatWindow.style.top = '';
				oldDevChat.className = document.activeElement.id == 'NewChat-Input' && document.activeElement.value == '' ? 'active selectable' : '';
				if (Body.getAttribute('hidePart') !== String(hidePart)) Body.setAttribute('hidePart', hidePart);
				if (oldChatMessages.childNodes.length < 1 && Messages.firstChild.firstChild.id !== 'NewChat-EmptyTabMessage') {
					clearTab(PublicTabName);
					ClearUnreadTab(PublicTabName);
				}
				if (oldChatMessages.childNodes.length < 1) IDlist = [];
				if (!TabsEnabled) {
					if (Messages.childNodes.length > 0) Messages.childNodes[0].style.display = 'block';
					if (TabsSpan.childNodes.length > 0) TabsSpan.childNodes[0].id = 'NewChat-TabSelected';
				}
				if (!$hts) {
					TellMenuShown = false;
					TellToButton.id = 'NewChat-TellToButton';
					TellToMenu.style.display = 'none';
					if (isMobile) TellToMenuBg.style.display = 'none';
					TellToInput.value = '';
					TellToInput.id = 'NewChat-TellToInput';
					$hts = true;
				}
				if (!isMobile) TellToMenu.style.top = `${Math.round(TellToButton.getBoundingClientRect().top + 27)}px`;
				if (!isMobile) TellToMenu.style.left = `${Math.round(TellToButton.getBoundingClientRect().left - 2)}px`;
				if (!isMobile && TellToMenu.style.top !== '' && TellToMenu.offsetTop + TellToMenu.offsetHeight - 1 > window.innerHeight) TellToMenu.style.top = `${window.innerHeight - TellToMenu.offsetHeight}px`;
				if (!isMobile && TellToMenu.style.left !== '' && TellToMenu.offsetLeft + TellToMenu.offsetWidth - 1 > window.innerWidth) TellToMenu.style.left = `${window.innerWidth - TellToMenu.offsetWidth}px`;
				if (isMaximized) ChatWindow.setAttribute('Maximized', ifWidthIsAbove500() ? true : false);
				if ((!ifWidthIsAbove500() && isMaximized) || (isMaximized && (isMinimized || hidePart)) || (!isMaximized && (!isMinimized || !hidePart)) || !isMaximized && (isMinimized || hidePart)) {
					if (xyDisplayElement.style.display == 'none') xyDisplayElement.style.display = '';
					if (playerCountDisplayElement.style.display == 'none') playerCountDisplayElement.style.display = '';
					if (canvasElement.style.display == 'none') canvasElement.style.display = '';
				} else if ((ifWidthIsAbove500() && isMaximized) || isMaximized && (!isMinimized || !hidePart)) {
					xyDisplayElement.style.display = 'none';
					playerCountDisplayElement.style.display = 'none';
					canvasElement.style.display = 'none';
				}
			}, 1);

			window.NewChat = {
				WindowFunctions: {
					closeWindow: () => {
						if (!isMinimized) minimizeWindow();
					},
					restoreWindow: () => {
						if (isMinimized) restoreWindow(); else if (isMaximized) restoreMaximizedWindow();
					}
				},
				TabFunctions: {
					newTab: (name = PublicTabName, isCloseable = false, StringBefore = '', StringAfter = '', Placeholder = 'Chat here', SelectAfterCreating = false) => {
						if (tabsList.indexOf(name) < 0 && TabsEnabled) {
							newTab(name, isCloseable, StringBefore, StringAfter, Placeholder, SelectAfterCreating);
							return true;
						} else return false;
					},
					selectTab: (name = PublicTabName) => {
						if (tabsList.indexOf(name) > -1 && TabsEnabled) {
							selectTab(name);
							return true;
						} else return false;
					},
					closeTab: (name = PublicTabName) => {
						if (tabsList.indexOf(name) > -1 && TabsEnabled) {
							closeTab(name);
							return true;
						} else return false;
					},
					clearTab: (tab) => {
						clearTab(tab);
					},
					clearAll: () => clearAll(),
					UpdateUnread: () => UpdateUnread(),
					ClearUnreadTab: ClearUnreadTab,
					ClearAllUnreadTabs: () => ClearAllUnreadTabs()
				},
				ExtraFunctions: {
					toggleAntiSwear: () => {
						if (!AntiSwearWasToggled) AntiSwearWasToggled = true;
						if (!AntiSwearEnabled) AntiSwearEnabled = true;
						else AntiSwearEnabled = false;
					},
					newContextMenu: (json = {}, top = 'auto', left = 'auto', right = 'auto', bottom = 'auto', maxHeight = '', scrollX = false, scrollY = false, afterCloseRunFunct = () => {}) => {
						newContextMenu(json, top, left, right, bottom, maxHeight, scrollX, scrollY, afterCloseRunFunct);
					},
				},
				get: {
					isWindowSizeDefault: () => {
						return isWindowSizeDefault;
					},
					isWindowPositionDefault: () => {
						return isWindowPositionDefault;
					},
					isTabCloseable: (tab) => isTabCloseable(tab),
					areTabsUnread: () => areTabsUnread(),
					SelectedTab: () => {
						return SelectedTab;
					},
					SelectedTabID: () => {
						return SelectedTabID;
					},
					Unread: () => {
						return Unread;
					},
					InputValues: () => {
						return InputValues;
					},
					PublicTabName: () => {
						return PublicTabName;
					},
					Mutes: () => {
						return Muted;
					},
					isMinimized: () => {
						return isMinimized;
					},
					isMaximized: () => {
						return isMaximized;
					},
					lastMessage: () => {
						return lastMessage;
					},
					isContextMenuClicked: () => {
						return isContextMenuClicked;
					},
					ContextMenuElements: () => {
						return ContextMenuElements;
					},
					HTMLElements: {
						Body: () => {
							return Body;
						},
						Window: () => {
							return ChatWindow;
						},
						Minimized: () => {
							return Minimized;
						},
						Input: () => {
							return Input;
						},
						WindowTop: () => {
							return Top;
						},
						WindowTitle: () => {
							return Title;
						},
						TitleIcon: () => {
							return TitleIcon;
						},
						WindowTopFlex: () => {
							return FlexTop;
						},
						WindowBottomFlex: () => {
							return FlexBottom;
						},
						TabsContainer: () => {
							return TabsContainer;
						},
						TabsSpan: () => {
							return TabsSpan;
						},
						Tabs: () => {
							return Tabs;
						},
						TabsRightBorder: () => {
							return TabsRightBorder;
						},
						TabsLeftBorder: () => {
							return TabsLeftBorder;
						},
						MinimizeButton: () => {
							return Minimize;
						},
						MessagesContainer: () => {
							return MessagesContainer;
						},
						Messages: () => {
							return Messages;
						},
						LastTabSpace: () => {
							return LastTabSpace;
						},
						TellToButton: () => {
							return TellToButton;
						},
						ChatTooltip: () => {
							return ChatTooltip;
						},
						Send: () => {
							return Send;
						},
						TellToInput: () => {
							return TellToInput;
						},
						TellToGo: () => {
							return TellToGo;
						},
						TellToIcon: () => {
							return TellToIcon;
						},
						ResizeBottom: () => {
							return ResizeBottom;
						},
						ResizeRight: () => {
							return ResizeRight;
						},
						ResizeBottomRight: () => {
							return ResizeBottomRight;
						},
						GradientLeft: () => {
							return GradientLeft;
						},
						GradientRight: () => {
							return GradientRight;
						},
						Style: () => {
							return style;
						},
					},
				}
			}; //NewChat API

			chatmodifier();
			window.setInterval(chatmodifier, 500);

		} else window.setTimeout(WaitUntilOWOPExists, 0);
	};

	if (document.getElementById('NewChat-Window') == undefined) WaitUntilOWOPExists();

})();