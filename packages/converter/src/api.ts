import type { Currencies, Ratio } from './types/currency.ts';

// On récupère les variables d'environnement de l'API
const apiUrl: string = import.meta.env.VITE_CONVERTER_URL;
const apiKey: string = import.meta.env.VITE_CONVERTER_API_KEY;

export interface CurrenciesResponse{
	data: Currencies;
}
export async function fetchCurrencies(currenciesDefined: string|undefined) {
	try {
		const response = await (currenciesDefined ? fetch(`${apiUrl}/currencies?apikey=${apiKey}&currencies=${currenciesDefined}`, {
			method: 'GET',
		}) : fetch(`${apiUrl}/currencies?apikey=${apiKey}`, {
			method: 'GET',
		}));
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const currencies = await response.json() as CurrenciesResponse;
		return currencies.data;
	}
	catch {
		return;
	}
}

export interface RatioResponse{
	data: Array<Ratio>;
}

export async function fetchRatio(deviseBase: string|undefined,deviseFinal: string|undefined) {
	try {
		const response = await fetch(`${apiUrl}/latest?apikey=${apiKey}&base_currency=${deviseBase}&currencies=${deviseFinal}`, {
			method: 'GET',
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const ratio = await response.json() as RatioResponse;
		return ratio.data;
	}
	catch {
		return;
	}
}
