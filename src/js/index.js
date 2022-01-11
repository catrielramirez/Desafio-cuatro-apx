function addWelcomeData(params = {}) {
	document.querySelector(".section-welcome__title").textContent = params.title;

	document.querySelector(".subtitle").textContent = params.subtitle;
}

function getWelcomeData() {
	fetch(
		"https://cdn.contentful.com/spaces/jc9vtd7vh885/environments/master/entries?access_token=8kg0R5v09QEXLj1ZD6SEPj_EFpe6oYJ0iab8TobTdcs&content_type=home"
	)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			const item = json.items["0"].fields;
			const params = {
				title: item.titulo,
				subtitle: item.subTitle,
			};
			addWelcomeData(params);
		});
}

function addAboutMeData(params = {}) {
	document.querySelector(".section-about-me__title").textContent = params.title;

	document.querySelector(".section-about-me__paragraph").textContent =
		params.description;

	document.querySelector(".section-about-me__img").src = params.image;
}

function getAboutMeData() {
	fetch(
		"https://cdn.contentful.com/spaces/jc9vtd7vh885/environments/master/entries?access_token=8kg0R5v09QEXLj1ZD6SEPj_EFpe6oYJ0iab8TobTdcs&content_type=presentacion"
	)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			const item = json.items["0"].fields;

			const imgURL = json.includes.Asset["0"].fields.file.url;

			const params = {
				title: item.titulo,
				description: item.descripcion,
				image: imgURL,
			};

			addAboutMeData(params);
		});
}

function addServiceCard(params = {}) {
	const templateEl = document.querySelector("#section-services__template");

	const containerCards = document.querySelector(
		".section-services__container-card"
	);

	templateEl.content.querySelector(
		".section-services__card-title"
	).textContent = params.title;

	templateEl.content.querySelector(
		".section-services__card-description"
	).textContent = params.description;

	templateEl.content.querySelector(".section-services__card-img").src =
		params.image;

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
		.then((json) => {
			const fieldsColl = json.items.map((item) => {
				return {
					title: item.fields.titulo,
					description: item.fields.descripcion,
					imageID: item.fields.imagen.sys.id,
					includes: json.includes.Asset,
				};
			});

			fieldsColl.forEach((item) => {
				const id = searchAsset(item.imageID, item.includes);

				item.image = "https:" + id.fields.file.url;
			});

			return fieldsColl;
		});
}

function searchAsset(assetID, includes) {
	const located = includes.find((i) => {
		return i.sys.id == assetID;
	});

	return located;
}

function main() {
	headerComponent(document.querySelector(".section-header"));
	headerMobileInteraction();

	getWelcomeData();

	getAboutMeData();

	getServiceData().then((cards) => {
		for (const card of cards) {
			addServiceCard(card);
		}
	});

	contactComponent(document.querySelector(".section-contact"));

	footerComponent(document.querySelector(".section-footer"));
}

main();
