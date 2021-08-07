import arrProducts from './products-stored.js';

const colorsButtons = document.querySelector('.card__colors');
const sizeButtons = document.querySelector('.card__sizes');
let selectedInArray = 0;

// Default preferences per purchase
const title = document.querySelector('.card__title').textContent;
const size = document.querySelector('.card__size--active').textContent;
const quantity = document.querySelector('.card__price').textContent;
// Shopping details object
const shoppingDetails = {
	name: title,
	color: arrProducts[selectedInArray].slug,
	size,
	quantity,
};
document.addEventListener('DOMContentLoaded', () => {
	createShoesCard();
	changeContentColors();

	colorsButtons.addEventListener('click', (e) => {
		selectShoeColor(e.target);
		changeContentColors();
		selectGradient();
		showShoeImage();
        setColor(element)
	});

	sizeButtons.addEventListener('click', (e) => setColor(e.target));
});

function createShoesCard() {
	const gradientWrapper = document.querySelector('.card__gradients');
	const shoesImagesWrapper = document.querySelector('.card__shoes');
	const colorsWrapper = document.querySelector('.card__colors');
	arrProducts.forEach((product) => {
		createGradients(product);
		createImg(product);
		colorButtons(product);
	});

	function createGradients(product) {
		const gradient = document.createElement('div');
		gradient.classList.add(`card__gradients--${product.slug}`);
		gradientWrapper.appendChild(gradient);
		gradientWrapper.firstElementChild.classList.add(
			'card__gradients--second'
		);
	}

	function createImg(product) {
		const shoeImg = document.createElement('img');
		shoeImg.src = `./img/${product.slug}.png`;
		shoeImg.classList.add('card__shoe');
		shoesImagesWrapper.appendChild(shoeImg);
		shoesImagesWrapper.firstElementChild.classList.add('card__shoe--show');
	}

	function colorButtons(product) {
		const colorButton = document.createElement('span');
		colorButton.classList.add(`card__colors--${product.slug}`);
		colorButton.id = product.slug;
		colorsWrapper.appendChild(colorButton);
		colorsWrapper.children[1].classList.add('card__colors--active');
	}
}

function changeContentColors() {
	// Span Tag in Title
	const spanTag = document.querySelector('.card__new');
	spanTag.style.background = `${arrProducts[selectedInArray].secondColor}`;

	// Card Sizes
	const cardSizeActive = document.querySelector('.card__size--active');
	// cardSizeActive.style.background = `${arrProducts[selectedInArray].secondColor}`

	// Card Button
	const button = document.querySelector('.card__buy');
	button.style.background = `${arrProducts[selectedInArray].secondColor}`;

	const shareIcon = document.querySelector('.card__share--icon');
	shareIcon.style.color = `${arrProducts[selectedInArray].secondColor}`;

    const size  = document.querySelector('.card__size--active');
    size.style.background = arrProducts[selectedInArray].secondColor
    size.style.color = arrProducts[selectedInArray].textColor

	// Shopping details
	shoppingDetails.color = arrProducts[selectedInArray].slug;
}

function selectShoeColor(element) {
	// Si no tiene "id" no continues
	if (!element.id) return;

	const colors = document.querySelectorAll('.card__colors span');
	colors.forEach((uniqueColor) => {
		uniqueColor.classList.remove('card__colors--active');
	});

	const colorId = element.id;
	const shoeIndex = arrProducts.findIndex(
		(product) => colorId === product.slug
	);
	selectedInArray = shoeIndex;
	element.classList.toggle('card__colors--active');
}

function selectGradient() {
	const gradient = document.querySelectorAll('.card__gradients div');
	// Luego de añadir la clase css para la primer gradiente visible quiero que luego de presionar otro elemento se elimine el anterior.
	gradient.forEach((uniqueGradient) => {
		uniqueGradient.classList.remove('card__gradients--first');
	});

	// Luego de elegir color cambiar la grandiente
	const gradientShown = gradient[selectedInArray];
	gradientShown.classList.add('card__gradients--first');
}

function showShoeImage() {
	const showImages = document.querySelectorAll('.card__shoes img');
	showImages.forEach((img) => {
		img.classList.remove('card__shoe--show');
	});
	showImages[selectedInArray].classList.add('card__shoe--show');
}

const media = window.matchMedia('(max-width:1024px)');

function setColor(element) {
    if (element.classList.contains('card__size')) {
        const prevSize = document.querySelectorAll('.card__size--active');
        prevSize.forEach(size => {
            size.classList.remove('card__size--active')
            size.style.background = '#eee'
            size.style.color = '#000'
        })


        element.classList.add('card__size--active')
        const sizes = document.querySelectorAll('.card__size--active');
        sizes.forEach(size => {
            size.style.background = arrProducts[selectedInArray].secondColor
            size.style.color = arrProducts[selectedInArray].textColor
        })

    }

	
}

function changeWindowsHeight() {
	const cardLeft = document.querySelector('.card__left');
	const nikeWord = document.querySelector('.card__nike');
	if (media.matches) {
		const heightShoeShown =
			document.querySelector('.card__shoe--show').scrollHeight;

		cardLeft.style.height = `${heightShoeShown * 1.1}px`;
		nikeWord.style.fontSize = `${heightShoeShown * 0.6}px`;
	} else {
		cardLeft.style.height = '90%';
		cardLeft.style.height = '12rem;';
	}
}

window.addEventListener('resize', () => changeWindowsHeight());
window.addEventListener('load', () => changeWindowsHeight())