import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import InputRow from "../InputRow/InputRow";
import { Layout, Modal } from "antd";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);

  const [dropdownValues, setDropdownValues] = useState({});

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
    console.log(dropdownValues);
  };

  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <Content>
        {/* <div>
          <Button
            onClick={() =>
              onTaskClick(dropdownComponents, setDropdownComponents)
            }
          >
            Task 1
          </Button>
        </div> */}
        {/* <TabsPanel componentId = {componentId}  dropdownComponents = {dropdownComponents} onComponentChange={(x) => setComponentId(x)} onDropdownChange={(x) => setDropdownComponents(x)}/> */}
        <TabsPanel onDropdownChangeCallback={handleDropdownChangeCallback} />
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel
          dropdownComponents={dropdownComponents}
          onGenerateButtonClick={handleGenerateButtonClick}
        />
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
