import React, { useState, useRef } from "react";
import { Form, Input } from "antd";

export default function EditCell({ form, dataIndex, record, children }: any) {
  const [editing, setEditing] = useState(false);
  const node = useRef(null);

  const { title } = record;

  const save = () => {};
  const toggleEdit = () => {setEditing(!editing)};
  return editing ? (
    <Form.Item style={{ margin: 0 }}>
      {form.getFieldDecorator(dataIndex, {
        rules: [
          {
            required: true,
            message: `${title} is required.`
          }
        ],
        initialValue: record[dataIndex]
      })(<Input ref={node} onPressEnter={save} onBlur={save} />)}
    </Form.Item>
  ) : (
    <div
      className="editable-cell-value-wrap"
      style={{ paddingRight: 24 }}
      onClick={toggleEdit}
    >
      {children}
    </div>
  );
}
