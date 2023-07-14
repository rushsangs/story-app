import React, { useState, useRef } from "react";
import { Space, Select, Popover } from "antd";
import { SettingFilled, CloseCircleTwoTone } from "@ant-design/icons";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import { GlobalSingletonObject } from "../../utils/dataContext";
import { sampleDdArgs } from "../../Data/dropdowns";
import { array_replace } from "../../utils/array_replace";

const GlobalSingletonInstance = new GlobalSingletonObject();

const InputRow = (props) => {
  const { id, input_row_key, onRemove, mainDropdown, args, onChange } = props;
  const key = input_row_key
  const md = (mainDropdown === undefined)?constraints:JSON.parse(mainDropdown);
  const a = (args === undefined || args !== '')?args:'[]';
  const [nextActionsDropdowns, setNextActionsDropdowns] = useState(JSON.parse(a));
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const selectedActionsValues = useRef([]);
  const handleChange = (value) => {
    if(selectedActionsValues.current.length>=1)
      selectedActionsValues.current = array_replace(selectedActionsValues.current, 0, value);
    else
      selectedActionsValues.current.push(value);
    
    console.log("should i push this?");
    console.log(selectedActionsValues);
    // console.log(selectedActionsValues.current[0]);
    onChange(id, selectedActionsValues.current);
    GlobalSingletonInstance.set("showRegenerateMsg", true);
    setNextActionsDropdowns(sampleDdArgs);
  };

  const handleRemove = (id) => {
    selectedActionsValues.current = [];
    // console.log('removed');
    // console.log(selectedActionsValues);
    onRemove(id);
  };
  const handleNextDropdownChange = (value, index) => {
    // selectedActionsValues.current.push(value);
    if(selectedActionsValues.current.length-1>=index)
      selectedActionsValues.current = array_replace(selectedActionsValues.current, index+1, value);
    else
      selectedActionsValues.current.push(value);
    console.log("should i push this?");
    // console.log(selectedActionsValues.current[index]);
    console.log(selectedActionsValues);
    onChange(id, selectedActionsValues.current);
  };
  
  const onSearch = (value) => {
    console.log("search:", value);
  };
  
  return (
    <Space direction="horizontal" key={key} id={id}>
      <Select
        showSearch
        placeholder={md[0].label}
        optionFilterProp="children"
        onChange={handleChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={md}
      />
      {nextActionsDropdowns.map((item, index) => (
        <Select
          showSearch
          placeholder={item[0].tooltip}
          optionFilterProp="children"
          onChange={(value) => handleNextDropdownChange(value, index)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          } 
          options={item}
          key={String(index)}
        />
      ))}
      <Popover
        content={
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <li>Persist</li>
            <li>Substitute</li>
            <li>Drop</li>
          </ul>
        }
        // title="Title"
        trigger="click"
        placement="bottom"
        open={showSettingsDropdown}
        onOpenChange={(dropdownState) => {
          setShowSettingsDropdown(dropdownState);
        }}
      >
        <div
          onClick={() => {
            setShowSettingsDropdown(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <SettingFilled style={{ fontSize: "16px", color: "#6E6E6E" }} />
        </div>
      </Popover>
      <div onClick={() => handleRemove(id)} style={{ cursor: "pointer" }}>
        <CloseCircleTwoTone
          style={{ fontSize: "16px", cursor: "pointer" }}
          twoToneColor="#E0190D"
        />
      </div>
    </Space>
  );
};
export default InputRow;
