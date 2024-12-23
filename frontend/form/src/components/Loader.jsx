import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
