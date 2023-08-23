import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Radio, Select } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import InputRow from "../InputRow/InputRow";
import { Layout, Modal } from "antd";
import { shape_into_dropdownrequestitems } from "../../Data/dropdowns";
import { getInitialDropdownData } from "../../Data/apis";
import { taskData, tasks } from "../../Data/story";
import Title from "antd/es/typography/Title";
import { studygroups } from "../../Data/study_groups";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  const [storyTaskComponents, setStoryTaskComponents] = useState({tasks: [], taskNumber: 0, taskInfo: ''});
  const [taskNumber, setTaskNumber] = useState(0);
  const [groupNumber, setGroupNumber] = useState(1);
  const [story, setStory] = useState();
  const [firstGenerated, setFirstGenerated] = useState(false);
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

  const setDefaultDropdowns = async() =>
  {

  }
  // Callback function to handle button click
  const handleGenerateButtonClick = () => {
    // Perform actions with dropdownValues
    // return dropdownComponents;
    console.log("values");
    console.log(dropdownValues);
    console.log("COMPONENTS");
    console.log(dropdownComponents);
    let shaped_vals = shape_into_dropdownrequestitems(dropdownValues);
    console.log("shaped vals");
    console.log(shaped_vals);
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
    setDropdownValues((prevValues) => {
      delete prevValues[id];
      return prevValues;
    });
  };

  const onTaskClick = async(onDropdownChangeCallback, task_num) => {
    // mocking data
    // const rows = mockInitialDropdowns;
    
    // // api request
    let rows = await getInitialDropdownData(task_num);
    
    
    //clear all previous dropdowns
    await setDropdownComponents([]);
    await setComponentId(0);
    await setDropdownValues({});
    await setStoryTaskComponents(taskData[task_num-1]);
    await setTaskNumber(task_num);
    await setStory();
    await setFirstGenerated(false);
    
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
            removable={(rows[i].page==="ending")?true:false}
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
      setDropdownValues((prevValues) => ({
        ...prevValues,
        [i]: {page: rows[i].page, group: rows[i].group, values: [JSON.parse(rows[i].main_Dropdown)[0].value, JSON.parse(rows[i].arguments)[0][0].value]},
      }));
      rowData.current = {
        ...rowData.current,
        [i]: [JSON.parse(rows[i].main_Dropdown)[0].value, JSON.parse(rows[i].arguments)[0][0].value ],
      };
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
          <Select style={{width: 150,}} options={studygroups} placeholder="Study Group" onChange={(v)=>setGroupNumber(v)}/>
          <Select style={{width: 120,}} options={tasks} placeholder="Task" onChange={(v)=>onTaskClick(handleDropdownChangeCallback, v)}/>
      </Space>
      
        <TabsPanel componentId = {componentId} onDropdownChangeCallback={handleDropdownChangeCallback} dropdownComponents = {dropdownComponents} onComponentChange={(x) => setComponentId(x)} onDropdownChange={(x) => setDropdownComponents(x)} taskNumber={taskNumber} groupNumber={groupNumber}/>
          
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel dropdownComponents = {dropdownComponents} getDropdownComponents={handleGenerateButtonClick} storyTaskComponents={storyTaskComponents} dropdownValues={dropdownValues} story={story} setStory={setStory} firstGenerated={firstGenerated} setFirstGenerated={setFirstGenerated}/>
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
        title="Find out more about the story world here!"
        open={showHelpModal}
        onCancel={() => {
          setShowHelpModal(false);
        }}
        footer={null}
      >
        <p>The kitchen has a refridgerator and a stovetop.</p>
        <p>The kitchen also has a single power outlet that can power one of two appliances at a time: the Microwave or the Toaster.</p>
        <p>Food must be heated before it can be eaten.</p>
        <p>If food is to be heated over stovetop, it must be in a pot.</p>
        <p>If food is to be heated using a microwave, it must be in a bowl.</p>
        <p>The bread can only be heated in the Toaster, and vice versa.</p>
        <Title level={3}>Characters</Title>
        <p>Teddy's only desire is to eat soup.</p>
        <p>Poppy's only desire is to eat Bread.</p>
        <Title level={3}>Locations</Title>
        <p>Teddy's Room</p>
        <p>Poppy's Room</p>
        <p>Kitchen</p>
        <Title level={3}>Actions</Title>
        <p>Connect</p>
        <p>Walk</p>
        <p>Disconnect</p>
        <p>Check power outlet</p>
        <p>Toast</p>
        <p>Heat over microwave</p>
        <p>Heat over stovetop</p>
        <p>Transfer container</p>
        <p>Remove from fridge</p>
        <p>Eat</p>
      </Modal>
    </Layout>
  );
};

export default Home;
