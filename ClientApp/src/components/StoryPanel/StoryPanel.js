import React, { useEffect, useState } from "react";

import { Card, Space, Button, Divider, Alert, Spin } from "antd";
import { List, Typography } from "antd";
import { CaretRightOutlined,CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";
import { getStoryData, getMockStoryData, logToFile } from "../../Data/apis";
import styles from "./StoryPanel.module.css";
import { GlobalSingletonObject } from "../../utils/dataContext";
const { Title, Text } = Typography;
const {ErrorBoundary} = Alert;


const GlobalSingletonInstance = new GlobalSingletonObject();

const StoryPanel = ({dropdownComponents, getDropdownComponents, storyTaskComponents, dropdownValues, story, setStory, firstGenerated, setFirstGenerated}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState(task1);

const checkIfGoalSpecified = (dropdownValues,setErrorMessage, setErrorMessageVisible) =>
{
    let goalConds=0;
    for(let k in dropdownValues)
    {
      if(dropdownValues[k].page==='ending' && dropdownValues[k].group==='world')
        goalConds++;
    }
    if(goalConds===0){
      setErrorMessage("You have not specified any World goals in the Ending tab. There will be no story generated unless atleast one fact is specified for the Ending goal.");
      setErrorMessageVisible(true);
      logToFile("Story not produced -- no end goal specified");
      return true;
    }
    return false;
}

const onGenerateStoryClick = async() => {
  setStory([]);
  setLoading(true);
  GlobalSingletonInstance.set("showRegenerateMsg", false);
  // const allDropdownData = ExtractDataFromDropdowns(dropdownComponents);
  let requestData=  getDropdownComponents();
  logToFile("Story Generation Request from front end");
  if(checkIfGoalSpecified(dropdownValues, setErrorMessage, setErrorMessageVisible))
  {
    setLoading(false);
    return;
  } 
  const storyData = await getStoryData(requestData, setErrorMessage, setErrorMessageVisible, setLoading);
  
  // const storyData = ["hello", "test", "list", "of", "strings"];
  if (storyData.length === 0) 
    storyData.push("No plan found.")
  setStory(storyData);
  setFirstGenerated(true);
  setLoading(false);
};

const errorHTML = <Alert
message="Error"
description={errorMessage}
type="error"
closable
afterClose={()=>setErrorMessageVisible(false)}
/>;

const TaskHTML = <div><Title level={3}>Task {storyTaskComponents.taskNumber}</Title><div>
  <div style={{textAlign: "left"}}>{storyTaskComponents.taskInfo}</div>
  <Divider>Tasks</Divider>
{storyTaskComponents.tasks.map((item, index) => {
  // console.log(dropdownValues);
  if(item.test(story, dropdownValues) || ('sticky' in item && item.sticky))
  {
    if('sticky' in item)
      item.sticky = true;
    return (<div style={{textAlign: "left"}}
     key={index}><Space
     key={index}>
    <CheckCircleTwoTone twoToneColor="#52c41a"/>
    <div>{item.text}</div>
    </Space></div>
    );
  }
  else
  {
    return (<div style={{textAlign: "left"}} key={index}><Space
    key={index}>
      <CloseCircleTwoTone twoToneColor="#ff4500" />
      <div>{item.text}</div>
      </Space></div>
      );
  }})}
</div>
</div>;
  
  return (
    <div className={styles.storyContainer}>
       {
          (storyTaskComponents.taskNumber!==0)?TaskHTML:<></>
       }
      <Title level={3}>Generate story</Title>

      <Button type="primary" block onClick={() => onGenerateStoryClick()}>
        {(firstGenerated)?"Generate Another Story":"Generate"}
        <CaretRightOutlined />
      </Button>
      <Spin spinning={loading}>
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
        {(errorMessage.length>0)?errorMessageVisible && errorHTML:""}
        <List
          dataSource={story}
          renderItem={(item, index) => {
            return <List.Item style={{textAlign: "left"}}>{item}</List.Item>;
          }}
        />
      </div>
      </Spin>     
      
    </div>
  );
};
export default StoryPanel;
