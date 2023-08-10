import React, { useState, useRef } from "react";
import { Space, Select, Popover, Menu } from "antd";
import { SettingFilled, CloseCircleTwoTone } from "@ant-design/icons";
import constraints from "../../Data/constraints";
import { getNextDropdownData } from "../../Data/apis";
import { GlobalSingletonObject } from "../../utils/dataContext";
import { IntentDropdowns, sampleDdArgs, shape_into_dropdownrequestitem } from "../../Data/dropdowns";
import { array_replace } from "../../utils/array_replace";

const GlobalSingletonInstance = new GlobalSingletonObject();

const InputRow = (props) => {
  const { id, input_row_key, page,removable, enableSettings, group, onRemove, mainDropdown, args, onChange } = props;
  const key = input_row_key
  const md = (mainDropdown === undefined)?constraints:JSON.parse(mainDropdown);
  const a = (args === undefined || args !== '')?args:'[]';
  const [nextActionsDropdowns, setNextActionsDropdowns] = useState(JSON.parse(a));
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const selectedActionsValues = useRef(nextActionsDropdowns.length>0 && nextActionsDropdowns[0].length>0?
                                  [md[0].value, nextActionsDropdowns[0][0].value]:
                                  [md[0].value]);
  
  const handleChange = async(value) => {
    console.log("handleChange", value);
    if(selectedActionsValues.current.length>=1)
      selectedActionsValues.current = [value];
    else
      selectedActionsValues.current.push(value);
    onChange(id, selectedActionsValues.current);
    GlobalSingletonInstance.set("showRegenerateMsg", true);
    //TODO: if value is "The soup is in..., Teddy is in the..." then don't send to back end
    //TODO: handle it here itself
    var requestDDitem = shape_into_dropdownrequestitem(selectedActionsValues, page, group);
    console.log("requesting next DDitem: ", requestDDitem)
    var argsResponse = await getNextDropdownData(requestDDitem);
    console.log("response: ", argsResponse);
    setNextActionsDropdowns([argsResponse]);
    if(value === "Sometime after")
      setNextActionsDropdowns([argsResponse,argsResponse])
    console.log(nextActionsDropdowns);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const intentItems = [
    getItem("Default Intent", '1'),
    getItem("Persistent Intent", '2'),
    getItem("Flexible Intent", '3'),
    getItem("Drop Intent", '4'),
  ]
  const handleRemove = (id) => {
    selectedActionsValues.current = [];
    onRemove(id);
  };
  const handleNextDropdownChange = async(value, index, item) => {
    console.log(item);
    // let actualValue = item.filter(x=> x.label === value)[0].value;
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

  let settingsIcon = 
  // <Popover
  //     content={
  //       <Menu
  //       style={{
  //       width: 180,
  //     }}
  //     onClick={(e) => {
  //       console.log('click ', e);
  //       if(e==='1')
  //         setNextActionsDropdowns((prev)=> [...prev, 'Default']);
  //       if(e==='2')
  //         setNextActionsDropdowns((prev)=> [...prev, 'Persistent Intent']);
  //       if(e==='1')
  //         setNextActionsDropdowns((prev)=> [...prev, 'Flexible Intent']);
  //       if(e==='1')
  //         setNextActionsDropdowns((prev)=> [...prev, 'Default']);
  //       setShowSettingsDropdown(false);
  //     }}
  //     defaultSelectedKeys={['1']}
  //     mode="inline"
  //     items={intentItems}
  //   />
    //     // <Menu>

    //     // </Menu>
    //     // <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
    //     //   <li>Default</li>
    //     //   <li>Persist</li>
    //     //   <li>Substitute</li>
    //     //   <li>Drop</li>
    //     // </ul>
    //   }
    //   // title="Title"
    //   trigger="click"
    //   placement="bottom"
    //   open={showSettingsDropdown}
    //   onOpenChange={(dropdownState) => {
    //     setShowSettingsDropdown(dropdownState);
    //   }}
    // >
      <div
        onClick={() => {
          if(nextActionsDropdowns.filter(x=> x.includes("Intent")).length==0)
           setNextActionsDropdowns((prev) => [...prev,IntentDropdowns[0]]);
          setShowSettingsDropdown(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <SettingFilled style={{ fontSize: "16px", color: "#6E6E6E" }} />
      </div>;
    // </Popover>;

  let removeButton = <div onClick={() => handleRemove(id)} style={{ cursor: "pointer" }}>
    <CloseCircleTwoTone
    style={{ fontSize: "16px", cursor: "pointer" }}
    twoToneColor="#E0190D"
    />
  </div>;


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
        defaultValue={()=>{
          // handleChange(md[0]);
          return md[0];
          }}
        optionLabelProp="label"
      />
      {nextActionsDropdowns.map((item, index) => {
        return <Select
          showSearch
          placeholder={() => {
            console.log(item);
            return item[0].tooltip;
          }}
          optionFilterProp="children"
          onChange={async(value) => await handleNextDropdownChange(value, index, item)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          } 
          options={item}
          optionLabelProp="label"
          defaultValue={()=>{
            // handleChange(md[0]);
            return item[0];
            }}
          key={String(index)}
        />;
        })}
      {(enableSettings==true)?settingsIcon:''}
      {(removable==true)?removeButton:''}
    </Space>
  );
};
export default InputRow;
