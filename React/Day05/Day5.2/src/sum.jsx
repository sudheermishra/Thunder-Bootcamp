import React from "react";

const Sum = React.memo(({ number }) => {
  console.log("Sum render");
  return (
    <>
      <h1>{number}</h1>
    </>
  );
});

export default Sum;
