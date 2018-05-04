## XtTable使用说明



### 1.1 如何自定义表单组件

- XtTable 会往 children 节点，注入 onHide【隐藏弹窗】 , data【当前编辑的数据、添加则为空 】
- 点击提交按钮的时候，会调用children的 onSubmit 方法

```javascript
import React, { Component } from 'react';

class ColumnForm extends Component {
  onSubmit=()=>{
    this.props.onHide()
  }
  render() {
    return (
      <div>
        {this.props.data}
      </div>
    );
  }
}

export default ColumnForm;
```

```javascript
<XtTable {...api} name={TABLE_NAME} columns={COLUMNS_CONFIG} filter={FILTER}>
  <ColumnForm />
</XtTable>

import React, { Component } from 'react';

```
