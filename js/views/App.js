let template = null;
let initial = false;

const getTemplate = () => {
	if (!template) {
		template = document.getElementById('app');
	}

	return template.content.firstElementChild.cloneNode(true);
}

const addEvents = () => {
	window.addEventListener('resize', onResize);
}

const onResize = e => {
	document.querySelector('.app').style.height = window.innerHeight+'px';
};

export default (targetElement, state, dispatch) => {
	const newApp = targetElement.cloneNode(true);

	if (initial) {
		return newApp;
	}

	newApp.innerHTML = '';
	newApp.appendChild(getTemplate());

	addEvents();
	window.onload = () => {
		onResize();
		initial = true;
	}
	
	if (document.querySelector('.app')) {
		onResize();
	}

	return newApp;
}