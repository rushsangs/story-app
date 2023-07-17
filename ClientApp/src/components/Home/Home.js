import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import InputRow from "../InputRow/InputRow";
import { Layout, Modal } from "antd";
import { mockInitialDropdowns, sampleInitialDropdowns, shape_into_dropdownrequestitems } from "../../Data/dropdowns";
import { getInitialDropdownData } from "../../Data/apis";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  const rowData = useRef({});
  // useEffect(() => {
  //   console.log("Component id is now" + componentId);
  // }, [componentId]);
  // Update the dropdown values based on the dropdown component's onChange event
  const handleDropdownChangeCallback = async(page, group, dropdownValue, some_id) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [some_id]: {page: page, group: group, values: dropdownValue},
    }));
  };

  // Callback function to handle button click
  const handleGenerateButtonClick = () => {
    // Perform actions with dropdownValues
    // return dropdownComponents;
    let shaped_vals = shape_into_dropdownrequestitems(dropdownValues);
    return shaped_vals;
  };
  
  const handleRemoveDropdown = (id) => {
    setDropdownComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  const onTaskClick = async(onDropdownChangeCallback) => {
    // mocking data
    // const rows = mockInitialDropdowns;
    
    // // api request
    const rows = await getInitialDropdownData();
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
      <div>
      <Button onClick={() => onTaskClick(handleDropdownChangeCallback)}>
            Task 1
          </Button>
      </div>
        <TabsPanel componentId = {componentId} onDropdownChangeCallback={handleDropdownChangeCallback} dropdownComponents = {dropdownComponents} onComponentChange={(x) => setComponentId(x)} onDropdownChange={(x) => setDropdownComponents(x)}/>
          
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel dropdownComponents = {dropdownComponents} getDropdownComponents={handleGenerateButtonClick} />
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
