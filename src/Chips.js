import { Chip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default class ChipStack {
	constructor(sortSettings, filterSettings, onFilterOrSettingsChanged) {
		this.onFilterOrSettingsChanged = onFilterOrSettingsChanged;
		this.filterSettings = filterSettings;
		this.sortSettings = sortSettings;
	}

	activateSort(sort) {
		for (const sortSett of this.sortSettings) {
			if (sortSett.attribute === sort.attribute && sortSett.active) {
				sortSett.des = !sortSett.des;
			}
			sortSett.active = sortSett.attribute === sort.attribute;
		}
		this.onFilterOrSettingsChanged();
	}

	activateFilter(filter) {
		for (const filterSett of this.filterSettings) {
			if (filterSett.attribute === filter.attribute) {
				filterSett.active = !filterSett.active;
			}
		}
		this.onFilterOrSettingsChanged();
	}

	getSortComponents() {
		const sortComponents = [];
		for (const sortSett of this.sortSettings) {
			sortComponents.push(
				<Chip
					key={sortSett.name}
					onClick={() => this.activateSort(sortSett)}
					icon={
						!sortSett.active ? (
							<div></div>
						) : sortSett.des ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowUpIcon />
						)
					}
					label={sortSett.name}
					variant={sortSett.active ? 'outlined' : ''}
				/>
			);
		}
		return sortComponents;
	}

	getFilterComponents() {
		const filterComponents = [];
		for (const filterSett of this.filterSettings) {
			filterComponents.push(
				<Chip
					key={filterSett.name}
					onClick={() => this.activateFilter(filterSett)}
					label={filterSett.name}
					variant={filterSett.active ? 'outlined' : ''}
				/>
			);
		}
		return filterComponents;
	}
}
