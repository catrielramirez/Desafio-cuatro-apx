function addCard(card) {
	const templateEl = document.querySelector("#section-portfolio__template");

	const containerCards = document.querySelector(
		".section-portfolio__container-card"
	);

	templateEl.content.querySelector(
		".section-portfolio__card-title"
	).textContent = card.title;

	templateEl.content.querySelector(
		".section-portfolio__card-description"
	).textContent = card.description;

	templateEl.content.querySelector(".section-portfolio__card-img").src =
		card.image;

	templateEl.content.querySelector(".section-portfolio__card-link").href =
		card.url;

	const clone = document.importNode(templateEl.content, true);
	containerCards.appendChild(clone);
}

function getPortfolioData() {
	return fetch(
		"https://cdn.contentful.com/spaces/jc9vtd7vh885/environments/master/entries?access_token=8kg0R5v09QEXLj1ZD6SEPj_EFpe6oYJ0iab8TobTdcs&content_type=Portfolio"
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const fieldsColl = data.items.map((item) => {
				return {
					title: item.fields.titulo,
					description: item.fields.descripcion,
					url: item.fields.url,
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

	getPortfolioData().then((cards) => {
		for (const card of cards) {
			addCard(card);
		}
	});
}

main();
