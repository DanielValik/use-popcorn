import { useEffect } from "react";

export function useKeyEffect(keyCode, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [keyCode, action]
  );
}
