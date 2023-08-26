import React, { useEffect, useState } from "react";
import { Tabs, Button, Affix } from "antd";
import Beginning from "../Beginning/Beginning";
import Actions from "../Actions/Actions";
import Ending from "../Ending/Ending";

const TabsPanel = ({componentId, dropdownComponents, onDropdownChangeCallback, onComponentChange, onDropdownChange, taskNumber, groupNumber}) => {
 
  // Group 1 does not see an actions tab at all
  const tabs = (groupNumber===1)?["Beginning", "Ending"]:["Beginning", "Actions", "Ending"];
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <>
      <Tabs
        onChange={onChange}
        type="card"
        items={tabs.map((_, i) => {
          const id = String(i + 1);
          let Component;
          switch (id) {
            case "1":
              Component = Beginning;
              break;
            case "2":
              if(tabs.length===2)
                Component = Ending;
              else
                Component = Actions;
              break;
            case "3":
              Component = Ending;
              break;
          }
          return {
            label: tabs[i],
            key: id,
            // Tasks 1 through 7 cannot access actions tab
            disabled: (tabs[i]==='Actions'&&taskNumber<8)?true:false,
            children: <Component componentId={componentId} onDropdownChangeCallback={onDropdownChangeCallback} dropdownComponents={dropdownComponents} onComponentChange={(x) => onComponentChange(x)} onDropdownChange={(x) => onDropdownChange(x)} taskNumber={taskNumber} groupNumber={groupNumber}/>,
          };
        })}
      />
    </>
  );
};

export default TabsPanel;
