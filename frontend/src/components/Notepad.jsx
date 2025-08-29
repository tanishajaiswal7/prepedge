import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function Notepad({ socket, roomId }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    // socket.emit("joinRoom", roomId);

    socket.on("recieve-text", (data) => {
      setValue(data);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  const handleChange = (newValue) => {
    setValue(newValue);
    socket.emit("text-change", { room: roomId, data: newValue });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 h-full">
      <h3 className="text-white text-lg font-semibold mb-3">Notes</h3>
      <div className="h-full">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          className="h-full"
          style={{
            height: 'calc(100% - 42px)' // Account for toolbar height
          }}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['clean']
            ]
          }}
        />
      </div>
    </div>
  );
}

export default Notepad;
