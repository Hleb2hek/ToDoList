// Импортируем showModal
import { showModal } from "./modal.js";

const itemOption = function () {

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
			showModal();
		}
		// Если нажата trashBtn, то создать переменную, которая найдёт родительский 
		// элемент .hero__item и удалит
		if (trashBtn) {
			const liElement = trashBtn.closest('.hero__item');
			liElement.remove();
		}
	});
}

itemOption()
