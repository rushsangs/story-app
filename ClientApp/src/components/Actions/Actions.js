import React, { useState } from "react";
import { Space, Button } from "antd";
import InputRow from "../InputRow/InputRow";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const Actions = () => {
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);

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
    setDropdownComponents((prevComponents) => [
      ...prevComponents,
      newComponent,
    ]);
    setComponentId((prevId) => prevId + 1);
  };

  const handleRemoveDropdown = (id) => {
    setDropdownComponents((prevComponents) =>
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
export default Actions;
