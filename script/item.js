// Импортируем showModal
import { showModal } from "./modal.js";
import { saveAllItem,checkList } from "./storage.js";

window.currentEditItem = null;

// Функция на две кнопки, кнопку редактирования и удаление
function handleItemActions() {
	// Создаём переменную, которая является списком динамических элементов
	const ulElement = document.querySelector('[data-hero-ul-list]');
	// Выделяем инпут модалки
	const inputElem = document.querySelector('[data-modal-input]');
	
	// Вешаем событие, которое при клике отсылается к нажатию на модалку или удаление
	ulElement.addEventListener('click', (event) => {
		const target = event.target;
		// При нажатии проверяем, что нажато и в случае
		// если есть вложенные элемент в структуре найдётся за счёт closest
		const penBtn = target.closest('[data-pen-btn]');
		const trashBtn = target.closest('[data-trash-btn]');

		// Если нажата penBtn, то показать модалку
		if (penBtn) {
			// Находим hero__item относительно penBtn
			const liElement = penBtn.closest('.hero__item');
			// Выделяем hero__title и обрабаываем текстовое содержимое от пробелов
			const titleElement = liElement.querySelector('.hero__title').textContent.trim();

			// При нажатии выводим название таски
			inputElem.value = titleElement;
			// Присваиваем currentEditItem существуюзщую таску
			currentEditItem = liElement

			showModal();
		}
		// В обработчике клика на корзину
		if (trashBtn) {
			const liElement = trashBtn.closest('.hero__item');
	
			// Добавляем класс для анимации
			liElement.classList.add('removing');
	
			// Удаляем после завершения анимации
			setTimeout(() => {
				const titleElement = liElement.querySelector('.hero__title').textContent.trim();
				const storedData = JSON.parse(localStorage.getItem('hero__item')) || {};
			
				if (storedData.hasOwnProperty(titleElement)) {
						delete storedData[titleElement];
						localStorage.setItem('hero__item', JSON.stringify(storedData));
				}
			
				liElement.remove();
				checkList();
			}, 400); // Должно совпадать с временем анимации
		}
	});
};

// Функция, для поиска в инпуте подходящей таски через живой поиск
function handleSearchFilter() {
	// Переменная инпута в хедере 
	const inputElement = document.querySelector('[data-input-search]');
	
	// Если в инпут что то ввели, то присваиваем функцию
	inputElement.oninput = function () {
	
		// Введённое значение обрабатываем от пробелов
		let val = this.value.trim()
		// Получаем динамические элименты
		let elementList = document.querySelectorAll('[data-hero-ul-list] > li');
	
		// Если значение не пустое
		if(val != '') {
			// Проходимся по элементам
			elementList.forEach(function (elem) {
				console.log(elem.innerText.search(val));
				// Если полученный текст, не соответствует позиции полученной построки
				if(elem.innerText.search(val) === -1) {
					elem.classList.add('hide');
				} else {
					elem.classList.remove('hide');
				}
			});
		} else {
			// Если пустое, то всё спрятатонное показать
			elementList.forEach(function (elem) {
				elem.classList.remove('hide');
			})
		}
	}
	// Для полученного ипута отключить возможность отравки формы
	inputElement.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSearchFilter()
		}
	});
};

// Функция состояния чекбокса
function toggleCheckboxCompletion() {
	// Выделяем ul
	const ulElement = document.querySelector('[data-hero-ul-list]');

	// Навещиваем на ul обработчки событий для отслеживания изменений у checkbox
	ulElement.addEventListener('change', event => {
		const checkbox = event.target;

		if (event.target.type === 'checkbox') {
			// Находим у hero__item родительский элемент
			const heroItem = checkbox.closest('.hero__item');
			// Выделяем hero__title
			const title = heroItem.querySelector('.hero__title');

			// Применяем стили к текущим элементам
			if (checkbox.checked) {
				title.classList.add('complete');
				checkbox.classList.add('complete');
			} else {
				title.classList.remove('complete');
				checkbox.classList.remove('complete');
			}
			
			saveAllItem();
		}
	});
};

// Функция для фильрации элементов на категории
function filtreItem() {
	// Выделяем select
	const btnOption = document.querySelector('[data-select]');
		
	// Навешиваем обработчик на изменение состояния в select
	btnOption.addEventListener('change', () => {
		// Получаем актуальные данные из localStorage
		const storageList = JSON.parse(localStorage.getItem('hero__item')) || {};
		// Обновляем список элементов при каждом изменении
		const liElements = document.querySelectorAll('[data-hero-ul-list] > li');
		// Для красоты выносим в отдельную переменную индексы select
		const selected = btnOption.selectedIndex;
		
		// Проходимся по li
		liElements.forEach(elem => {
			// Достаём текстовые элементы
			const text = elem.textContent.trim();
			console.log(text);
			// А также из хранилище состояние чекбокса
			const isDone = storageList[text];
			
			// Если индекс select 0, то сделать видимым
			if (selected === 0) {
				elem.style.display = '';
			// Если индекс select 1, то если состояния isDone true, выполнить
			// первое условие, которое делает его видымым, если false, то уберает из видимости
			} else if (selected === 1) {
				elem.style.display = isDone ? '' : 'none';
			// Всё то же самое, но только противоположно
			} else if (selected === 2) {
				elem.style.display = !isDone ? '' : 'none';
			}
		});
	});
}
filtreItem();
toggleCheckboxCompletion();
handleSearchFilter();
handleItemActions();