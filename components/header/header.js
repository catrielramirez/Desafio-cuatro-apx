function headerMobileInteraction() {
	const burguerEl = document.querySelector(".header__burger-img");
	const windowEl = document.querySelector(".burguer-window");

	burguerEl.addEventListener("click", () => {
		windowEl.style.display = "inherit";
	});

	const closeEl = document.querySelector(
		".burguer-window__close-container-img"
	);

	closeEl.addEventListener("click", () => {
		windowEl.style.display = "";
	});
}

function headerComponent(el) {
	const headerEl = document.createElement("div");

	headerEl.innerHTML = `
      <header class="header">
        <a href="./index.html" class="header__link-home">
          <img src="./images/logo.png" alt="Logo" class="header__logo" />
        </a>
          <div class="header__desktop-menu">
              <nav class="header__desktop-nav">
                  <a href="./portfolio.html" class="header__desktop-link">PORTFOLIO</a>
                  <a href="./servicios.html" class="header__desktop-link">SERVICIOS</a>
                  <a href="./contacto.html" class="header__desktop-link">CONTACTO</a>
              </nav>
          </div>
          <div class="header__burger-menu">
              <img src="./images/burger.png" alt="Menu" class="header__burger-img" />
              <div class="burguer-window">
                  <div class="burguer-window__close-container">
                      <img class="burguer-window__close-container-img"
                      src="./images/close.png"
                      alt="X"
                      class="burguer-window__close"
                      />
                  </div>
                  <nav class="burguer-window__nav">
                      <a href="./portfolio.html" class="burguer-window__link"
                      >Portfolio</a>
                      <a href="./servicios.html" class="burguer-window__link"
                      >Servicios</a>
                      <a href="./contacto.html" class="burguer-window__link">Contacto</a>
                  </nav>
              </div>
          </div>
      </header>
    `;

	el.appendChild(headerEl);
}
