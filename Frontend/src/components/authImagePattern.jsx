import React from "react";

const AuthImagePattern = ({title,subtitle}) => {
  return (
    <div className="hidden lg:flex flex-col lg: items-center justify-center bg-base-200 p-12">
      <div className="w-full max-w-md animate-pulse space-y-4 text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_,i)=>(
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gray-400 ${
                i%2===0? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;