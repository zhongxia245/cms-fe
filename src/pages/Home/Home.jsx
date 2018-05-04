import './index.scss'
import React, { Component } from 'react'
import FormDialog from '../../pages/private/components/FormDialog'

export default class Home extends Component {
  static displayName = 'Home'

  render() {
    return (
      <div className="home-page">
        <h1>通用后台</h1>
        <p>通过可视化的配置，实现不编写代码即可完成库表的增删改查，提升开发的效率</p>

        <h2>使用步骤</h2>
        <p>1. 在库表配置-》库配置，添加一个数据库</p>
        <p>2. 在库表配置-》表配置，选择一个数据库中存在的表</p>
        <p>
          3. 在库表配置-》字段配置，指定表字段做处理
          <br />目前支持表字段是否显示，表排序，表单弹窗中是否展示，排序，字段类型，是否可编辑，是否为必填等
          <br /> 后续功能继续添加，目前暂时这么多
        </p>

        <h2>已完成功能</h2>
        <p>1. 根据配置生成表,表单页面，完成增删改查功能</p>
        <p>2. 根据可视化配置，生成菜单页面</p>
        <p>3. 封装表单组件，目前支持，文本框，复选框，单选框，开关组件，日期组件，文本框，下拉框等</p>

        <h2>Todo</h2>
        <p>1. 优化创建表的流程，整合在一起, 做成完成所有步骤才创建好表</p>
        <p>2. 增加角色管理，用户权限管理</p>
        <p>3. 支持使用接口创建表的CRUD</p>
        <p>4. 支持自定义SQL语句，来创建表管理(增删改查都需要)</p>
      </div>
    )
  }
}
