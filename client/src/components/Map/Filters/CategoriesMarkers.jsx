import { useState } from 'react';
import { Checkbox, Popover, Row } from 'antd';
import { IconChevronDown } from '@/components/Icons';
import { useGetCategories } from '@/services/queries/categoryQueries';

import styles from './FiltersMarkers.module.css';

const categoriesFilters = {
	type: 'M',
	visible: '1',
};

export const CategoriesMarkers = ({ setFilters }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Popover
			placement='bottomLeft'
			title={null}
			content={<CategoriesCheckboxGroup setFilters={setFilters} />}
			showArrow={false}
			align={{ offset: [0, -10] }}
			open={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
			trigger='click'>
			<span className={styles.buttonFilter} onClick={(e) => e.preventDefault()}>
				Categorías{' '}
				<span className={isOpen ? styles.less : styles.more}>
					<IconChevronDown size={16} />
				</span>{' '}
			</span>
		</Popover>
	);
};

export const CategoriesCheckboxGroup = ({ setFilters }) => {
	const [checkedValues, setCheckedValues] = useState([]);
	const [isAllOptions, setIsAllOptions] = useState(true);
	const { isSuccess: isSuccessCategories, data: categories } =
		useGetCategories(categoriesFilters);

	const onChangeAllOptions = (e) => {
		if (!e.target.checked && isAllOptions) return;
		setIsAllOptions(e.target.checked);
		setCheckedValues([]);
		setFilters({ categoriesIds: null });
	};

	const onChangeGroup = (checkedValues) => {
		if (isAllOptions) setIsAllOptions(false);

		if (checkedValues.length === 3) {
			setCheckedValues([]);
			setFilters({ categoriesIds: null });
			return setIsAllOptions(true);
		}
		setCheckedValues(checkedValues);
		setFilters({ categoriesIds: checkedValues });

		if (!checkedValues.length) setIsAllOptions(true);
	};

	return (
		<div className={styles.menuCategories}>
			<Checkbox
				className={styles.itemCategory}
				onChange={onChangeAllOptions}
				checked={isAllOptions}>
				Todas
			</Checkbox>
			<Checkbox.Group
				style={{
					width: '100%',
				}}
				value={checkedValues}
				onChange={onChangeGroup}>
				{isSuccessCategories
					? categories.map((category) => (
							<Row key={category._id}>
								<Checkbox className={styles.itemCategory} value={category._id}>
									{category.name}
								</Checkbox>
							</Row>
					  ))
					: null}
			</Checkbox.Group>
		</div>
	);
};
