// Импортируем showModal
import { showModal,saveAllItem } from "./modal.js";


export function checkList () {
	const ulElement = document.querySelector('[data-hero-ul-list]');
	const emptyImg = document.createElement('img');
	const emptyText = document.createElement('div');
	
	emptyImg.src = '/icon/Detective-light.svg';
	emptyImg.className = 'hero__empty-img';

	emptyText.className = 'hero__empty-descrtiption'
	emptyText.innerHTML = `Empty...`

	if(ulElement.children.length === 0) {
		if(!ulElement.querySelector('.hero__empty-img')) {
			ulElement.appendChild(emptyImg);
			ulElement.appendChild(emptyText);
		}
	} else {
		const existImg = ulElement.querySelector('.hero__empty-img');
		const existText = ulElement.querySelector('.hero__empty-descrtiption');
		if(existImg) {
			existImg.remove()
		}
		if(existText) {
			existText.remove()
		}
	}
}

function loadLocalStorage() {
	const ulElement = document.querySelector('[data-hero-ul-list]');
	const parseJSONElement = JSON.parse(localStorage.getItem('hero__item'));

	if (!parseJSONElement ) return ;

	const entries = Object.entries(parseJSONElement);

	ulElement.innerHTML = '';


	for(const [key,value] of entries){

		let liElement = document.createElement('li');
		liElement.className ='hero__item';

		liElement.innerHTML = `
			<form class="hero__description">
				<input class="hero__input input input__checkbox" type="checkbox" ${value ? 'checked' : ''}>
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
		ulElement.appendChild(liElement);
	}
	checkList()
}

function openItemOptions() {
	// Создаём переменную, которая является списком динамических элементов
	const ulElement = document.querySelector('[data-hero-ul-list]');

	// Вешаем событие, которое при клике отсылается к нажатию на модалку или удаление
	ulElement.addEventListener('click', (event) => {
		const target = event.target;
		// При нажатии проверяем, что нажато и в случае
		// если есть вложенные элемент в структуре найдётся за счёт closest
		const penBtn = target.closest('[data-pen-btn]');
		const trashBtn = target.closest('[data-trash-btn]');

		// Если нажата penBtn, то показать модалку
		if (penBtn) {

			const modalElem = document.querySelector('.modal')
			const dataLocalStorage = JSON.parse(localStorage.getItem('hero__item'));
			if (!dataLocalStorage ) return;

			const dataEntries = Object.entries(dataLocalStorage);

			for(let key of dataEntries) {
				const inputDataLocalStorage = document.querySelector('[data-modal-input]');

				inputDataLocalStorage.innerHTML = key;
			}
			showModal();
		}
		// Если нажата trashBtn, то создать переменную, которая найдёт родительский 
		// элемент .hero__item и удалит
		if (trashBtn) {
			const liElement = trashBtn.closest('.hero__item');
			const titleElement = liElement.querySelector('.hero__title');
			const title = titleElement.textContent.trim();

			if (!titleElement) return;
			
			let storedData = JSON.parse(localStorage.getItem('hero__item'));
			
			if (storedData.hasOwnProperty(title)) {
				delete storedData[title];
				localStorage.setItem('hero__item', JSON.stringify(storedData));
			}
			
			liElement.remove();
			checkList();
			saveAllItem();
		}
	});
}

checkList();
openItemOptions();
loadLocalStorage();
