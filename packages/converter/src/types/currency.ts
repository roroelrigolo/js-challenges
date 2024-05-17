export type Currencies = Record<string, {
		symbol: string;
		name: string;
		symbol_native: string;
		rounding: number;
		code: number;
		name_plural: string;
	}>;

export type Ratio = {
	ratio: number;
}

