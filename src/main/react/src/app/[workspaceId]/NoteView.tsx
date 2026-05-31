import React, { useState, useEffect } from "react";
import { Input, Divider, Flex, Button, List, message, theme } from "antd";
import { PlusOutlined, SaveOutlined, FileTextOutlined } from "@ant-design/icons";
import { noteApi, Note } from "../../lib/api/noteApi";

const { TextArea } = Input;

export function NoteView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { token: { colorBgContainer, colorBgLayout, colorBorderSecondary, colorBgTextHover, colorTextSecondary, colorText } } = theme.useToken();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await noteApi.getNotes();
      setNotes(data);
      if (data.length > 0 && !activeNote) {
        selectNote(data[0]);
      }
    } catch (error) {
      message.error("Failed to load notes");
    }
  };

  const selectNote = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCreateNew = async () => {
    try {
      const newNote = await noteApi.createNote({
        title: "Untitled Note",
        content: ""
      });
      await loadNotes();
      selectNote(newNote);
    } catch (error) {
      message.error("Failed to create note");
    }
  };

  const handleSave = async () => {
    if (!activeNote) return;
    setIsSaving(true);
    try {
      await noteApi.updateNote(activeNote.id, { title, content });
      message.success("Note saved!");
      await loadNotes();
    } catch (error) {
      message.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Flex style={{ height: "100%", background: colorBgContainer }}>
      {/* Sidebar - Note List */}
      <div style={{ width: 280, borderRight: `1px solid ${colorBorderSecondary}`, background: colorBgLayout, display: "flex", flexDirection: "column" }}>
        <Flex align="center" justify="space-between" style={{ padding: "16px", borderBottom: `1px solid ${colorBorderSecondary}` }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Docs</span>
          <Button type="primary" icon={<PlusOutlined />} size="small" onClick={handleCreateNew}>
            New
          </Button>
        </Flex>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <List
            dataSource={notes}
            renderItem={note => (
              <div
                onClick={() => selectNote(note)}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  background: activeNote?.id === note.id ? colorBgTextHover : "transparent",
                  borderBottom: `1px solid ${colorBorderSecondary}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <FileTextOutlined style={{ color: activeNote?.id === note.id ? "#1890ff" : "#888" }} />
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {note.title || "Untitled Note"}
                  </div>
                  <div style={{ fontSize: 11, color: colorTextSecondary }}>
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Main Editor */}
      <div style={{ flex: 1, padding: "40px 60px", maxWidth: 900, margin: "0 auto", height: "100%", display: "flex", flexDirection: "column" }}>
        {activeNote ? (
          <>
            <Flex align="center" justify="space-between">
              <Input
                variant="borderless"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ fontSize: 32, fontWeight: 700, padding: 0, marginBottom: 8 }}
                placeholder="Note Title"
              />
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={isSaving}>
                Save
              </Button>
            </Flex>

            <Divider style={{ margin: "12px 0", borderColor: colorBorderSecondary }} />

            <TextArea
              variant="borderless"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Start typing your notes here... (Markdown supported)"
              style={{
                fontSize: 16,
                padding: 0,
                resize: "none",
                flex: 1,
                color: colorText,
                lineHeight: 1.6
              }}
            />
          </>
        ) : (
          <Flex align="center" justify="center" style={{ height: "100%", color: colorTextSecondary }}>
            Select a note or create a new one
          </Flex>
        )}
      </div>
    </Flex>
  );
}
