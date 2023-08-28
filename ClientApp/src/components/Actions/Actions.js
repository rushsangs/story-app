import React, { useState, useRef } from "react";
import { Space, Button } from "antd";
import InputRow from "../InputRow/InputRow";
import { GlobalSingletonObject } from "../../utils/dataContext";
import { getConstraintsData, getNextDropdownData } from "../../Data/apis";
import constraints from "../../Data/constraints";

const GlobalSingletonInstance = new GlobalSingletonObject();

const Actions = ({componentId, dropdownComponents, onDropdownChangeCallback, onComponentChange, onDropdownChange, groupNumber}) => {
  const rowData = useRef({});
  const handleAddDropdown = async() => {
    let requestDdItem = {
      Page: 'actions',
      Group: '',
      Main_DropDown: '',
      Aguments: ''
    };
    let main_dropdown = await getNextDropdownData(requestDdItem);
    const dropdownRow = {
      Row_Id: 123,
      Page: 'actions',
      Group: '',
      Main_Dropdown: JSON.stringify(main_dropdown),
      Arguments: ''
    }
    const newComponent = {
      id: componentId,
      page: dropdownRow.Page,
      group: dropdownRow.Group,
      component: (
        <InputRow
          key ={componentId}
          id={componentId}  
          removable={true}
          enableSettings={(groupNumber==3)?true:false}
          input_row_key={componentId}
          page={dropdownRow.Page}
          group= {dropdownRow.Group}
          groupNumber={groupNumber}
          onRemove={(id)=> {
            console.log("id is", id);
            handleRemoveDropdown(id);
            onDropdownChangeCallback('', '', '', componentId);
            delete rowData.current[id];
            console.log(">>>> inside actions rowData", rowData.current);
          }}
          args = {dropdownRow.Arguments}
          mainDropdown = {dropdownRow.Main_Dropdown}
          onChange= {(id, data) => {
            rowData.current = {
              ...rowData.current,
              [id]: data,
            };
            onDropdownChangeCallback(dropdownRow.Page, dropdownRow.Group, data, componentId);
            console.log(">>>> inside actions rowData", rowData.current);
          }}
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
    console.log("components are");
    console.log(dropdownComponents);
    onDropdownChange((prevComponents) => {
      let x = prevComponents.filter((comp) => comp.id !== id);
      return x;
    });
  };

  return (
    <div style={{width: "99.5%", overflow: "scroll", paddingBottom: "50px"}}>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Button onClick={handleAddDropdown}>Add Action Constraint</Button>
        {dropdownComponents.filter((obj) => obj.page==="actions").map((obj) => obj.component)}
      </Space>
    </div>
  );
};
export default Actions;
