import React, { useEffect, useState } from "react";

import { Card, Space, Button, Divider } from "antd";
import { List, Typography } from "antd";
import { CaretRightOutlined,CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";
import { getStoryData, getMockStoryData } from "../../Data/apis";
import styles from "./StoryPanel.module.css";
import { GlobalSingletonObject } from "../../utils/dataContext";
const { Title, Text } = Typography;



const GlobalSingletonInstance = new GlobalSingletonObject();

const StoryPanel = ({dropdownComponents, getDropdownComponents, storyTaskComponents}) => {
  const [story, setStory] = useState();
  // const [tasks, setTasks] = useState(task1);


const onGenerateStoryClick = async() => {
  GlobalSingletonInstance.set("showRegenerateMsg", false);
  // const allDropdownData = ExtractDataFromDropdowns(dropdownComponents);
  let requestData=  getDropdownComponents();
  const storyData = await getStoryData(requestData);
  // const storyData = ["hello", "test", "list", "of", "strings"];
  if (storyData.length === 0) 
    storyData.push("No plan found.")
  setStory(storyData);
};

const TaskHTML = <div><Title level={3}>Task {storyTaskComponents.taskNumber}</Title><div>
  <div style={{textAlign: "left"}}>{storyTaskComponents.taskInfo}</div>
  <Divider>Tasks</Divider>
{storyTaskComponents.tasks.map((item, index) => {
  if(item.test(story))
  {
     return (<div style={{textAlign: "left"}}
     key={index}><Space
     key={index}>
    <CheckCircleTwoTone />
    <div>{item.text}</div>
    </Space></div>
    )
  }
  else
  {
    return (<div style={{textAlign: "left"}} key={index}><Space
    key={index}>
      <CloseCircleTwoTone />
      <div>{item.text}</div>
      </Space></div>
      )
  }})}
</div>
</div>;
  
  return (
    <div className={styles.storyContainer}>
       {
          (storyTaskComponents.taskNumber!=0)?TaskHTML:<></>
       }
      <Title level={3}>Generate story</Title>
      <Button type="primary" block onClick={() => onGenerateStoryClick()}>
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
            return <List.Item style={{textAlign: "left"}}>{item}</List.Item>;
          }}
        />
      </div>
    </div>
  );
};
export default StoryPanel;
