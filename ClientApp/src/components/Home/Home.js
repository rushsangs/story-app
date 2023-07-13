import React, { useEffect, useState } from "react";
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

  const onTaskClick = async(componentId, setComponentId, dropdownComponents, setDropdownComponents) => {
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
            args = {rows[i].Arguments}
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
      <Button onClick={() => onTaskClick(componentId, setComponentId, dropdownComponents, setDropdownComponents)}>
            Task 1
          </Button>
      </div>
        <TabsPanel componentId = {componentId}  dropdownComponents = {dropdownComponents} onComponentChange={(x) => setComponentId(x)} onDropdownChange={(x) => setDropdownComponents(x)}/>
          
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel dropdownComponents = {dropdownComponents} />
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
