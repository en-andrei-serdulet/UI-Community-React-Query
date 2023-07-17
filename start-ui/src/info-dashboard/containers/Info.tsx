import { BqButton, BqDivider } from "@bee-q/react";
import { infoStyles as styles } from "../../styles/infoStyles";

const Info = () => {
  return (
    <div className={styles.div}>
      <ul className={styles.ul}>
        <BqDivider
          orientation="horizontal"
          stroke-color="stroke--secondary"
          stroke-dash-width="12"
          stroke-dash-gap="7"
          stroke-thickness="2"
          stroke-basis="20"
          stroke-linecap="butt"
          title-alignment="start"
        >
          <p>Links</p>
        </BqDivider>
        <BqButton
          appearance="link"
          href="https://tanstack.com/query/latest/docs/react/overview"
          justify-content="center"
          size="medium"
          target="_blank"
          type="button"
          variant="standard"
        >
          React Query Documentation
        </BqButton>
        <BqDivider></BqDivider>
        <BqButton
          appearance="link"
          href="https://github.com/Endava/bee-q"
          justify-content="center"
          size="medium"
          target="_blank"
          type="button"
          variant="standard"
        >
          BeeQ Repository
        </BqButton>
        <BqDivider dashed></BqDivider>
        <BqButton
          appearance="link"
          href="https://tkdodo.eu/blog/practical-react-query"
          justify-content="center"
          size="medium"
          target="_blank"
          type="button"
          variant="standard"
        >
          Practical React Query
        </BqButton>
      </ul>
    </div>
  );
};

export default Info;
