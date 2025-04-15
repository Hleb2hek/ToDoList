import { saveAllItem,checkList } from "./storage.js";

export const modalController = function ({btnOpen,btnClose,modalWindow}) {

	const btnElemOpen = document.querySelector(btnOpen);
	const btnElemClose = document.querySelector(btnClose);
	const modalElem = document.querySelector(modalWindow);
	
	const ulElement = document.querySelector('[data-hero-ul-list]');
	const btnApply = document.querySelector('[data-btn-apply]');
	const inputElement = document.querySelector('[data-modal-input]');
	
	// Прописываем модалке изначальные стили
	modalElem.style.cssText = `
		display: flex;
		visibility: hidden;
		opacity: 0;
		transition: opacity .1s ease-in-out;
	`;
	
	// Повторяющийся код вынесенный в функции
	function warningWrapper (firstText, secondText = null, sec = 1500) {
		if(!document.querySelector('.modal__text')) {
			// Добавить элемент
			let textElement = document.createElement('p');
			// Добавить класс
			textElement.classList.add('modal__text');
			inputElement.classList.add('input__warning');

			// Заблокировать кнопку
			btnApply.disabled = true;

			// Добавляем содержимое textElement
			textElement.innerHTML = firstText;

			// Через sec меняем содержимое
			if(secondText) {
				setTimeout (() => {
					textElement.innerHTML = secondText;
				},sec);
			}
			// Встраиваем после inputElement переменную textElement
			inputElement.insertAdjacentElement('afterend', textElement);
		}
	}
	function hiddenModal () {
		modalElem.style.opacity = 0;
		// Через 200ms модалка красиво исчезнет
		setTimeout(() => {
			modalElem.style.visibility = 'hidden';

			const warningText = inputElement.parentNode.querySelector('.modal__text');

			if(warningText) warningText.remove();
			inputElement.classList.remove('input__warning');
			inputElement.value = '';
			btnApply.disabled = false;
		}, 200);
		// Удаляем обработчик событий для кнопки, чтобы не было висячего обработчика
		window.removeEventListener('keydown',closeModal);
	}
	function warningDublicate() {
		let warningText = inputElement.parentNode.querySelector('.modal__text');
		const noteTitle = inputElement.value.trim();
		
		if (noteTitle === '') {
			warningWrapper('The input field is empty','Enter the task name',1500)
			return false
		} else if (noteTitle.length > 50) {
			warningWrapper ('The text is more than 50 characters long')
			return false
		}

		inputElement.classList.remove('input__warning')
		btnApply.disabled = false;

		if (warningText) {
			warningText.remove();
		}
		return true
	}
	// Функция закрытия 
	const closeModal = event => {
		const target = event.target;
		// Если нажата одна из кнопок или клавиш
		if ( target === btnElemClose || target === modalElem ||event.code === 'Escape') {
			// Делаем модалку не видимной
			hiddenModal()
		}
	}
	// Функция открытия модалки
	function showModal () {
		/*
		Добавляем свойства, чтобы было видно модалку
		и добавляем на модалку обработчик событий
		*/
		modalElem.style.visibility = 'visible';
		modalElem.style.opacity = 1;

		window.addEventListener('keydown',closeModal)
	}
	// Функция на создание динамического элемента
	function createItem () {
		/*
		Создаём главный дин.элемент
		Даём ему класс
		*/
		let liElement = document.createElement('li');
		liElement.className ='hero__item';
		let warningText = inputElement.parentNode.querySelector('.modal__text');

		if(!warningDublicate()) {
			return
		} else {
			/*
			Если нет пустой строки, то убираем класс 
			и зазблокируем кнопку
			*/
			let noteTitle = inputElement.value.trim();
			inputElement.classList.remove('input__warning')
			btnApply.disabled = false;
	
			// Если предупреждающий текст есть, то удалить
			if (warningText) {
				warningText.remove();
			}
			/*
				Добавляемый динамический элемент
				добавляем конец дочерний элемент liElement
				обнуляем поле input
			*/
			liElement.innerHTML = `
					<form class="hero__description">
						<input class="hero__input input input__checkbox" type="checkbox" >
						<h2 class="hero__title">${noteTitle}</h2>
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

			ulElement.appendChild(liElement);

			checkList()
			saveAllItem()
			hiddenModal()
		}
	}
	function editItem() {
		const noteTitle = inputElement.value.trim();
		const titleElement = currentEditItem.querySelector('.hero__title');
		const oldTitle = titleElement.textContent.trim();
		const newTitle = noteTitle;

		if(!warningDublicate()) return;
		
		titleElement.textContent = newTitle;
		
		let storedData = JSON.parse(localStorage.getItem('hero__item'));
		
		if (storedData.hasOwnProperty(oldTitle)) {
			delete storedData[oldTitle];
		}
		
		storedData[newTitle] = currentEditItem.querySelector('.input__checkbox').checked;
		localStorage.setItem('hero__item', JSON.stringify(storedData));
		
		window.currentEditItem = null;
		
		inputElement.value = '';
		
		hiddenModal();
		saveAllItem()
		checkList();
	}

	inputElement.addEventListener('input', () => {
		btnApply.disabled = inputElement.value.trim() === '';
	})
	btnApply.addEventListener('click',() => {
		if (currentEditItem) {
			editItem();
		} else {
			createItem()
		}
	});
	
	btnElemOpen.addEventListener('click', showModal);
	modalElem.addEventListener('click', closeModal);
	inputElement.addEventListener('keydown', event => {
		if(event.code === 'Enter') {
			if (currentEditItem) {
				editItem();
			} else {
				createItem()
			}
		}
	})

	return { showModal }

}

const modal = modalController({
	btnOpen: '[data-btn-create-note]',
	btnClose: '[data-btn-close]',
	modalWindow: '[data-modal]'
});

export const { showModal } = modal;