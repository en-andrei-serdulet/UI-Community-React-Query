import { BqButton, BqTooltip } from "@bee-q/react";

interface Props {
  msg: string;
  placement?: string;
}

const Tooltip = ({ msg, placement = "top" }: Props) => {
  return (
    <span>
      <BqTooltip
        display-on="hover"
        placement={placement}
        same-width="false"
        class="hydrated"
      >
        {msg}
        <BqButton
          slot="trigger"
          appearance="secondary"
          justify-content="center"
          size="small"
          type="button"
          variant="standard"
          class="hydrated"
        >
          ?
        </BqButton>
      </BqTooltip>
    </span>
  );
};

export default Tooltip;
