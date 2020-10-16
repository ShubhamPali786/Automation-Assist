import { faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AppliedFiltersModel } from '../models/Filters-Models';
import ActiveFilterListStyles from './ActiveFilterList.module.css';

interface ActiveFilterListProps {
	filtersList: AppliedFiltersModel[];

	ondeletefilter:(factorcode:string,categorycode:string,categoryvaluecode:string)=>void;
}
const ActiveFilterList: React.FC<ActiveFilterListProps> = (props) => {
	return props.filtersList.length > 0 ? (
		<div className={ActiveFilterListStyles.activefilters_container}>
			<div className={ActiveFilterListStyles.activefilters_container__filter_label_container}>
				<h3>Factor</h3>
				<h3>Category</h3>
				<h3>Category Value</h3>
			</div>
			{props.filtersList.map((item) => {
				return (
					<div className={ActiveFilterListStyles.activefilters_container__activefilter}>
						<h4>{item.factor.option}</h4>
                        <h4>{item.category.option}</h4>
                        <h4>{item.categoryvalue.option}</h4>
                        <h4 style={{cursor:"pointer"}} onClick={()=>props.ondeletefilter(item.factor.value,item.category.value,item.categoryvalue.value)} > <FontAwesomeIcon color="#ff073a" icon={faTimesCircle} size="lg"/></h4>
					</div>
				);
			})}
		</div>
	) : null;
};
export default ActiveFilterList;
