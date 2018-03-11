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
import { observer } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { ISession } from '@/types';
import { IMenu } from '../stores';
import { renderMenu } from '../utils';

const { Header } = Layout;

export interface TopBarProps {
  menu: IMenu[];
  sidebarCollapsed: boolean;
  session: ISession;
  sidebarToggle: () => any;
  onMenuClick: (param: ClickParam) => any;
}

export const TopBar: SFC<TopBarProps> = props => (
  <Header className="pc-top-bar light">
    <div className="pc-drawer-button">
      <Icon
        type={props.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.sidebarToggle}
      />
    </div>
    <div className="pc-top-bar-menu-container">
      <Menu mode="horizontal" onClick={props.onMenuClick}>
        {props.menu.map(m => renderMenu(m))}
      </Menu>
    </div>
  </Header>
);

export default observer(TopBar);
