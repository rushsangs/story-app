import React, { useEffect, useState, useRef } from "react";
import { Card, Space, Button, Select } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import InputRow from "../InputRow/InputRow";
const { Title } = Typography;

const Beginning = ({componentId, dropdownComponents, onDropdownChangeCallback, onComponentChange, onDropdownChange}) => {
  const rowData = useRef({});
  //TODO: Users should be unable to add rows to beginning tab 
  // const handleAddDropdown = () => {
  //   const dropdownRow = {
  //     Row_Id: 123,
  //     Page: 'beginning',
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
  //         page={dropdownRow.Page}
  //         onRemove={(id)=> {
  //           // console.log("id is", id);
  //           handleRemoveDropdown(id);
  //           delete rowData.current[id];
  //           console.log(">>>> inside beginning rowData", rowData.current);
  //         }}
  //         args = {dropdownRow.Arguments}
  //         mainDropdown = {dropdownRow.Main_Dropdown}
  //         onChange= {(id, data) => {
  //           rowData.current = {
  //             ...rowData.current,
  //             [id]: data,
  //           };
  //           onDropdownChangeCallback(dropdownRow.Page, dropdownRow.Group, rowData.current, componentId);
  //           console.log(">>>> inside actions rowData", rowData.current);
  //         }}
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
    // should be unable to remove dropdowns in beginning tab
    // onDropdownChange((prevComponents) =>
    //   prevComponents.filter((comp) => comp.id !== id)
    // );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        {/* <Button onClick={handleAddDropdown}>Add Data</Button> */}
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="world").map((obj) => obj.component)}
        <Title level={3}>Ted</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="ted").map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Beginning;
