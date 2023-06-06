import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import SampleData from "./sample_data.json";
import "./App.css";

function DraggableTree({ data, onDrop, dragMode, renderItem }) {
  console.log(getBackendOptions());
  return (
    <div className="app">
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          canDrag={() => dragMode}
          tree={data}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => {
            return <div>{node.text}</div>;
          }}
          dragPreviewRender={({ item }) => <div>{item.test}</div>}
          onDrop={onDrop}
          sort={false}
          insertDroppableFirst={false}
          canDrop={(_tree, { dragSource, dropTargetId }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          initialOpen
          dropTargetOffset={10}
          placeholderRender={(_, { depth }) => <div />}
        />
      </DndProvider>
    </div>
  );
}

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);

  return <DraggableTree data={treeData} dragMode={true} onDrop={handleDrop} />;
}

export default App;
