
// Изолируем код
const themeMode = function () {
	
	// Каждый раз перезаписываем переменную, когда получаем 'darkmode'
	let darkmode = localStorage.getItem('darkmode');
	const themeSwitch = document.querySelector('[data-theme]');
	
	// Добавляем body класс 'darkmode'
	// Сохраняем в localStorage ключ 'darkmode' и значение 'active'
	function enebleDarkMode () {
		document.body.classList.add('darkmode');
		localStorage.setItem('darkmode','active');
	}

	function disableDarkmode () {
		// Удаляем body класс 'darkmode'
		// Сохраняем в localStorage ключ 'darkmode' и значение 'active'
		document.body.classList.remove('darkmode');
		localStorage.setItem('darkmode',null);
	}

	// Если у darkmode есть active, то включи тёмную тему
	if (darkmode === 'active') enebleDarkMode();

	/*
	Вешаем обработчик событий на группу кнопок,
	перезаписываем каждый раз переменную darkmode в localStorage,
	если не имеет значение active, то включи тёмную тему, в
	обратному случае верни светлую
	*/
	themeSwitch.addEventListener('click', () => {
		darkmode = localStorage.getItem('darkmode');
		darkmode !== 'active' ? enebleDarkMode() : disableDarkmode();
	})
}
themeMode()