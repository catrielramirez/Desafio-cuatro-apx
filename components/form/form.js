function contactComponent(el) {
	const contactEl = document.createElement("div");

	contactEl.innerHTML = `
    <form class="form">
      <h2 class="form__title">Contactate</h2>
      <div class="form-content">
        <label for="user-name" class="form__label">NOMBRE</label>
        <input
          type="text"
          class="form__input"
          name="userName"
          id="user-name"
          required
        />
        <label for="email" class="form__label">EMAIL</label>
        <input type="email" class="form__input" name="userEmail" id="email" required />
        <label for="message" class="form__label">MENSAJE</label>
        <textarea
          id="message"
          name="message"
          class="form__input form__textarea-message"
        ></textarea>
        <div class="form__submit-cont">
          <button class="form__submit-button">Enviar</button>
        </div>
      </div>
    </form>
    `;

	const form = contactEl.querySelector(".form");
	const inputs = contactEl.querySelectorAll(".form__input");

	sendData(form, inputs);

	el.appendChild(contactEl);
}

function sendData(formEl, inputs) {
	formEl.addEventListener("submit", function (e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		const object = Object.fromEntries(formData.entries());

		const message = `
        Nombre del usuario: ${object.userName} <br> <br>
        Mail: ${object.userEmail} <br> <br>
        Mensaje: ${object.message}
      `;

		fetch("https://apx-api.vercel.app/api/utils/dwf", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",

			body: JSON.stringify({
				to: "catriel_ramirez@hotmail.com",

				message: message,
			}),
		})
			.then(() => {
				alert(
					"Mensaje enviado. Gracias, " + object.userName + " por comunicarte!"
				);

				inputs.forEach((input) => {
					input.value = "";
				});
			})
			.catch(() => {
				alert(
					"Ha ocurrido un error, revise haber completado los campos correctamente"
				);
			});
	});
}
