export class StatusConstants {
	public static readonly COMMON = {
		IN_ACTIVE: 'in_active',
		ACTIVE: 'active',
	}

	public static readonly COMMON_SEARCH = [
		{ value: '', key: 'ALL' },
		{ value: this.COMMON.IN_ACTIVE, key: 'IN_ACTIVE' },
		{ value: this.COMMON.ACTIVE, key: 'ACTIVE' },
	];

	public static readonly COMMON_FORM = [
		{ value: '', key: 'SELECT_STATUS' },
		{ value: this.COMMON.IN_ACTIVE, key: 'IN_ACTIVE' },
		{ value: this.COMMON.ACTIVE, key: 'ACTIVE' },
	];
}