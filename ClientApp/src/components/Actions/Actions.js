import React, { useState } from "react";
import { Space, Button } from "antd";
import InputRow from "../InputRow/InputRow";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const Actions = ({componentId, dropdownComponents, onComponentChange, onDropdownChange}) => {
  const handleAddDropdown = () => {
    const newComponent = {
      id: componentId,
      page: "actions",
      component: (
        <InputRow
          id={componentId}  
          key={componentId}
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
        {dropdownComponents.filter((obj) => obj.page==="actions").map((obj) => obj.component)}
      </Space>
    </>
  );
};
export default Actions;
