import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </div>
  );
};

export default Loading;
