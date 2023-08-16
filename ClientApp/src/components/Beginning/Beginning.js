import React, { useEffect, useState, useRef } from "react";
import { Card, Space, Button, Select } from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import InputRow from "../InputRow/InputRow";
const { Title } = Typography;

const Beginning = ({componentId, dropdownComponents, onDropdownChangeCallback, onComponentChange, onDropdownChange, taskNumber}) => {
  const rowData = useRef({});
 
  const handleRemoveDropdown = (id) => {
    // should be unable to remove dropdowns in beginning tab
    // onDropdownChange((prevComponents) =>
    //   prevComponents.filter((comp) => comp.id !== id)
    // );
  };

  let teddysbeliefdropdowns = dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="Teddy").map((obj) => obj.component);
  let poppysbeliefdropdowns = dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="Poppy").map((obj) => obj.component);
  let poppysbeliefs = <div><Title level={3}>Poppy's Beliefs</Title>{poppysbeliefdropdowns}</div>;
  let teddysbeliefs = <div><Title level={3}>Teddy's Beliefs</Title>{teddysbeliefdropdowns}</div>;
  

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Title level={3}>World</Title>
        {dropdownComponents.filter((obj) => obj.page==="beginning" && obj.group==="world").map((obj) => obj.component)}
        {(teddysbeliefdropdowns.length>0)?teddysbeliefs:''}
        {(poppysbeliefdropdowns.length>0)?poppysbeliefs:''}
      </Space>
    </>
  );
};  
export default Beginning;
