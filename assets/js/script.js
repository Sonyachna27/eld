document.addEventListener("DOMContentLoaded", () =>{
	openHeader();
	windowLoad();
	sliderFunction();
	accordionFunction();
	downloadFileOnClick();
});

const openHeader = () =>{
	const htmlElement = document.querySelector('html');
	const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelectorAll('nav ul a');
burgerBtn.addEventListener('click', () =>{
	htmlElement.classList.toggle('open');
});

navLinks.forEach((link) =>{
	link.addEventListener('click', () =>{
		htmlElement.classList.remove('open');
	})
})
}
function windowLoad() {

	function statValueInit(statValues) {
		let values = statValues ? statValues : document.querySelectorAll('.stat-value');
		if (values) {
			values.forEach(statValue => {
				numScroll(statValue);
			})
		}
	}

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const statValues = targetElement.querySelectorAll('.stat-value');
				if (statValues.length) {
					statValueInit(statValues);
				}
			}
		})
	}, { threshold: 0.3 });

	let sections = document.querySelectorAll('.about__container-bottom-item');
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		})
	}

	function numScroll(statValue) {
		let zeroValues = () => {
			statValue.innerHTML = 0;
		}

		const animationDuration = 3000;
		const frameDuration = 1000 / 60;
		const totalFrames = Math.round(animationDuration / frameDuration);
		const easeOutQuad = t => t * (2 - t);

		const animateCountUp = () => {
			let frame = 0;
			const countTo = parseInt(statValue.dataset.target.replace(/,/g, ''), 10);

			const counter = setInterval(() => {
				frame++;
				const progress = easeOutQuad(frame / totalFrames);
				const currentCount = Math.round(countTo * progress);

				if (parseInt(statValue.innerHTML, 10) !== currentCount) {
					statValue.innerHTML = currentCount;
				}

				if (frame === totalFrames) {
					clearInterval(counter);
					statValue.innerHTML = statValue.dataset.target;
				}
			}, frameDuration);
		}

		const runAnimations = () => {
			animateCountUp();
		}
		runAnimations();
	}
	window.addEventListener('DOMContentLoaded', () => {
		statValueInit();
	});

}

const downloadFileOnClick = () => {
	const buttons = document.querySelectorAll('button[data-download]');

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const fileUrl = button.getAttribute('data-download');
			const link = document.createElement('a');
			link.href = fileUrl;
			link.download = fileUrl.split('/').pop();
			link.click();
		});
	});
};

const sliderFunction = () => {
  const sliderInit = document.querySelector('.chooseSwiper'); // виправлено тут
  if (!sliderInit) return;

  var chooseSwiper = new Swiper('.chooseSwiper', { // виправлено тут
    pagination: {
      el: ".choose-pagination",
    },
    slidesPerView: 1,
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
}

const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  
  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
    });
  });
};