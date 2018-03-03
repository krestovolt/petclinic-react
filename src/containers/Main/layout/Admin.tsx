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

import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Layout } from 'antd';
import TopBar from '../components/TopBar';
import { ILayoutProps } from './props';

const { Sider, Content } = Layout;

class Admin extends Component<ILayoutProps> {
  public componentDidMount() {
    this.props.uiStore.setTitle('Admin');
  }

  public render(): ReactNode {
    const { uiStore, session, onMenuClick } = this.props;
    return (
      <>
        <Sider trigger={null} collapsible className="pc-sider" >
          <div className="logo" />
        </Sider>
        <Layout>
          <TopBar
            menu={uiStore.topbar}
            sidebarCollapsed={uiStore.sidebarCollapsed}
            session={session}
            sidebarToggle={uiStore.sidebarToggle.bind(uiStore)}
            onMenuClick={onMenuClick}
          />
          <Content />
        </Layout>
      </>
    );
  }
}

export { Admin };
export default observer(Admin);
