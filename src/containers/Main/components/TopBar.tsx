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
import { Link } from 'react-router-dom';
import { toJS } from 'mobx';
import { Layout, Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { ILoginResponse } from '@/api';
import { IMenu } from '../models';
import { renderMenu } from '../utils';
// import UserMenuTitle from './UserMenuTitle';

const { Header } = Layout;
const { Item, SubMenu } = Menu;

export interface TopBarProps {
  menu: IMenu[];
  sidebarCollapsed: boolean;
  session: ILoginResponse;
  sidebarToggle: () => any;
  onMenuClick: (param: ClickParam) => any;
}

const TopBar: SFC<TopBarProps> = props => (
  <Header className="pc-top-bar light">
    <div className="pc-drawer-button">
      <Icon
        type={props.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.sidebarToggle}
      />
    </div>
    <div className="pc-top-bar-menu-container">
      <Menu mode="horizontal" onClick={props.onMenuClick}>
        {toJS(props.menu).map(m => renderMenu(m))}
        {/* <SubMenu
         className="pc-menu-sub pc-user-menu"
          key="header.user"
          title={<UserMenuTitle name="Foo Bar" role="Administrator" />}
        >
          <Item>
            <Link to="/user/profile">Profile</Link>
          </Item>
        </SubMenu> */}
      </Menu>
    </div>
    {/* <Menu
      className="pc-top-bar-menu"
      // theme="dark"
      mode="horizontal"
      onClick={props.onMenuClick}
    >
      <Menu.SubMenu
        className="pc-menu-sub pc-user-menu"
        key="header.user"
        title={<UserMenuTitle name="Foo Bar" role="Administrator" />}
      >
        <Menu.Item className="pc-menu-item" key="header.user.setting.profile">
          <Link to="/user/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item
          className="pc-menu-item"
          key="header.user.setting.cp"
          title="Change Password"
        >
          Change Password
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          className="pc-menu-item"
          key="header.user.logout"
          title="Logout"
        >
          Logout
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        className="pc-menu-item"
        key="header.user.logout2"
        title="Logout"
      >
        Logout
      </Menu.Item>
    </Menu> */}
  </Header>
);

export default TopBar;
