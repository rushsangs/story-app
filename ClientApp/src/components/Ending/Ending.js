import React, { useEffect, useState } from "react";
import { Card, Space, Button, Select } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraintsData from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import InputRow from "../InputRow/InputRow";


const Ending =({componentId, dropdownComponents, onComponentChange, onDropdownChange}) => {
  const handleAddDropdown = () => {
    const newComponent = {
      id: componentId,
      component: (
        <InputRow
          key={componentId}
          id={componentId}
          onRemove={handleRemoveDropdown}
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
        {dropdownComponents.map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Ending;