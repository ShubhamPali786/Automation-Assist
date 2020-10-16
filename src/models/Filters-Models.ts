export interface FilterModel {
	factor: {
		value: string;
		code: string;
		selected: boolean;
	};
	categories: {
		value: string;
		code: string;
		selected: boolean;
		categoryvalues: {
			value: string;
			code: string;
			selected: boolean;
		}[];
	}[];
}

export interface SelectListModel {
	value: string;
	option: string;
	selected: boolean;
}

export interface AppliedFiltersModel {
	factor: SelectListModel;
	category: SelectListModel;
	categoryvalue: SelectListModel;
}

export interface AutomationToolModel {
	factor: string;
	category: string;
	categoryvalue: string;
	tools: ProductModel[];
}
export interface ProductModel{
	product: string;
		pricing: string;
		rating: number;
		SuggestedTool: string;
		References: string;
}
