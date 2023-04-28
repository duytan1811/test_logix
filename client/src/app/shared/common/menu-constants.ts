import { IconConstants } from "./icon-constants";

export class MenuConstants {
	public static readonly Items = [
		{
			key: 'dashboard',
			href: '/',
			icon: IconConstants.DASHBOARD,
		},
		{
			key: 'product_manager',
			href: '/product-manager',
			icon: IconConstants.PRODUCT_MANAGER,
			items: [
				{
					key: 'category',
					href: '/categories'
				},
				{
					key: 'product',
					href: '/products'
				}
			]
		},
		{
			key: 'setting',
			href: '/setting',
			icon: IconConstants.SETTING,
			items: [
				{
					key: 'role',
					href: '/roles'
				},
				{
					key: 'product',
					href: '/products'
				}
			]
		}
	]
}