import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import InputRow from "../InputRow/InputRow";
import { Layout, Modal } from "antd";
import { sampleInitialDropdowns } from "../../Data/dropdowns";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  const rowData = useRef({});
  // Update the dropdown values based on the dropdown component's onChange event
  const handleDropdownChangeCallback = (tabId, dropdownValue) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [tabId]: dropdownValue,
    }));
  };

  // Callback function to handle button click
  const handleGenerateButtonClick = () => {
    // Perform actions with dropdownValues
    // return dropdownComponents;
    console.log(dropdownValues);
  };
  
  const handleRemoveDropdown = (id) => {
    setDropdownComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  const onTaskClick = async(componentId, setComponentId, dropdownComponents, setDropdownComponents, onDropdownChangeCallback) => {
    //mocking data for now
    const rows = sampleInitialDropdowns;
    
    for(let i=0; i < rows.length; ++i)
    {
      const newComponent = {
        id: componentId,
        page: rows[i].Page,
        group: rows[i].Group,
        component: (
          <InputRow
            key ={String(componentId)+"-"+String(i)}
            input_row_key={String(componentId)+"-"+String(i)}
            id={componentId}
            page= {rows[i].Page}
            mainDropdown= {rows[i].Main_Dropdown}
            onRemove={handleRemoveDropdown}
            args = {rows[i].Arguments}
            onChange= {(id, data) => {
              rowData.current = {
                ...rowData.current,
                [id]: data,
              };
              onDropdownChangeCallback("actions", rowData.current);
              console.log(">>>> inside actions rowData", rowData.current);
            }}
          />
        ),
      };
      setDropdownComponents((prevComponents) => [
        ...prevComponents,
        newComponent,
      ]);
      setComponentId((prevId) => prevId + 1);
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
      <Button onClick={() => onTaskClick(componentId, setComponentId, dropdownComponents, setDropdownComponents, handleDropdownChangeCallback)}>
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
