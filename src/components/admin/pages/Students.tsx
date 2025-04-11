import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  is_verified: boolean;
  focus: string[];
  health_concerns: string[];
  session_type: string[];
  created_at: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/students`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      message.error('Failed to fetch students');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (err) {
      message.error('Failed to delete student');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const url = editingStudent 
        ? `${import.meta.env.VITE_BACKEND_API_URL}/admin/students/${editingStudent.id}`
        : `${import.meta.env.VITE_BACKEND_API_URL}/admin/students`;
      
      const response = await fetch(url, {
        method: editingStudent ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to save student');
      }

      message.success(editingStudent ? 'Student updated successfully' : 'Student added successfully');
      setIsModalVisible(false);
      fetchStudents();
    } catch (err) {
      message.error('Failed to save student');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'name',
      render: (text: string, record: Student) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Focus',
      dataIndex: 'focus',
      key: 'focus',
    },
    {
      title: 'Health Concerns',
      dataIndex: 'health_concerns',
      key: 'health_concerns',
    },
    {
      title: 'Session Type',
      dataIndex: 'session_type',
      key: 'session_type',
    },
    {
      title: 'Status',
      dataIndex: 'is_verified',
      key: 'is_verified',
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? 'green' : 'red'}>
          {isVerified ? 'Verified' : 'Not Verified'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Student) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={students}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        bodyStyle={{ padding: '24px' }}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ size: 'large', style: { padding: '0 24px' } }}
        cancelButtonProps={{ size: 'large' }}
      >
        <Form
          form={form}
          layout="vertical"
          className="student-form"
        >
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please input first name!' }]}
              className="mb-4"
            >
              <Input size="large" placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please input last name!' }]}
              className="mb-4"
            >
              <Input size="large" placeholder="Enter last name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
              className="mb-4"
            >
              <Input size="large" placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input phone number!' }]}
              className="mb-4"
            >
              <Input size="large" placeholder="Enter phone number" />
            </Form.Item>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                name="focus"
                label="Focus Areas"
                rules={[{ required: true, message: 'Please select focus areas!' }]}
                className="mb-4"
              >
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Select focus areas"
                  style={{ width: '100%' }}
                  maxTagCount="responsive"
                >
                  <Option value="sleep">Sleep</Option>
                  <Option value="core">Core</Option>
                  <Option value="strength">Strength</Option>
                  <Option value="flexibility">Flexibility</Option>
                  <Option value="calm">Calm</Option>
                  <Option value="workouts">Workouts</Option>
                  <Option value="basics">The Basics</Option>
                  <Option value="prenatal">Prenatal</Option>
                  <Option value="postnatal">Postnatal</Option>
                  <Option value="back">Back Care</Option>
                  <Option value="energy">Energy</Option>
                  <Option value="women">Women's Health</Option>
                  <Option value="emotional">Emotional Health</Option>
                  <Option value="physical">Physical Health</Option>
                  <Option value="focus">Focus</Option>
                  <Option value="family">Family</Option>
                  <Option value="travel">Travel</Option>
                  <Option value="advanced">Advanced</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="health_concerns"
                label="Health Concerns"
                className="mb-4"
              >
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Select health concerns"
                  style={{ width: '100%' }}
                  maxTagCount="responsive"
                >
                  <Option value="PCOS/PCOD">PCOS/PCOD</Option>
                  <Option value="Anxiety/Depression">Anxiety/Depression</Option>
                  <Option value="Back pain or joint issues">Back pain or joint issues</Option>
                  <Option value="Weight Management">Weight Management</Option>
                  <Option value="Sleep issues/insomnia">Sleep issues/insomnia</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="session_type"
                label="Session Type"
                rules={[{ required: true, message: 'Please select session type!' }]}
                className="mb-4"
              >
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Select session types"
                  style={{ width: '100%' }}
                >
                  <Option value="Personalized Session">Personalized Session</Option>
                  <Option value="Group Classes">Group Classes</Option>
                  <Option value="Either">Either</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="is_verified"
                label="Verification Status"
                className="mb-4"
              >
                <Select
                  size="large"
                  placeholder="Select verification status"
                  style={{ width: '100%' }}
                >
                  <Option value="1">Verified</Option>
                  <Option value="0">Not Verified</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Students; 