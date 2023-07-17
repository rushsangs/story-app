import React, { useState, useRef } from "react";
import { Space, Select, Popover } from "antd";
import { SettingFilled, CloseCircleTwoTone } from "@ant-design/icons";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import { GlobalSingletonObject } from "../../utils/dataContext";
import { sampleDdArgs, shape_into_dropdownrequestitem } from "../../Data/dropdowns";
import { array_replace } from "../../utils/array_replace";

const GlobalSingletonInstance = new GlobalSingletonObject();

const InputRow = (props) => {
  const { id, input_row_key, page, group, onRemove, mainDropdown, args, onChange } = props;
  const key = input_row_key
  const md = (mainDropdown === undefined)?constraints:JSON.parse(mainDropdown);
  const a = (args === undefined || args !== '')?args:'[]';
  const [nextActionsDropdowns, setNextActionsDropdowns] = useState(JSON.parse(a));
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const selectedActionsValues = useRef([]);
  const handleChange = async(value) => {
    if(selectedActionsValues.current.length>=1)
      selectedActionsValues.current = array_replace(selectedActionsValues.current, 0, value);
    else
      selectedActionsValues.current.push(value);
    onChange(id, selectedActionsValues.current);
    GlobalSingletonInstance.set("showRegenerateMsg", true);
    var requestDDitem = shape_into_dropdownrequestitem(selectedActionsValues, page, group);
    var argsResponse = await getNextDropdownData(requestDDitem);
    setNextActionsDropdowns([argsResponse]);
  };

  const handleRemove = (id) => {
    selectedActionsValues.current = [];
    onRemove(id);
  };
  const handleNextDropdownChange = async(value, index) => {
    if(selectedActionsValues.current.length-1>=index)
      selectedActionsValues.current = array_replace(selectedActionsValues.current, index+1, value);
    else
      selectedActionsValues.current.push(value);
    var requestDDitem = shape_into_dropdownrequestitem(selectedActionsValues, page, group);
    var argsResponse = await getNextDropdownData(requestDDitem);
    onChange(id, selectedActionsValues.current);
  };
  
  const onSearch = (value) => {
    console.log("search:", value);
  };
  
  return (
    <Space direction="horizontal" key={key} id={id}>
      <Select
        showSearch
        placeholder={md[0].tooltip}
        optionFilterProp="children"
        onChange={handleChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={md}
        optionLabelProp="Text"
      />
      {nextActionsDropdowns.map((item, index) => {
        return <Select
          showSearch
          placeholder={item[0].tooltip}
          optionFilterProp="children"
          onChange={async(value) => await handleNextDropdownChange(value, index)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          } 
          options={item}
          optionLabelProp="Text"
          key={String(index)}
        />;
        })}
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
