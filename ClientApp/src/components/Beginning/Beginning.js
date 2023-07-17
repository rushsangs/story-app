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
 
  const handleRemoveDropdown = (id) => {
    // should be unable to remove dropdowns in beginning tab
    // onDropdownChange((prevComponents) =>
    //   prevComponents.filter((comp) => comp.id !== id)
    // );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="world").map((obj) => obj.component)}
        <Title level={3}>Ted</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="ted").map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Beginning;
