import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropdown from "./LanguageDropdown";
import Output from "./Output";

function CodeEditor({ socket, roomId }) {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("c");
  const [version, setVersion] = useState("10.2.0");

  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleEditorChange(value, event) {
    setValue(value);
    socket.emit("message", { room: roomId, data: value });
  }

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setValue(data);
    });

    socket.on("recieve-language", ({ language, version }) => {
      setLanguage(language);
      setVersion(version);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
        {/* Code Editor Section */}
        <div className="w-full xl:w-1/2">
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
              <p className="text-lg lg:text-xl font-semibold text-white whitespace-nowrap">Language:</p>
              <LanguageDropdown
                langSetter={setLanguage}
                verSetter={setVersion}
                socket={socket}
                lang={language}
                ver={version}
                roomId={roomId}
              />
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <Editor
                height="40vh"
                theme="vs-dark"
                width="100%"
                language={language}
                value={value}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto'
                  },
                  wordWrap: 'on'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Output Section */}
        <div className="w-full xl:w-1/2">
          <Output
            version={version}
            language={language}
            value={value}
            socket={socket}
            roomId={roomId}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
