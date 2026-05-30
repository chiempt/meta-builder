import React, { useState, useEffect } from "react";
import { Calendar, Badge, Modal, Form, Input, Select, message } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { calendarApi, CalendarEvent } from "../../lib/api/calendarApi";

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await calendarApi.getEvents();
      setEvents(data);
    } catch (error) {
      message.error("Failed to load events");
    }
  };

  const handleSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!selectedDate) return;

      await calendarApi.createEvent({
        title: values.title,
        type: values.type,
        dateStr: selectedDate.format("YYYY-MM-DD")
      });

      message.success("Event added!");
      setIsModalOpen(false);
      loadEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const listData = events.filter(e => e.dateStr === dateStr);

    return (
      <ul style={{ margin: 0, padding: 0, listStyle: "none", height: "100%", width: "100%" }} onClick={() => handleSelect(value)}>
        {listData.map((item) => (
          <li key={item.id} style={{ marginBottom: 2 }}>
            <Badge status={item.type as any} text={<span style={{ fontSize: 11, color: "#d4d4d4" }}>{item.title}</span>} />
          </li>
        ))}
        {listData.length === 0 && <div style={{ height: 20 }} />} {/* Clickable empty space */}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: { type: string }) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ padding: 24, background: "#1f1f1f", borderRadius: 8, border: "1px solid #333" }}>
        <div style={{ marginBottom: 16, color: "#888", fontSize: 14 }}>
          <i>Tip: Double click or tap on any date cell to add a new event.</i>
        </div>
        <Calendar 
          cellRender={cellRender} 
          onSelect={handleSelect}
        />
      </div>

      <Modal 
        title={`Add Event for ${selectedDate?.format("MMM DD, YYYY")}`}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
        okText="Add Event"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item name="title" label="Event Title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input placeholder="E.g., Team Meeting" />
          </Form.Item>
          <Form.Item name="type" label="Event Type" initialValue="warning">
            <Select>
              <Select.Option value="success">Success (Green)</Select.Option>
              <Select.Option value="warning">Warning (Orange)</Select.Option>
              <Select.Option value="error">Error (Red)</Select.Option>
              <Select.Option value="default">Default (Gray)</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
