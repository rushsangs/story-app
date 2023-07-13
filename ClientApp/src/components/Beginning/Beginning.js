import React, { useEffect, useState } from "react";
import { Card, Space, Button, Select } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import InputRow from "../InputRow/InputRow";
const { Title } = Typography;

const Beginning = ({componentId, dropdownComponents, onComponentChange, onDropdownChange}) => {
  const handleAddDropdown = () => {
    const newComponent = {
      id: componentId,
      page: "beginning",
      group: "world",
      component: (
        <InputRow
          key ={componentId}
          input_row_key={componentId}
          id={componentId}
          page="beginning"
          onRemove={handleRemoveDropdown}
          args = {''}
          mainDropdown = {JSON.stringify(constraints)}
        />
      ),
    };
    onDropdownChange((prevComponents) => [
      ...prevComponents,
      newComponent,
    ]);
    onComponentChange((prevId) => prevId + 1);
  };

  const handleRemoveDropdown = (id) => {
    onDropdownChange((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Button onClick={handleAddDropdown}>Add Data</Button>
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="world").map((obj) => obj.component)}
        <Title level={3}>Ted</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="ted").map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Beginning;
