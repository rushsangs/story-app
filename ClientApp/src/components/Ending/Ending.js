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

  const handleAddDropdown = async(group) => {
    let requestDdItem = {
      Page: 'ending',
      Group: group,
      Main_DropDown: '',
      Arguments: ''
    };
    let main_dropdown = await getNextDropdownData(requestDdItem);
    const dropdownRow = {
      Row_Id: 123,
      Page: 'ending',
      Group: group,
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
          enableSettings={true}
          input_row_key={componentId}
          page={dropdownRow.Page}
          group= {dropdownRow.Group}
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
    onDropdownChange((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Space>
          <Button onClick={()=>handleAddDropdown('world')}>Add World Goal</Button>
          <Button onClick={()=>handleAddDropdown('Teddy')}>Add Teddy's Belief Goal</Button>
        </Space>
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="ending" && obj.group==="world").map((obj) => obj.component)}
        <Title level={3}>Teddy's Beliefs</Title>
        {dropdownComponents.filter((obj) => obj.page==="ending" && obj.group==="Teddy").map((obj) => obj.component)}
      </Space>
    </>
  );
};  
export default Ending;