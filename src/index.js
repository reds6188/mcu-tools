import "./style.css";
import "./oled.css";

const loadedScripts = {};

const contentMap = {
	hex: () => import("./content/hex.html"),
	oled: () => import("./content/oled.html"),
};

const scriptMap = {
	hex: () => import("./scripts/hex.js"),
	oled: () => import("./scripts/oled.js"),
};

async function loadContent(page) {
    const content = document.getElementById("content");

	try {
        const htmlModule = await contentMap[page]();
        content.innerHTML = htmlModule.default;

		// Carica ed esegui lo script JS associato
		if (scriptMap[page]) {
			if (!loadedScripts[page]) {
				const scriptModule = await scriptMap[page]();
				if (scriptModule.init) {
					scriptModule.init();
				}
			}
        }
    } catch (err) {
        content.innerHTML = `<p>Errore: ${err}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll("nav div").forEach(element => {
		element.addEventListener("click", (event) => {
			event.preventDefault();
			loadContent(element.id);
		});
	});
});