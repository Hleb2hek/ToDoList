
const modalController = function ({btnOpen,btnClose,modalWindow}) {
	const btnElemOpen = document.querySelector(btnOpen);
	const btnElemClose = document.querySelector(btnClose);
	
	const modalElem = document.querySelector(modalWindow);
	
	modalElem.style.cssText = `
		display: flex;
		visibility: hidden;
		opacity: 0;
		transition: opacity .1s ease-in-out;
	`;
	
	const closeModal = event => {
		const target = event.target
		if (
			target === btnElemClose ||
			target === modalElem ||
			event.code === 'Escape'
		){
			modalElem.style.opacity = 0;
			setTimeout(() => {
				modalElem.style.visibility = 'hidden';
			}, 200);
			window.removeEventListener('keydown',closeModal);
		}
	}
	
	const showModal = function() {
		modalElem.style.visibility = 'visible';
		modalElem.style.opacity = 1;
		window.addEventListener('keydown',closeModal)
	}
	
	btnElemOpen.addEventListener('click', showModal);
	modalElem.addEventListener('click', closeModal)
}

modalController({
	btnOpen: '[data-btn-create-note]',
	btnClose: '[data-btn-close]',
	modalWindow: '[data-modal]'
});