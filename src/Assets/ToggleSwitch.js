import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setToggleTheme } from "../ReduxToolkit/userSlice";

const ToggleSwitch = () => {
  const { toggleTheme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <input
        className="react-switch-checkbox ease-in-out transition-all duration-1000"
        id={`react-switch-new`}
        type="checkbox"
        checked={!toggleTheme}
        value={toggleTheme}
        onChange={() => dispatch(setToggleTheme())}
      />
      <label
        style={{ background: !toggleTheme && "#626EE3" }}
        className="react-switch-label ease-in-out transition-all duration-1000"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
