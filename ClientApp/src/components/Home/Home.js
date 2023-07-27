import React, { useEffect, useRef, useState } from "react";
import { Button, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import InputRow from "../InputRow/InputRow";
import { Layout, Modal } from "antd";
import { mockInitialDropdowns, sampleInitialDropdowns, shape_into_dropdownrequestitems } from "../../Data/dropdowns";
import { getInitialDropdownData } from "../../Data/apis";
import { task1 } from "../../Data/story";
import Title from "antd/es/typography/Title";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  const [storyTaskComponents, setStoryTaskComponents] = useState([]);
  const rowData = useRef({});
  // useEffect(() => {
  //   console.log("Component id is now" + componentId);
  // }, [componentId]);
  // Update the dropdown values based on the dropdown component's onChange event
  const handleDropdownChangeCallback = async(page, group, dropdownValue, some_id) => {
    console.log("callback received");
    if(page === ""){
      console.log("received empty page, delete request");
      console.log("component id is", some_id);
      setDropdownValues((prevValues) => {
        delete prevValues[some_id];
        return prevValues;
      });
    }
    else{
      setDropdownValues((prevValues) => ({
        ...prevValues,
        [some_id]: {page: page, group: group, values: dropdownValue},
      }));
    }
  };

  // Callback function to handle button click
  const handleGenerateButtonClick = () => {
    // Perform actions with dropdownValues
    // return dropdownComponents;
    console.log('sending vals');
    console.log(dropdownValues);
    let shaped_vals = shape_into_dropdownrequestitems(dropdownValues);
    return shaped_vals;
  };
  
  const handleRemoveDropdown = (id) => {
    console.log("values");
    console.log(dropdownValues);
    console.log("COMPONENTS");
    console.log(dropdownComponents);
    setDropdownComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  const onTaskClick = async(onDropdownChangeCallback) => {
    // mocking data
    // const rows = mockInitialDropdowns;
    
    // // api request
    const rows = await getInitialDropdownData();
    
    //clear all previous dropdowns
    await setDropdownComponents([]);
    await setComponentId(0);
    await setDropdownValues({});
    await setStoryTaskComponents(task1);
    
    for(let i=0; i < rows.length; ++i)
    {
      const newComponent = {
        id: i,
        page: rows[i].page,
        group: rows[i].group,
        component: (
          <InputRow
            key ={String(componentId)+"-"+String(i)}
            input_row_key={String(componentId)+"-"+String(i)}
            id={i}
            removable={false}
            enableSettings={false}
            page= {rows[i].page}
            group= {rows[i].group}
            mainDropdown= {rows[i].main_Dropdown}
            onRemove={(id) => {
              // console.log("id is", id);
              handleRemoveDropdown(id);
              delete rowData.current[id];
              console.log(">>>> default rowData", rowData.current);
            }}
            args = {rows[i].arguments}
            onChange= {async(id, data) => {
              rowData.current = {
                ...rowData.current,
                [id]: data,
              };
              await onDropdownChangeCallback(rows[i].page, rows[i].group, data, i);
              console.log(">>>> default rowData", rowData.current);
              // console.log("id is ",id);
            }}
          />
        ),
      };
      await setDropdownComponents((prevComponents) => [
        ...prevComponents,
        newComponent,
      ]);
      await  setComponentId((prevId) => {return prevId + 1;});     
    }
    // GlobalSingletonInstance.set("showRegenerateMsg", false);
    // const storyData = await getStoryData();
    // setStory(storyData);
  };

  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <Content>
      <Space>
          <Title level={2}>Plot Generation Tool Version 3.0</Title>
          <Button onClick={() => onTaskClick(handleDropdownChangeCallback)}>
            Task 1
          </Button>
          <Button onClick={() => onTaskClick(handleDropdownChangeCallback)}>
            Task 2
          </Button>
      </Space>
      
        <TabsPanel componentId = {componentId} onDropdownChangeCallback={handleDropdownChangeCallback} dropdownComponents = {dropdownComponents} onComponentChange={(x) => setComponentId(x)} onDropdownChange={(x) => setDropdownComponents(x)}/>
          
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel dropdownComponents = {dropdownComponents} getDropdownComponents={handleGenerateButtonClick} storyTaskComponents={storyTaskComponents}/>
      </Sider>

      <div
        className={styles.help}
        onClick={() => {
          setShowHelpModal(true);
        }}
      >
        <QuestionCircleFilled style={{ fontSize: "32px", color: "#1b79ff" }} />
      </div>
      <Modal
        title="Basic Modal"
        open={showHelpModal}
        onCancel={() => {
          setShowHelpModal(false);
        }}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout>
  );
};

export default Home;
