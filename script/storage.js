// Функция, которая сохраняет в локальное хранилище
export function saveAllItem() {
	// Переменная которая выделяет все динамические элементы
	const items = document.querySelectorAll('.hero__item');
	// Переменная с распасенным JSON элементом , либо создаёт пустой объект
	let dataItems = JSON.parse(localStorage.getItem('hero__item')) || {};

	// Каждый динамический элементы перебираем forEach
	items.forEach(item => {
		// Добавляем элементы
		const title = item.querySelector('.hero__title');
		const checkbox = item.querySelector('.input__checkbox');

		// Если есть обе переменные
		if (title && checkbox) {
			// Новая переменная в которой всему текстовому элименту обрезают пробелы
			const text = title.textContent.trim();
			// Заносим в dataItems ключ ввиде названия, а значение ввиде состояние чекбокса
			dataItems[text] = checkbox.checked;
		}
	});
	// Сохраняем в хранилище
	localStorage.setItem('hero__item', JSON.stringify(dataItems));
}

// Функция для проверки содержимого
export function checkList() {
	// Выделяем ul в котором хранятся динамические элементы
	const ulElement = document.querySelector('[data-hero-ul-list]');
		
	// Находим существующие элементы
	const emptyImg = ulElement.querySelector('.hero__empty-img');
	const emptyText = ulElement.querySelector('.hero__empty-description');

	// Так как дочерние элементы ul не являются массивами, переводим в массив
	// и используем filter, где, фильтруем, если нет элементов с классом, убрать
	const actualChildren = Array.from(ulElement.children).filter(child => 
		!child.classList.contains('hero__empty-img') && 
		!child.classList.contains('hero__empty-description')
	);

	// Если нет реальных элементов (кроме наших empty-элементов)
	if (actualChildren.length === 0) {
		// Добавляем элементы, только если их еще нет
		if (!emptyImg && !emptyText) {
			const existImg = document.createElement('img');
			existImg.src = './icon/Detective-light.svg';
			existImg.className = 'hero__empty-img';

			const existText = document.createElement('div');
			existText.className = 'hero__empty-description';
			existText.textContent = 'Empty...';

			ulElement.append(existImg, existText);
		}
	} else {
		// Удаляем empty-элементы, если они есть и появились реальные данные
		emptyImg?.remove();
		emptyText?.remove();
	}
}

// Функция для загрузки localStorage
export function loadLocalStorage() {
	// Выделяем ul элемент
	const ulElement = document.querySelector('[data-hero-ul-list]');
	// Переменная с распасенным JSON элементом , либо создаёт пустой объект
	const parseJSONElement = JSON.parse(localStorage.getItem('hero__item'));

	// Если нет ключа, то вернуть, чтоб ошибки не было
	if (!parseJSONElement ) {
		// Очищаем весь контент ul элемента
		ulElement.innerHTML = '';
		// Проверяем элимент на наличие дин содержимого
		checkList();
		return;
	} ;

	// Для удобства перебора
	const entries = Object.entries(parseJSONElement);

	// разбиваем на ключ и значение
	for(const [key,value] of entries){

		// загружаем(создаём) список и даём ему клас
		let liElement = document.createElement('li');
		liElement.className ='hero__item';
		// задаём внутренности
		liElement.innerHTML = `
			<form class="hero__description">
				<input class="hero__input input input__checkbox" type="checkbox">
				<h2 class="hero__title">${key}</h2>
			</form>
			<div class="hero__option">
				<button type="button" class="hero__pen btn btn__option btn__option--pen" data-pen-btn>
					<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"/>
					</svg>
				</button>
				<button type="button" class="hero__trash btn btn__option btn__option--trash" data-trash-btn>
					<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" />
						<path d="M14.625 3.75H3.375"/>
						<path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"/>
						<path d="M10.5 9V12.75"/>
						<path d="M7.5 9V12.75"/>
					</svg>
				</button>
			</div>
			`;
		// Переменная с чекбоксом
		const checkbox = liElement.querySelector('.input__checkbox');
		// Для переменной с состоянием checked даём новое название value
		checkbox.checked = value;
		if (value) {
			// Если состояние true, то выделяем название, даём ему и чекбоксу доп класс
			const title = liElement.querySelector('.hero__title');
			title.classList.add('complete');
			checkbox.classList.add('complete');
		}
		// добавляем в ul
		ulElement.appendChild(liElement);
	}
	// Проверяем при загрузке данных, есть ли что то в ul
	checkList()
}

loadLocalStorage();
checkList();