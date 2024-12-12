import React, { useState } from "react";
import axios from "axios";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");

  const handleCreateGroup = async () => {
    try {
      const membersArray = members.split(",").map((member) => member.trim());
      const response = await axios.post("http://localhost:5000/api/groups", {
        name: groupName,
        members: membersArray,
      });
      console.log("Group created:", response.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Member Usernames (comma separated)"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default CreateGroup;
