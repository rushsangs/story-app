import React, { useEffect, useState } from "react";
import TabsPanel from "../TabsPanel/TabsPanel";
import StoryPanel from "../StoryPanel/StoryPanel";
import { QuestionCircleFilled } from "@ant-design/icons";
import styles from "./Home.module.css";
import { Layout, Modal } from "antd";
const { Sider, Content } = Layout;

const Home = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <Content>
        <TabsPanel />
      </Content>
      <Sider theme={"light"} width="25%">
        <StoryPanel />
      </Sider>

      <div className={styles.help} onClick={() => { setShowHelpModal(true) }}><QuestionCircleFilled style={{ fontSize: '32px', color: '#1b79ff'}}/></div>
      <Modal title="Basic Modal" open={showHelpModal} onCancel={() => { setShowHelpModal(false) }} footer={null}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout>
  );
};

export default Home;
