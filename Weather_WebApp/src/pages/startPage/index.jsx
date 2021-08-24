import React from "react";
import styles from "./styles.less";
import Entry from "../../assets/startPage/Entry.png";
import { withRouter } from "react-router-dom";

function Index(props) {
  return (
    <>
      <div className={styles.start_main}>
        <img
          src={Entry}
          alt="开始按钮"
          onClick={() => props.history.push("/weatherPage")}
        />
      </div>
    </>
  );
}
export default withRouter(Index);
