const { FastText, addOnPostRun } = require("browser-fasttext.js");

const initFastText = function() {
	return new Promise(function(resolve){
		if(window.fastTextModel) {
			return resolve();
		} else {
			addOnPostRun(function(){
				const fastText = new FastText();
				fastText.loadModel("model.bin").then(function(model){
					window.fastTextModel = model;
					resolve();
				});
			});
		}
	});
};

const runApp = function() {
	initFastText().then(function(){
		document.querySelector("#fasttext-loading").style.display = "none";
		document.querySelector("#try-it-out").style.display = "block";
		document.querySelector("#detect").addEventListener("click", function(){
			const inputText = document.querySelector("#inputText").value;
			const result = window.fastTextModel.predict(inputText);
			const predictions = [];
            for (let i = 0; i < result.size(); i++) {
                const prediction = result.get(i);
                predictions.push({ score: prediction[0], label: prediction[1] });
            }
            predictions.sort(function (a, b) { return b.score - a.score; });
            document.querySelector("#detectedLanguage").innerHTML = "Detected language: " + predictions[0].label.substring("__label__".length);
		});
	});
}

document.addEventListener("DOMContentLoaded", runApp);