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

import React, { SFC, ValidationMap } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { IMenu } from '../models';
import { renderMenu } from '../utils';

export interface TopBarProps {
  menu: IMenu[];
  sidebarCollapsed: boolean;
  sidebarToggle: () => any;
  onMenuClick: (param: ClickParam) => any;
}

const TopBar: SFC<TopBarProps> = props => (
  <Layout.Header className="pc-top-bar">
    <Icon
      className="pc-drawer-button"
      type={props.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={props.sidebarToggle}
    />
    <Menu
      className="pc-top-bar-menu"
      theme="dark"
      mode="horizontal"
      onClick={props.onMenuClick}
    >
      {props.menu.map(renderMenu)}
    </Menu>
  </Layout.Header>
);

export default TopBar;
