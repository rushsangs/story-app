import React, { useEffect, useState } from "react";

import { Card, Space, Button } from "antd";
import { List, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { getStoryData } from "../../Data/apis";
import styles from "./StoryPanel.module.css";

const StoryPanel = () => {
  const [story, setStory] = useState();

  useEffect(() => {
    const storyData = getStoryData();
    setStory(storyData);
  }, []);

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyHead}>
        <div className={styles.storyTitle}>Generate story</div>
        <div>
          <Button block onClick={getStoryData}>
            Generate<CaretRightOutlined />
          </Button>
        </div>
        {<div></div>}
      </div>
      <div className={styles.storyBody}>
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
