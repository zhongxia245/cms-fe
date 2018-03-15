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
  Grid
} from "@icedesign/base";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

const FormItem = Form.Item;

const formConfig = [
  { controlType: 'input', label: '帐号', name: 'username', htmlType: 'password', placeholder: '请输入帐号', required: true },
  { controlType: 'input', label: '密码', name: 'password', htmlType: 'text', placeholder: '请输入密码' },
  { controlType: 'date', label: '日期', name: 'date', placeholder: '请选择时间' },
  { controlType: 'datetime', label: '开始时间', name: 'datetime', placeholder: '请输入时间' },
  { controlType: 'select', label: '类别', name: 'select', placeholder: '请输入类别', data: [{ text: '测试1', value: 'test' }, { text: '测试2', value: 'test2' }, { text: '测试3', value: 'test3' }] },
  { controlType: 'switch', label: '禁用', name: 'disabled', placeholder: '是否禁用' },
  { controlType: 'checkbox', label: '标签', name: 'tags', placeholder: '标签', data: [{ text: '测试1', value: 'test' }, { text: '测试2', value: 'test2' }, { text: '测试3', value: 'test3' }] },
  { controlType: 'textarea', label: '标签', name: 'tags', placeholder: '标签', data: [{ text: '测试1', value: 'test' }, { text: '测试2', value: 'test2' }, { text: '测试3', value: 'test3' }] },
]

const CONTROL_TYPE = {
  1: 'input',
  2: 'textarea',
  3: 'date',
  4: 'datetime',
  5: 'select',
  6: 'switch',
  7: 'checkbox',
}

const data2CompConfig = (config) => {
  let compConfig = []
  for (let i = 0; i < config.length; i++) {
    let item = config[i]
    if (!!item.form_show) {
      let compItem = {
        controlType: CONTROL_TYPE[item['form_type']],
        label: item.title || item.name,
        name: item.name,
        disabled: !!item.form_disabled,
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
    console.log(item)
    const { init } = this.field
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 }
    };

    let formItemComp = '无内容'

    switch (item.controlType) {
      case 'input':         // 文本框
        formItemComp = <Input {...item} htmlType="text" {...init(item.name, {
          rules: item.rules
        })} />
        break
      case 'textarea':         // 文本框
        formItemComp = <Input {...item} htmlType="text" multiple   {...init(item.name)} />
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
              return (<Option key={subIndex} value={subItem.text}>{subItem.value}</Option>)
            })}
          </Select>
        )
        break
      case 'switch':        // 开关组件
        formItemComp = <Switch {...item}  {...init(item.name, { valueName: "checked", initValue: true })} />
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
    return compConfig.map((item, index) => {
      return this.renderFormItem(item, index)
    })
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




// export default class componentName extends Component {
//   onSubmit = () => {
//     this.refs.refForm.onSubmit((data) => {
//       console.log(data)
//     })
//   }
//   render() {
//     return (
//       <div>
//         <FormGenerator ref='refForm' config={formConfig} />
//         <Button onClick={this.onSubmit}>提交</Button>
//       </div>
//     )
//   }
// }

