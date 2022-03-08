import React, { useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function PostEditor({ value, Ref }) {
  // Ref.current.rootEl.current.style.width = "700px";
  useEffect(() => {
    Ref.current.rootEl.current.style.width = "700px";
  }, []);
  return (
    <Editor
      initialValue={value || ""}
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={false}
      ref={Ref}
      toolbarItems={[
        ["heading", "bold"],
        // ["scrollSync", "hr", "quote"],
        // , "italic", "strike"
        // "quote",
        // "divider",
        // "ul",
        // "ol",
        // "task",
        // "indent",
        // "outdent",
        // "divider",
        // "table",
        // "link",
        // "divider",
        // "code",
        // "codeblock",
        // "divider",
      ]}
    />
  );
}

export default PostEditor;
