import React, { useEffect, useState, useRef } from "react";
import { Card, Space, Button, Select } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import InputRow from "../InputRow/InputRow";
const { Title } = Typography;

const Ending =({componentId, dropdownComponents, onDropdownChangeCallback, onComponentChange, onDropdownChange}) => {
  const rowData = useRef({});
  // Users should be unable to add rows to ending tab
  // const handleAddDropdown = () => {
  //   const dropdownRow = {
  //     Row_Id: 123,
  //     Page: 'ending',
  //     Group: 'world',
  //     Main_Dropdown: JSON.stringify(constraints),
  //     Arguments: ''
  //   };
  //   const newComponent = {
  //     id: componentId,
  //     page: dropdownRow.Page,
  //     group: dropdownRow.Group,
  //     component: (
  //       <InputRow
  //         key ={componentId}
  //         input_row_key={componentId}
  //         id={componentId}
  //         page="ending"
  //         onRemove={handleRemoveDropdown}
  //         args = ''
  //         mainDropdown = {JSON.stringify(constraints)}
  //       />
  //     ),
  //   };
  //   onDropdownChange((prevComponents) => [
  //     ...prevComponents,
  //     newComponent,
  //   ]);
  //   onComponentChange((prevId) => prevId + 1);
  // };

  
  const handleRemoveDropdown = (id) => {
    // Users should be unable to remove dropdowns
    // onDropdownChange((prevComponents) =>
    //   prevComponents.filter((comp) => comp.id !== id)
    // );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        {/* <Button onClick={handleAddDropdown}>Add Data</Button> */}
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="ending" && obj.group==="world").map((obj) => obj.component)}
        <Title level={3}>Ted</Title>
        {dropdownComponents.filter((obj) => obj.page==="ending" && obj.group==="ted").map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Ending;