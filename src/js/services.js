function addCard(card) {
	const templateEl = document.querySelector("#section-services__template");

	const containerCards = document.querySelector(
		".section-services__container-card"
	);

	templateEl.content.querySelector(
		".section-services__card-title"
	).textContent = card.title;

	templateEl.content.querySelector(
		".section-services__card-description"
	).textContent = card.description;

	templateEl.content.querySelector(".section-services__card-img").src =
		card.image;

	const clone = document.importNode(templateEl.content, true);
	containerCards.appendChild(clone);
}

function getServiceData() {
	return fetch(
		"https://cdn.contentful.com/spaces/jc9vtd7vh885/environments/master/entries?access_token=8kg0R5v09QEXLj1ZD6SEPj_EFpe6oYJ0iab8TobTdcs&content_type=servicios"
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const fieldsColl = data.items.map((item) => {
				return {
					title: item.fields.titulo,
					description: item.fields.descripcion,
					imageID: item.fields.imagen.sys.id,
					includes: data.includes.Asset,
				};
			});

			fieldsColl.forEach((item) => {
				const id = searchAsset(item.imageID, item.includes);
				item.image = "https:" + id.fields.file.url;
			});

			return fieldsColl;
		});
}

function searchAsset(imageID, includes) {
	const located = includes.find((x) => {
		return x.sys.id == imageID;
	});

	return located;
}

function main() {
	headerComponent(document.querySelector(".section-header"));
	headerMobileInteraction();

	footerComponent(document.querySelector(".section-footer"));

	getServiceData().then((cards) => {
		for (const card of cards) {
			addCard(card);
		}
	});
}

main();
