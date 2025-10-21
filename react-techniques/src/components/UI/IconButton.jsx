import { memo } from "react";

import { log } from "../../log.js";

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  // icon 속성 : <Counter /> 에서 사용중 이 속성을 통해 전달되는 함수명은 변경불가.
  log("<IconButton /> rendered", 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
