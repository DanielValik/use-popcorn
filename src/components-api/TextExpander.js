import { useState } from "react";

export default function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show text",
  collapseButtonText = "Collapse text",
  buttonColor = "#000",
  className = "",
  expanded = false,
  children,
}) {
  const expandBtnStyle = {
    color: buttonColor,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontWeight: "600",
    border: 0,
    cursor: "pointer",
  };

  const [isExpand, setIsExpand] = useState(expanded);

  const displayedContent = isExpand
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div className={className}>
      {displayedContent}
      <button
        style={expandBtnStyle}
        onClick={() => setIsExpand((isExpand) => !isExpand)}
      >
        {isExpand ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
