/**
 *    Copyright 2018 Panjie Setiawan Wicaksono
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { ReactNode } from 'react';
import { action, observable } from 'mobx';
import { ICommonStore, ICommonStoreAction } from '@/types';
import { setter, toggle } from '@/utils/decorators';
// import { IBreadcrumb, IMenu } from './models';

/**
 * Breadcrumb type.
 *
 * @author Panjie SW <panjie@panjiesw.com>
 * @export
 * @interface IBreadcrumb
 */
export interface IBreadcrumb {
	/**
	 * CSS class name for this breadcrumb item
	 */
	className?: string;
	/**
	 * The icon to display alongside the label
	 *
	 */
	icon?: string;
	id: string;
	/**
	 * The label of this breadcrumb item. It can be a react component/element
	 *
	 */
	label: ReactNode;
	/**
	 * The location to navigate when this item is clicked.
	 * Pass an empty string to render it as un-navigable item.
	 */
	to: string | Location;
}

export interface IMenu {
	children?: IMenu[];
	className?: string;
	exact?: boolean;
	group?: boolean;
	icon?: string;
	id: string;
	label: ReactNode;
	to: string | Location;
}

export interface IAppStore extends ICommonStore {
	readonly breadcrumb: IBreadcrumb[];
	readonly sidebar: IMenu[];
	readonly topbar: IMenu[];
	readonly sidebarCollapsed: boolean;
	readonly title: string;
	breadcrumbPop(): void;
	breadcrumbAdd(item: IBreadcrumb): void;
	setRootBreadcrumb(item: IBreadcrumb): void;
	setTitle(title?: string): void;
	subdomain(): string;
}

class AppStore implements IAppStore {
	@setter('loadingStart', true)
	@setter('loadingStop', false)
	@observable
	public loading: boolean = false;

	@setter
	@observable
	public breadcrumb: IBreadcrumb[] = [];

	@setter
	@observable
	public sidebar: IMenu[] = [];

	@setter
	@observable
	public topbar: IMenu[] = [];

	@toggle('sidebarToggle')
	@setter('sidebarOpen', false)
	@setter('sidebarCollapse', true)
	@observable
	public sidebarCollapsed: boolean = false;

	@observable
	public title: string = '';

	@action
	public breadcrumbPop = () => {
		this.breadcrumb.pop();
	};

	@action
	public breadcrumbAdd = (item: IBreadcrumb) => {
		this.breadcrumb.push(item);
	};

	@action
	public setRootBreadcrumb = (item: IBreadcrumb) => {
		this.breadcrumb[0] = item;
	};

	@action
	public setTitle = (title: string = '') => {
		this.title = title;
	};

	public subdomain(): string {
		const parts = window.location.host.split('.');
		return parts.length === 3 ? parts[0] : '';
	}
}

interface AppStore extends IAppStore, ICommonStoreAction {
	setBreadcrumb(breadcrumbs: IBreadcrumb[]): void;
	setSidebar(sidebar: IMenu[]): void;
	setTopbar(topbar: IMenu[]): void;
	sidebarToggle(): void;
	sidebarOpen(): void;
	sidebarCollapse(): void;
}

export default AppStore;
