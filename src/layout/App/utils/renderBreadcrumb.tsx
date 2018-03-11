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
import { Icon, Breadcrumb } from 'antd';
import { IBreadcrumb } from '../stores';

const renderBreadcrumb = (item: IBreadcrumb): ReactNode => {
  let title: ReactNode = item.label;

  if (typeof item.label === 'string' || typeof item.label === 'number') {
    if (item.icon) {
      if (typeof item.icon === 'string') {
        title = (
          <span className="pc-breadcrumb-item-title">
            <Icon type={item.icon} />
            <span className="pc-breadcrumb-text">{item.label}</span>
          </span>
        );
      } else {
        title = (
          <span className="pc-breadcrumb-item-title">
            {item.icon}
            <span className="pc-breadcrumb-text">{item.label}</span>
          </span>
        );
      }
    }
  }

  const link = <Link to={item.to}>{title}</Link>;
  return (
    <Breadcrumb.Item className="pc-breadcrumb-item" key={`bread-${item.id}`}>
      {item.to === '' ? title : link}
    </Breadcrumb.Item>
  );
};

export default renderBreadcrumb;
