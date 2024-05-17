import type { Currencies } from './types/currency.ts';

import { fetchCurrencies, fetchRatio } from './api.ts';

export async function poupalteSelects(idSelect: string) {
	const currencies = await fetchCurrencies("");
	const selectElement = document.querySelector('#'+idSelect);
	if(currencies && selectElement){
		for (const currency of Object.entries(currencies)) {
			const option = document.createElement('option');
			option.value = currency[0];
			option.textContent = currency[1].name;
			selectElement.append(option);
		}
	}
}

export async function displayConvertResult(){
	//On récupère les valeurs du formulaire
	const dataForm = getFormData();

	if(dataForm){
		//On récupère les valeurs de convertion de l'api grâce aux données du formulaire
		const dataApiForm = await getDataApiForm(dataForm.deviseBase, dataForm.deviseFinal);

		if(dataApiForm) {
			const ratioNumber= Object.values(dataApiForm.ratio)[0];
			const priceValue: number = +dataForm.price;

			if(ratioNumber != undefined &&
				priceValue != undefined
			){
				//On récupère les symboles
				const symbolBase = getFirstCurrency(dataApiForm.currencyBase);
				const symbolFinal = getFirstCurrency(dataApiForm.currencyFinal);

				if(symbolBase && symbolFinal){
					//On calcul le résultat et on l'affiche
					const result = getResultConvert(priceValue,+ratioNumber);
					const displayResult = getDisplayResult(priceValue,symbolBase,symbolFinal,result);

					//On regarde si un résultat a déjà était affiché ou pas
					const resultElement = document.querySelector('#result');
					resultElement ? changeArticleResult(displayResult, +ratioNumber) : createArticleResult(displayResult, +ratioNumber);
					appendConvertInTable(dataForm.price,symbolBase,result,symbolFinal);
				}
			}
		}
	}
}

export function getFormData(){
	const deviseBase = document.querySelector<HTMLSelectElement>('#devise-base');
	const deviseFinal = document.querySelector<HTMLSelectElement>('#devise-final');
	const price = document.querySelector<HTMLInputElement>('#price');
	return deviseBase && deviseFinal && price ? {deviseBase:deviseBase.value,deviseFinal:deviseFinal.value,price:price.value} : undefined;
}

export async function getDataApiForm(deviseBase:string,deviseFinal:string){
	const ratio = await fetchRatio(deviseBase, deviseFinal);
	const currencyBase = await fetchCurrencies(deviseBase);
	const currencyFinal = await fetchCurrencies(deviseFinal);
	return ratio && currencyBase && currencyFinal ? {ratio:ratio,currencyBase:currencyBase,currencyFinal:currencyFinal} : undefined;
}

export function getFirstCurrency(currencies: Currencies) {
	const currency = Object.entries(currencies)[0];
	return currency ? currency[1].symbol : undefined;
}

export function getResultConvert(priceValue:number, ratio:number){
	return priceValue*ratio;
}
export function getDisplayResult(priceBase:number, symbolBase: string, symbolFinal: string, result: number){
	return priceBase + symbolBase + ' = ' + result + symbolFinal;
}

export function changeArticleResult(displayResult: string, ratioNumber: number) {
	//On récupère les balises à modifier
	const resultEqual = document.querySelector('#result-equal');
	const ratioTxt = document.querySelector('#result-ratio');

	//On modifie les valeurs
	if(resultEqual && ratioTxt){
		resultEqual.textContent = displayResult;
		ratioTxt.textContent = "Taux: "+ratioNumber;
	}
}

export function createArticleResult(displayResult: string, ratioNumber: number) {
	const container = document.querySelector('#container');
	if(container != undefined){
		//On créé la balise article
		const article = document.createElement('article');
		article.id = "result";

		//On créé le titre
		const title = document.createElement('h2');
		title.textContent = "Résultat de la convertion";

		//On affiche le calcul
		const resultEqual = document.createElement('p');
		resultEqual.id = "result-equal";
		resultEqual.textContent = displayResult;

		//On affiche le taux
		const ratioTxt = document.createElement('p');
		ratioTxt.id = "result-ratio";
		ratioTxt.textContent = "Taux: "+ratioNumber.toString();

		//On créé la balise article avec le résultat final
		article.append(title);
		article.append(resultEqual);
		article.append(ratioTxt);
		container.append(article);
	}
}

export function appendConvertInTable(price:string, deviseBase:string, result:number, deviseFinal:string){
	//On regarde si un tableau a déjà était affiché ou pas
	const table = document.querySelector('#table');
	table ?? createConvertTable();
	const tbody = document.querySelector('#tbody');
	if(tbody){
		const tr = document.createElement('tr');
		const date = new Date();
		const columnsTr = [price,deviseBase,result,deviseFinal,date.toDateString()]
		for (const title of columnsTr) {
			const td = document.createElement('td');
			if (typeof title === "string") {
				td.textContent = title;
			}
			tr.append(td);
		}
		tbody.append(tr);
	}
}

export function createConvertTable(){
	const container = document.querySelector('#container');
	if(container != undefined) {
		//On créé la balise article
		const article = document.createElement('article');
		article.id = "table";

		//On créé le titre
		const title = document.createElement('h2');
		title.textContent = "Anciennes convertions";

		//On créé le tableau
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const trThead = document.createElement('tr');
		const tbody = document.createElement('tbody');
		tbody.id = "tbody";
		const columnsTitle = ['Prix','Devise de base','Resultat','Devise de résultat','Date']
		for (const title of columnsTitle) {
			const th = document.createElement('th');
			th.scope = "col";
			th.textContent = title;
			trThead.append(th);
		}
		thead.append(trThead);
		table.append(thead);
		table.append(tbody);

		article.append(title);
		article.append(table);
		container.append(article);
	}

}
