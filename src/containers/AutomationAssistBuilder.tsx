import React from 'react';
import { axiosInstance } from '../AxiosBase';
import ActiveFilterList from '../components/ActiveFilterList';
import AutomationToolsTbl from '../components/AutomationToolsTbl';
import FilterControls from '../components/FilterControls';
import { AppliedFiltersModel, AutomationToolModel, FilterModel, ProductModel, SelectListModel } from '../models/Filters-Models';

interface AutomationAssistProps {}

interface AutomationAssistState {
	multiselectlist: FilterModel[];
	factorselectlist: SelectListModel[];
	categoriesselectlist: SelectListModel[];
	categoryvaluesselectlist: SelectListModel[];
	filtersList: AppliedFiltersModel[];
	automationtoolsList:AutomationToolModel[];
	automationproductsList:ProductModel[]
}

class AutomationAssistBuilder extends React.Component<AutomationAssistProps, AutomationAssistState> {
	state: AutomationAssistState = {
		multiselectlist: [],
		filtersList: [],
		automationtoolsList:[],
		automationproductsList:[],
		factorselectlist: [
			{
				option: 'SELECT',
				value: 'SELECT',
				selected: true,
			},
		],
		categoriesselectlist: [
			{
				option: 'SELECT',
				value: 'SELECT',
				selected: true,
			},
		],
		categoryvaluesselectlist: [
			{
				option: 'SELECT',
				value: 'SELECT',
				selected: true,
			},
		],
	};

	componentDidMount() {
		axiosInstance.get('/multilist').then((res) => this.updateFactorSelectList(res.data));

		axiosInstance.get("/automationtoolslist").then(res=>this.setState({automationtoolsList:res.data}));
	}

	updateFactorSelectList = (data: FilterModel[]) => {
		let multiselectList = [...data];
		let factorselectlist = multiselectList.map((item) => {
			return {
				option: item.factor.value,
				value: item.factor.code,
				selected: false,
			};
		});
		this.setState({
			factorselectlist: this.state.factorselectlist.concat(factorselectlist),
			multiselectlist: data,
		});
	};

	onFactorChange = (value: string) => {
		let factorselectlist = [...this.state.factorselectlist];

		factorselectlist.map((item) => {
			item.selected = item.value === value ? true : false;
			return item;
		});
		this.updateCategoriesSelectList(factorselectlist, value);
	};

	updateCategoriesSelectList = (factorselectlist: SelectListModel[], factorcode: string) => {
		let multilist = [...this.state.multiselectlist];
		let factorobj = multilist.find((item) => item.factor.code === factorcode)!;
		let categoryList: SelectListModel[] = this.getdefaultselectoptions();
		categoryList = categoryList.concat(
			factorobj.categories.map((item) => {
				return {
					option: item.value,
					value: item.code,
					selected: false,
				};
			})
		);

		this.setState({
			categoriesselectlist: categoryList,
			factorselectlist: factorselectlist,
		});
	};

	oncategoryChange = (value: string) => {
		let categorylist = [...this.state.categoriesselectlist];

		categorylist.map((item) => {
			item.selected = item.value === value ? true : false;
			return item;
		});
		this.updateCategoryValues(value, categorylist);
	};

	updateCategoryValues = (categorycode: string, categoryList: SelectListModel[]) => {
		let multilist = [...this.state.multiselectlist];
		let factorcode = this.state.factorselectlist.find((item) => item.selected)!.value;
		let currentfactor = multilist.find((item) => item.factor.code === factorcode);
		let currentCategory = currentfactor?.categories.find((item) => item.code === categorycode)!;

		let categoryvalues: SelectListModel[] = this.getdefaultselectoptions();
		categoryvalues = categoryvalues.concat(
			currentCategory.categoryvalues.map((item) => {
				return {
					option: item.value,
					value: item.code,
					selected: false,
				};
			})
		);

		this.setState({
			categoriesselectlist: categoryList,
			categoryvaluesselectlist: categoryvalues,
		});
	};

