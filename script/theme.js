const themeMode = function () {
	
	let darkmode = localStorage.getItem('darkmode');
	const themeSwitch = document.querySelector('[data-theme]');
	
	function enebleDarkMode () {
		document.body.classList.add('darkmode');
		localStorage.setItem('darkmode','active');
	}

	function disableDarkmode () {
		document.body.classList.remove('darkmode');
		localStorage.setItem('darkmode',null);
	}

	if (darkmode === 'active') enebleDarkMode();

	themeSwitch.addEventListener('click', () => {
		darkmode = localStorage.getItem('darkmode');
		darkmode !== 'active' ? enebleDarkMode() : disableDarkmode();
	})
}
themeMode()