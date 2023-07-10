import React, { useEffect, useState } from "react";

import { Card, Space, Button } from "antd";
import { List, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { getStoryData, getMockStoryData } from "../../Data/apis";
import styles from "./StoryPanel.module.css";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const StoryPanel = ({dropdownComponents}) => {
  const [story, setStory] = useState();

const FormatDropdowns = (components) => {
  var response  = [];
  for (let i = 0; i < components.length; i++){
    console.log(components[i]);
    const element = {}; 
  }
};

const onGenerateStoryClick = async() => {
  GlobalSingletonInstance.set("showRegenerateMsg", false);
  // const allDropdownData = FormatDropdowns(dropdownComponents);
  const storyData = await getStoryData();
  setStory(storyData);
};

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyTitle}>Generate story</div>
      <Button block onClick={onGenerateStoryClick()}>
        Generate
        <CaretRightOutlined />
      </Button>
      {GlobalSingletonInstance.get("showRegenerateMsg") && (
        <div className={styles.regenerateMsg}>
          You have updated the settings! Press Regenerate to see new story.{" "}
        </div>
      )}

      <div
        className={styles.storyBody}
        style={{
          height: !GlobalSingletonInstance.get("showRegenerateMsg")
            ? "calc(100vh - 100px)"
            : "",
        }}
      >
        <List
          dataSource={story}
          renderItem={(item, index) => {
            return <List.Item>{item}</List.Item>;
          }}
        />
      </div>
    </div>
  );
};
export default StoryPanel;
