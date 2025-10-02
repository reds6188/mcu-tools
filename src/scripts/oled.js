export function init() {

	// OLED -------------------------------------------------------------------------------------------
	const WIDTH = 128, HEIGHT = 64, BYTES = 1024;
	const canvas = document.getElementById('oledCanvas');
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	const scaleSel = document.getElementById('scale');
	const invertChk = document.getElementById('invert');
	const gridChk = document.getElementById('grid');

	// set canvas display size (will be scaled on render)
	function setCanvasScale(s) {
		canvas.style.width = (WIDTH * s) + 'px';
		canvas.style.height = (HEIGHT * s) + 'px';
		// keep real canvas at 128x64 for pixel-perfect image data
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
	}

	function invertImage() {
		const img = ctx.getImageData(0, 0, WIDTH, HEIGHT);

		for (let i=0;i<img.data.length;i+=4) {
			img.data[i+0] = 255 - img.data[i+0];
			img.data[i+1] = 255 - img.data[i+1];
			img.data[i+2] = 255 - img.data[i+2];
		}

		ctx.putImageData(img, 0, 0);	
	}

	function toggleGrid(visible) {
		const buffer = parseHexBuffer(hexInput.value);
		renderBuffer(buffer);

		// Draw grid
		if(visible) {
			ctx.save();
			ctx.globalAlpha = 0.12;
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#888';
			// vertical every 8 px
			for (let gx = 0; gx <= WIDTH; gx += 8) {
				ctx.beginPath();
				ctx.moveTo(gx + 0.5, 0);
				ctx.lineTo(gx + 0.5, HEIGHT);
				ctx.stroke();
			}
			// horizontal every 8 px
			for (let gy = 0; gy <= HEIGHT; gy += 8) {
				ctx.beginPath();
				ctx.moveTo(0, gy + 0.5);
				ctx.lineTo(WIDTH, gy + 0.5);
				ctx.stroke();
			}
			ctx.restore();
		}
	}

	// Parse possibile input testuale in vari formati -> Uint8Array of length BYTES (or shorter)
	function parseHexBuffer(text) {
		if (!text) return new Uint8Array(BYTES);
		// rimuovi parentesi e "0x", split su virgole o spazi
		const cleaned = text.replace(/\[|\]|0x/gi,' ').replace(/,/g,' ').trim();
		const parts = cleaned.split(/\s+/).filter(Boolean);
		const arr = [];
		for (let p of parts) {
			// supporta anche "FF" o "0xFF" o "255"
			if (/^[0-9A-Fa-f]{1,2}$/.test(p)) {
				arr.push(parseInt(p, 16));
			} else if (/^\d+$/.test(p)) {
				arr.push(parseInt(p, 10));
			} else {
				// ignora elementi non parsabili
			}
			if (arr.length >= BYTES) break;
		}
		// se meno di BYTES -> pad con 0
		while (arr.length < BYTES) arr.push(0);
		return new Uint8Array(arr.slice(0, BYTES));
	}

	// CORE: renderizza buffer (SSD1306 page format)
	// Assunzione: buffer.length == 128 * 8
	// Ogni pagina (0..7) -> 128 byte. Per ogni x (0..127), il byte contiene 8 pixel verticali.
	// Bit order: LSB-first (bit0 -> y = page*8 + 0). Se vuoi MSB-first, switcha il bit mask (vedi commento).
	function renderBuffer(buffer) {
		const img = ctx.createImageData(WIDTH, HEIGHT);
		// fill black
		for (let i=0;i<img.data.length;i+=4) {
			img.data[i+0] = 0;
			img.data[i+1] = 0;
			img.data[i+2] = 0;
			img.data[i+3] = 255;
		}

		for (let page = 0; page < 8; page++) {
			for (let x = 0; x < WIDTH; x++) {
				const byte = buffer[page * WIDTH + x];
				// LSB-first mapping:
				for (let bit = 0; bit < 8; bit++) {
					const y = page * 8 + bit;
					if (y >= HEIGHT) continue;
					const on = (byte >> bit) & 1; // <-- LSB-first: bit 0 = top pixel
					// If your buffer is MSB-first (bit7 is top), use:
					// const on = (byte >> (7-bit)) & 1;
					const idx = (y * WIDTH + x) * 4;
					if (on) {
						img.data[idx+0] = 255;
						img.data[idx+1] = 255;
						img.data[idx+2] = 255;
						img.data[idx+3] = 255;
					}
				}
			}
		}
		ctx.putImageData(img, 0, 0);
	}

	// Download visible canvas scaled by selected scale (so file is big enough)
	function downloadPNG(filename = 'oled_128x64.png') {
		const s = parseInt(scaleSel.value);
		// create temp canvas large
		const tmp = document.createElement('canvas');
		tmp.width = WIDTH * s;
		tmp.height = HEIGHT * s;
		const tctx = tmp.getContext('2d');
		// draw source canvas (which is 128x64) scaled up
		tctx.imageSmoothingEnabled = false;
		tctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);
		const url = tmp.toDataURL('image/png');
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
	}

	function downloadBIN(filename = 'oled_128x64.bin') {
		const buffer = parseHexBuffer(hexInput.value);

		// Crea blob binario
		const blob = new Blob([buffer], { type: "application/octet-stream" });

		// Crea link di download
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "output.bin"; // nome file
		a.click();

		// Rilascia oggetto URL dopo l'uso
		URL.revokeObjectURL(a.href);
	}

	setCanvasScale(parseInt(scaleSel.value));
	const buffer = parseHexBuffer(hexInput.value);
	console.log(buffer.length)
	renderBuffer(buffer);

	document.getElementById("refresh").addEventListener("click", () => {
		setCanvasScale(parseInt(scaleSel.value));
		const buf = parseHexBuffer(hexInput.value);
		renderBuffer(buf);
	});

	document.getElementById("invert").addEventListener("change", () => {
		invertImage();
	});

	document.getElementById("grid").addEventListener("change", (event) => {
		toggleGrid(event.target.checked)
	});

	document.getElementById("download-png").addEventListener("click", () => {
		downloadPNG(document.getElementById("file-name").value);
	});

	document.getElementById("download-bin").addEventListener("click", () => {
		downloadBIN();
	});
}