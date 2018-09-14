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

import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
import { IMenu } from '../stores';

const renderMenu = (item: IMenu): ReactNode => {
	let title: ReactNode = item.label;
	if (typeof item.label === 'string' || typeof item.label === 'number') {
		if (item.icon) {
			if (typeof item.icon === 'string') {
				title = (
					<span>
						<Icon type={item.icon} />
						<span className="pc-menu-text">{item.label}</span>
					</span>
				);
			} else {
				title = (
					<span>
						{item.icon}
						<span className="pc-menu-text">{item.label}</span>
					</span>
				);
			}
		}
	}

	if (item.children && item.children.length > 0) {
		if (item.group) {
			return (
				<Menu.ItemGroup className={['pc-menu-group', item.className].join(' ')} key={item.id} title={title}>
					{item.children.map(renderMenu)}
				</Menu.ItemGroup>
			);
		}
		return (
			<Menu.SubMenu className={['pc-menu-sub', item.className].join(' ')} key={item.id} title={title}>
				{item.children.map(renderMenu)}
			</Menu.SubMenu>
		);
	}
	const link = <Link to={item.to}>{title}</Link>;
	return (
		<Menu.Item className={['pc-menu-item', item.className].join(' ')} key={item.id}>
			{item.to === '' ? title : link}
		</Menu.Item>
	);
};

export default renderMenu;
