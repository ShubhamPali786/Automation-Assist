import React from 'react';
import { FilterModel, SelectListModel } from '../models/Filters-Models';
import FilterControlStyles from './FilterControls.module.css';
interface FilterControlsProps {
    filterList: FilterModel[];
    
	factorselectlist:SelectListModel[],
	categoriesselectlist:SelectListModel[],
	categoryvaluesselectlist:SelectListModel[]

    onFactorChange: (value: string) => void;
    onCategoryChange:(value:string)=>void;
    onCategoryValueChange:(value:string)=>void;
    onaddbtnClick:()=>void;
}

const FilterControls: React.FC<FilterControlsProps> = (props) => {
	return (
		<div className={FilterControlStyles.filter_container}>
			<div className={FilterControlStyles.filter_container__selectfilter}>
				<h3>Select Factor</h3>
				<select
					onChange={(e: any) => props.onFactorChange(e.currentTarget.value)}
					value={props.factorselectlist.find((item) => item.selected)?.value}
				>
					{props.factorselectlist.map((item) => {
						return <option value={item.value}>{item.option}</option>;
					})}
				</select>
			</div>
			<div className={FilterControlStyles.filter_container__selectfilter}>
				<h3>Select Category</h3>
				<select
					onChange={(e: any) => props.onCategoryChange(e.currentTarget.value)}
					value={props.categoriesselectlist.find((item) => item.selected)?.value}
				>
					{props.categoriesselectlist.map((item) => {
						return <option value={item.value}>{item.option}</option>;
					})}
				</select>
			</div>
            
			<div className={FilterControlStyles.filter_container__selectfilter}>
				<h3>Select Category Value</h3>
				<select
					onChange={(e: any) => props.onCategoryValueChange(e.currentTarget.value)}
					value={props.categoryvaluesselectlist.find((item) => item.selected)?.value}
				>
					{props.categoryvaluesselectlist.map((item) => {
						return <option value={item.value}>{item.option}</option>;
					})}
				</select>
			</div>
            <div className={[FilterControlStyles.filter_container__selectfilter,FilterControlStyles.filter_container__btn_container].join(' ')}>
                <button onClick={()=>props.onaddbtnClick()}>Add Filter</button>
            </div>
		</div>
	);
};

export default FilterControls;
