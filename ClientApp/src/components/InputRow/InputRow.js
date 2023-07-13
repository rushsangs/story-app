import React, { useState, useRef } from "react";
import { Space, Select, Popover } from "antd";
import { SettingFilled, CloseCircleTwoTone } from "@ant-design/icons";
import constraintsData from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const InputRow = (props) => {
  const { id, key, onRemove, onDropdownChangeCallback, onChange } = props;
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [nextActionsDropdowns, setNextActionsDropdowns] = useState([]);

  const selectedActionsValues = useRef([]);

  const handleChange = (value) => {
    selectedActionsValues.current.push(value);
    onChange(id, selectedActionsValues.current);
    GlobalSingletonInstance.set("showRegenerateMsg", true);
    setNextActionsDropdowns(getNextDropdownData("actions"));
  };

  const handleNextDropdownChange = (value, index) => {
    selectedActionsValues.current.push(value);
    onChange(id, selectedActionsValues.current);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <Space direction="horizontal" key={key} id={id}>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={handleChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={constraintsData}
      />
      {nextActionsDropdowns.map((item, index) => (
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(value) => handleNextDropdownChange(value, index)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={item.value}
          key={index}
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
      <div onClick={() => onRemove(id)} style={{ cursor: "pointer" }}>
        <CloseCircleTwoTone
          style={{ fontSize: "16px", cursor: "pointer" }}
          twoToneColor="#E0190D"
        />
      </div>
    </Space>
  );
};
export default InputRow;
