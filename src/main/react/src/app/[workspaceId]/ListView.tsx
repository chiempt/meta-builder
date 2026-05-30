import React, { useState, useEffect } from "react";
import { Table, Tag, Avatar, Flex, Input, message } from "antd";
import { CaretDownOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { taskApi, Task } from "../../lib/api/taskApi";

export function ListView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState("");
  const [addingToStatus, setAddingToStatus] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (status: string) => {
    if (!newTaskName.trim()) {
      setAddingToStatus(null);
      return;
    }
    
    try {
      await taskApi.createTask({
        name: newTaskName,
        assignee: "Unassigned",
        dueDate: "No Date",
        priority: "Normal",
        status: status
      });
      setNewTaskName("");
      setAddingToStatus(null);
      message.success("Task added");
      loadTasks();
    } catch (error) {
      message.error("Failed to add task");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
      render: (text: string) => (
        <Flex align="center" gap={8}>
          <div style={{ width: 14, height: 14, border: "1px solid #444", borderRadius: 3, cursor: "pointer" }} />
          <span>{text}</span>
        </Flex>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: "20%",
      render: (text: string) => (
        <Flex align="center" gap={8}>
          {text !== "Unassigned" ? (
            <Avatar size={20} style={{ backgroundColor: "#87d068" }}>{text.charAt(0)}</Avatar>
          ) : (
            <Avatar size={20} style={{ backgroundColor: "transparent", border: "1px dashed #666" }}>?</Avatar>
          )}
          <span style={{ color: "#888" }}>{text}</span>
        </Flex>
      ),
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "15%",
      render: (text: string) => <span style={{ color: text === "Today" ? "#ff4d4f" : "#888" }}>{text}</span>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "15%",
      render: (priority: string) => {
        let color = "default";
        if (priority === "Urgent") color = "red";
        if (priority === "High") color = "orange";
        if (priority === "Normal") color = "blue";
        return <Tag color={color} variant="filled">{priority}</Tag>;
      },
    },
    {
      title: <PlusOutlined style={{ cursor: "pointer" }} />,
      key: "add",
      width: 50,
      render: () => <MoreOutlined style={{ cursor: "pointer", color: "#666" }} />,
    }
  ];

  const statuses = ["TO DO", "IN PROGRESS", "DONE"];
  
  const groupedData = statuses.map(status => {
    const statusTasks = tasks.filter(t => t.status === status);
    let color = "#8c8c8c";
    if (status === "IN PROGRESS") color = "#1890ff";
    if (status === "DONE") color = "#52c41a";

    return {
      key: status,
      status,
      count: statusTasks.length,
      color,
      children: statusTasks,
    };
  });

  return (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      {groupedData.map((group, index) => (
        <div key={group.key} style={{ marginBottom: 32 }}>
          <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
            <CaretDownOutlined style={{ fontSize: 10, color: "#888", cursor: "pointer" }} />
            <Tag color={group.color} style={{ borderRadius: 4, fontWeight: 600, border: "none" }}>{group.status}</Tag>
            <span style={{ color: "#666", fontSize: 12 }}>{group.count}</span>
          </Flex>
          
          <Table 
            dataSource={group.children} 
            columns={columns} 
            pagination={false}
            size="small"
            loading={loading}
            showHeader={index === 0} // Only show header on first group for ClickUp style
            rowKey="id"
            rowClassName={() => "task-row-hover"}
            style={{ 
              border: "1px solid #2a2a2a", 
              borderTop: index === 0 ? "none" : "1px solid #2a2a2a",
              borderBottom: "none", 
              borderRadius: index === 0 ? "8px 8px 0 0" : 0 
            }}
          />
          
          {addingToStatus === group.status ? (
            <div style={{ 
              padding: "8px 16px", 
              border: "1px solid #2a2a2a", 
              borderTop: "none", 
              borderBottomLeftRadius: 8, 
              borderBottomRightRadius: 8,
              background: "#1e1e1e"
            }}>
              <Input 
                autoFocus
                placeholder="Task name" 
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
                onPressEnter={() => handleAddTask(group.status)}
                onBlur={() => {
                  if (newTaskName) handleAddTask(group.status);
                  else setAddingToStatus(null);
                }}
                variant="borderless"
                style={{ padding: 0 }}
              />
            </div>
          ) : (
            <div 
              onClick={() => {
                setAddingToStatus(group.status);
                setNewTaskName("");
              }}
              style={{ 
                padding: "8px 16px", 
                border: "1px solid #2a2a2a", 
                borderTop: "none", 
                borderBottomLeftRadius: 8, 
                borderBottomRightRadius: 8,
                color: "#666",
                cursor: "text"
              }}
            >
              <PlusOutlined style={{ marginRight: 8 }} /> Add Task
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
