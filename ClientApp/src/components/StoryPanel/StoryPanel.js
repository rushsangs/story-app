import React, { useEffect, useState } from "react";

import { Card, Space, Button } from "antd";
import { List, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { getStoryData, getMockStoryData } from "../../Data/apis";
import styles from "./StoryPanel.module.css";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const StoryPanel = ({dropdownComponents, getDropdownComponents}) => {
  const [story, setStory] = useState();

const ExtractDataFromDropdowns = (components) => {
  var response  = [];
  for (let i = 0; i < components.length; i++){
    const id = components[i].id;
    const element = components[i].component; 
    console.log(element);
    // get all the options selected from inside element
    // but element is a react element
    // TODO: iterate through all elements and create the object shape needed for the API call
  }
};

const onGenerateStoryClick = async() => {
  GlobalSingletonInstance.set("showRegenerateMsg", false);
  const allDropdownData = ExtractDataFromDropdowns(dropdownComponents);
  getDropdownComponents();
  // const storyData = await getStoryData();
  const storyData = ["hello", "test", "list", "of", "strings"];
  setStory(storyData);
};

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyTitle}>Generate story</div>
      <Button block onClick={() => onGenerateStoryClick()}>
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
