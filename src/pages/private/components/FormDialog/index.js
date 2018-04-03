import './index.scss';
import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Balloon,
  DatePicker,
  TimePicker,
  NumberPicker,
  Field,
  Switch,
  Grid,
} from "@icedesign/base";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

const FormItem = Form.Item;

const data2CompConfig = (config) => {
  let compConfig = []
  for (let i = 0; i < config.length; i++) {
    let item = config[i]
    if (!!item.form_show) {
      let compItem = {
        controlType: item['form_type'],
        label: item.title || item.name,
        name: item.name,
        disabled: !!item.form_disabled,
        data: item.form_data || [{ text: '空', value: '' }],   // 下拉框，按钮组的选项
        rules: [{ required: !!item.required, message: '不能为空' }]
      }
      compConfig.push(compItem)
    }
  }
  return compConfig
}

export default class FormGenerator extends Component {
  field = new Field(this);

  componentDidMount = () => {
    this.field.setValues(this.props.data)
  }


  onSubmit(callback) {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log("Errors in form!!!");
        return;
      }
      callback && callback(values)
    });
  }

  renderFormItem = (item, index) => {
    const { init } = this.field
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 }
    };

    let formItemComp = <Input {...item} htmlType="text" {...init(item.name, { rules: item.rules })} />

    switch (item.controlType) {
      case 'input':         // 文本框
        formItemComp = <Input {...item} htmlType="text" {...init(item.name, {
          rules: item.rules
        })} />
        break
      case 'textarea':         // 文本框
        formItemComp = <Input {...item} htmlType="text" multiple  {...init(item.name)} />
        break
      case 'date':          // 日期组件
        formItemComp = <DatePicker {...item}  {...init(item.name)} />
        break
      case 'datetime':      // 时间组件
        formItemComp = <DatePicker {...item} showTime {...init(item.name)} />
        break
      case 'select':        // 下拉框
        formItemComp = (
          <Select {...item}  {...init(item.name)}>
            {item.data && item.data.map((subItem, subIndex) => {
              return (<Option key={subIndex} value={subItem.value}>{subItem.text}</Option>)
            })}
          </Select>
        )
        break
      case 'switch':        // 开关组件
        formItemComp = <Switch {...item} {...init(item.name, { valueName: "checked", initValue: false })} />
        break
      case 'checkbox':      // 复选框
        formItemComp = item.data && item.data.map((subItem, subIndex) => {
          return <Checkbox {...item} key={subIndex}  {...init(`${item.name}_${subIndex}`)}>{subItem.text} </Checkbox>
        })
        break
    }

    let cls = ''
    if (item.controlType === 'checkbox') {
      cls = 'next-form-text-align'
    }

    return (
      <FormItem className={cls} key={`${item.name}_${index}`} label={`${item.label}：`} {...formItemLayout} size={'medium'}>
        {formItemComp}
      </FormItem>
    )
  }

  renderForm = () => {
    const { config = [] } = this.props
    let compConfig = data2CompConfig(config)
    let comps = []
    for (let i = 0; i < compConfig.length; i = i + 2) {
      comps.push(<Row key={i}>
        <Col span={12}>{this.renderFormItem(compConfig[i], i)}</Col>
        <Col span={12}>{compConfig[i + 1] ? this.renderFormItem(compConfig[i + 1], i + 1) : ''}</Col>
      </Row>)
    }
    return comps
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 }
    };
    return (
      <Form field={this.field}>
        {this.renderForm()}
      </Form>
    )
  }
}
