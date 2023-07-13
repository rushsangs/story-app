import React, { useState, useRef } from "react";
import { Space, Button } from "antd";
import InputRow from "../InputRow/InputRow";
import { GlobalSingletonObject } from "../../utils/dataContext";

const GlobalSingletonInstance = new GlobalSingletonObject();

const Actions = ({ onDropdownChangeCallback }) => {
  const [dropdownComponents, setDropdownComponents] = useState([]);
  const [componentId, setComponentId] = useState(0);

  const rowData = useRef({});
  const handleAddDropdown = () => {
    const newComponent = {
      id: componentId,
      component: (
        <InputRow
          id={`actions${componentId}`}
          key="actions"
          onRemove={handleRemoveDropdown}
          onChange={(id, data) => {
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
  };

  const handleRemoveDropdown = (id) => {
    setDropdownComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  return (
    <>
      <Space direction="vertical" style={{ padding: "0 15px" }}>
        <Button onClick={handleAddDropdown}>Add Data</Button>
        {dropdownComponents.map((obj) => obj.component)}
      </Space>
    </>
  );
};
export default Actions;

// import React, { useState } from "react";
// import { Space, Button } from "antd";
// import InputRow from "../InputRow/InputRow";
// import { GlobalSingletonObject } from "../../utils/dataContext";

// const GlobalSingletonInstance = new GlobalSingletonObject();

// const Actions = ({
//   componentId,
//   dropdownComponents,
//   onComponentChange,
//   onDropdownChange,
//   onDropdownChangeCallback,
// }) => {
//   const handleAddDropdown = () => {
//     const newComponent = {
//       id: componentId,
//       page: "actions",
//       component: (
//         <InputRow
//           id={`actions${componentId}`}
//           key="actions"
//           onRemove={handleRemoveDropdown}
//           onDropdownChangeCallback={onDropdownChangeCallback}
//         />
//       ),
//     };
//     onDropdownChange((prevComponents) => [...prevComponents, newComponent]);
//     onComponentChange((prevId) => prevId + 1);
//   };

//   const handleRemoveDropdown = (id) => {
//     onDropdownChange((prevComponents) =>
//       prevComponents.filter((comp) => comp.id !== id)
//     );
//   };

//   return (
//     <>
//       <Space direction="vertical" style={{ padding: "0 15px" }}>
//         <Button onClick={handleAddDropdown}>Add Data</Button>
//         {dropdownComponents
//           .filter((obj) => obj.page === "actions")
//           .map((obj) => obj.component)}
//       </Space>
//     </>
//   );
// };
// export default Actions;
