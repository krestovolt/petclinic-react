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

import React, { SFC } from 'react';
import { Icon, Row, Col } from 'antd';

export interface UserMenuTitleProps {
	name: string;
	role: string;
}

const UserMenuTitle: SFC<UserMenuTitleProps> = ({ name, role }) => (
	<Row type="flex">
		<Col span={24} className="pc-user-menu-title">
			<Row>
				<Icon type="user" />
				{name}
			</Row>
			<Row>{role}</Row>
		</Col>
	</Row>
);

export default UserMenuTitle;
