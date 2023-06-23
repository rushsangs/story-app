import React, { useEffect, useState } from "react";
import { Tabs, Button, Affix } from "antd";
import Beginning from "../Beginning/Beginning";
import Actions from "../Actions/Actions";
import Ending from "../Ending/Ending";

const TabsPanel = () => {
  const tabs = ["Beginning", "Actions", "Ending"];

  const onChange = (key) => {
    console.log(key);
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
              Component = Actions;
              break;
            case "3":
              Component = Ending;
              break;
          }
          return {
            label: tabs[i],
            key: id,
            children: <Component />,
          };
        })}
      />
    </>
  );
};

export default TabsPanel;
