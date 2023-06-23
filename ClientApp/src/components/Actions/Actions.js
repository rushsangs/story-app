import React, { useEffect, useState } from "react";
import { Card, Space, Button, Select, Popover } from "antd";
import { SettingFilled, CloseCircleTwoTone, CloseCircleFilled } from "@ant-design/icons";
import { List, Typography } from "antd";
import constraintsData from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const Actions = () => {
  const [noOfRows, setNoOfRows] = useState(0);
  const [nextActionsDropdowns, setNextActionsDropdowns] = useState([]);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const onChange = (value) => {
    setNextActionsDropdowns(getNextDropdownData("actions"));
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: '0 15px'}}>
        <Button onClick={() => setNoOfRows(noOfRows + 1)}>Add Data</Button>

        {Array.apply(null, Array(noOfRows)).map((item, i) => {
          return (
            <Space direction="horizontal">
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={constraintsData}
              />
              {nextActionsDropdowns.map((item, index) => (
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={item.value}
                  key={index}
                />
              ))}
              <Popover
                content={<ul style={{listStyleType:'none'}}>
                  <li>Persist</li>
                  <li>Substitute</li>
                  <li>Drop</li>
                </ul>}
                // title="Title"
                trigger="click"
                placement="bottom"
                open={showSettingsDropdown}
                onOpenChange={(dropdownState) => { setShowSettingsDropdown(dropdownState) }}
              >
                <div onClick={() => { setShowSettingsDropdown(true)}} style={{ cursor: 'pointer'}}><SettingFilled style={{ fontSize: '16px', color: '#6E6E6E'}}/></div>
              </Popover>
              <CloseCircleTwoTone  style={{ fontSize: '16px', cursor: 'pointer'}} twoToneColor='#E0190D' />
            </Space>
          );
        })}
      </Space>
    </>
  );
};
export default Actions;
