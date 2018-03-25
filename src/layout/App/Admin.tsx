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
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import TopBar from './components/TopBar';
import App from './App';

const { Sider, Content } = Layout;

class Admin extends App {
  public componentDidMount() {
    // this.props.app.setTitle('Admin');
  }

  public render(): ReactNode {
    const { session, onMenuClick } = this.props;
    return (
      <Layout className="pc-main">
        <Sider trigger={null} collapsible className="pc-sider">
          <div className="logo" />
        </Sider>
        <Layout>
          <TopBar
            menu={this.app.topbar}
            sidebarCollapsed={this.app.sidebarCollapsed}
            session={session.current}
            sidebarToggle={this.app.sidebarToggle.bind(this.app)}
            onMenuClick={onMenuClick}
          />
          <Content />
        </Layout>
      </Layout>
    );
  }
}

export { Admin };
export default hot(module)(inject('session')(observer(Admin)));
// export default inject('session')(observer(Admin));