	oncategoryvaluechange = (value: string) => {
		let categoryvalueslist = [...this.state.categoryvaluesselectlist];

		categoryvalueslist.map((item) => {
			item.selected = item.value === value ? true : false;
			return item;
		});

		this.setState({ categoryvaluesselectlist: categoryvalueslist });
	};

	ondeleteClick = (factorcode: string, categorycode: string, categoryvaluecode: string) => {
		let filterList = [...this.state.filtersList];
		filterList = filterList.filter((item) => 
			item.factor.value != factorcode &&
				item.category.value != categorycode &&
				item.categoryvalue.value != categoryvaluecode);

		this.setState({ filtersList: filterList });
		this.updateAutomationToolsList(filterList);
	};

	onaddbtnClick = () => {
		let filterList = [...this.state.filtersList];

		let activeFilter: AppliedFiltersModel = {
			factor: this.state.factorselectlist.find((item) => item.selected)!,
			category: this.state.categoriesselectlist.find((item) => item.selected)!,
			categoryvalue: this.state.categoryvaluesselectlist.find((item) => item.selected)!,
		};
		if(activeFilter.factor.value==='SELECT'|| activeFilter.category.value ==='SELECT' || activeFilter.categoryvalue.value === 'SELECT')
		{
			alert('Please select filter first.')
			return;
		}

		let isFilterAlreadyExists = filterList.find(
			(item) =>
				item.factor.value === activeFilter.factor.value &&
				item.category.value === activeFilter.category.value &&
				item.categoryvalue.value === activeFilter.categoryvalue.value
		);
		if (isFilterAlreadyExists) {
			alert('already added to list');
			return;
		}
		filterList.push(activeFilter);

		this.setState({filtersList:filterList})
		this.updateAutomationToolsList(filterList);

	};

	updateAutomationToolsList = (activeFilterList:AppliedFiltersModel[])=>{
		let automationtoolsList = [...this.state.automationtoolsList];

		let updateAutomationToolsList:ProductModel[]=[];
		activeFilterList.forEach(filter=>{
			let filteredList = automationtoolsList.find(item=>
				item.factor===filter.factor.value && item.category===filter.category.value 
				&& item.categoryvalue === filter.categoryvalue.value)?.tools;

				if(filteredList && filteredList.length>0)
				updateAutomationToolsList= updateAutomationToolsList.concat(filteredList);
		});
		let updatedList = this.removeDuplicatefromList(updateAutomationToolsList);

		this.setState({automationproductsList:updatedList})
	}

	removeDuplicatefromList = (automationlist:ProductModel[])=>{
		let filteredlist:ProductModel[] = [];
		automationlist.forEach(listitem=>{
			let isAlreadyexists = filteredlist.findIndex(item=>item.product ===listitem.product)
			if(isAlreadyexists == -1)
			{
				filteredlist.push(listitem);
			}
		});

		return filteredlist;
	}

	getdefaultselectoptions = () => [
		{
			option: 'SELECT',
			value: 'SELECT',
			selected: true,
		},
	];

	render() {
		return (
			<>
				<FilterControls
					categoriesselectlist={this.state.categoriesselectlist}
					categoryvaluesselectlist={this.state.categoryvaluesselectlist}
					factorselectlist={this.state.factorselectlist}
					filterList={this.state.multiselectlist}
					onFactorChange={this.onFactorChange}
					onCategoryChange={this.oncategoryChange}
					onCategoryValueChange={this.oncategoryvaluechange}
					onaddbtnClick={this.onaddbtnClick}
				/>
				<ActiveFilterList
					filtersList={this.state.filtersList}
					ondeletefilter={(factorcode: string, categorycode: string, categoryvaluecode: string) =>
						this.ondeleteClick(factorcode, categorycode, categoryvaluecode)
					}
				/>
				<AutomationToolsTbl automationproductList={this.state.automationproductsList} />
			</>
		);
	}
}

export default AutomationAssistBuilder;
