import React from 'react';
import { ProductModel } from '../models/Filters-Models';
import AutomationToolsTblStyles from './AutomationToolsTbl.module.css';
interface AutomationToolsTblProps {
	automationproductList: ProductModel[];
}

const AutomationToolsTbl: React.FC<AutomationToolsTblProps> = (props) => {
	return props.automationproductList.length > 0 ? (
		<div className={AutomationToolsTblStyles.automationtbl_container}>
			<h3>Search Result:</h3>
			<div className={AutomationToolsTblStyles.automationtbl_container__tbl_container}>
				<table>
					<thead>
						<th>Sr No.</th>
						<th>Product</th>
						<th>Pricing</th>
						<th>Rating</th>
						<th>Suggested Tool</th>
						<th>Reference</th>
					</thead>

					<tbody>
						{props.automationproductList.map((item, val) => {
							return (
								<tr>
									<td>{val + 1}</td>
									<td>{item.product}</td>
									<td>{item.pricing}</td>
									<td>{item.rating}</td>
									<td>{item.SuggestedTool}</td>
									<td>
										<a href={item.References}>Product Reference</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	) : null;
};

export default AutomationToolsTbl;
