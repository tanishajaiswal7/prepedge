import React, { useEffect, useState } from "react";

function Output({ language, version, value, socket, roomId }) {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleRun = async () => {
    try {
      const reqBody = {
        language,
        version,
        files: [
          {
            content: value,
          },
        ],
        stdin: input,
      };
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      setOutput(data.run.stdout + "\n" + data.run.stderr);
      socket.emit("output-change", {
        room: roomId,
        data: data.run.stdout + "\n" + data.run.stderr,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    const newValue = event.target.value;
    setInput(newValue);
    socket.emit("input-change", { room: roomId, data: newValue });
  }

  useEffect(() => {
    socket.on("recieve-input", (data) => {
      setInput(data);
    });

    socket.on("recieve-output", (data) => {
      setOutput(data);
    });

    return () => {
      socket.off("receive-input");
    };
  }, [socket]);

  return (
    <div className="bg-gray-900 rounded-xl p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <button
            className="w-full sm:w-auto text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl px-6 py-2 transition"
            onClick={handleRun}
          >
            Run Code
          </button>
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {/* Input Section */}
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2 text-white">Input</p>
            <textarea
              className="w-full h-24 sm:h-32 lg:h-40 outline-none border-2 border-gray-600 rounded-lg shadow-xl font-mono text-sm p-3 bg-gray-800 text-white placeholder-gray-400 resize-none"
              value={input}
              onChange={handleChange}
              placeholder="Enter input for your program..."
            />
          </div>
          
          {/* Output Section */}
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2 text-white">Output</p>
            <div className="w-full h-24 sm:h-32 lg:h-40 border-2 border-gray-600 rounded-lg shadow-xl font-mono text-sm bg-gray-800 text-green-400 p-3 overflow-auto whitespace-pre-wrap">
              {output || "Output will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Output;
