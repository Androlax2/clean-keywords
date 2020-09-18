const $keywords = document.querySelector('#keywords');
const $text = document.querySelector('#text');
const $button = document.querySelector('#button');
const $copy = document.querySelector('#copy');
const $textsToCopy = document.querySelector('#textsToCopy');

$button.addEventListener('click', e => {
	e.preventDefault();
	let keywords = $keywords.value.split(',');
	let texts = $text.value.split('\n');
	keywords = keywords.map(text => (text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).trim().toLowerCase());
	texts = texts.map(text => (text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase());

	texts = texts.filter(text => {
		let haveKeyword = false;
		keywords.map(keyword => {
			if (!keyword || haveKeyword) return;
			haveKeyword = text.includes(keyword);
		});
		if (!haveKeyword) return text;
	});

	console.log(texts);

	$textsToCopy.innerHTML = texts.join('<br />');
});

$copy.addEventListener('click', e => {
	e.preventDefault();

	const selection = window.getSelection();
	const range = document.createRange();
	range.selectNodeContents($textsToCopy);
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand('copy');
});
