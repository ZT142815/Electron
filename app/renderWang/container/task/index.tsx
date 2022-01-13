import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Layout, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TaskTable from './components/taskTable';
import AddTaskModal from './components/addTaskModal';
import StatisModule from './components/statisModule';
import { getTaskModel, deleteTaskModel, editTaskModel } from '@common/customhooks/getUserData';
import './index.less';
const { confirm } = Modal;
const { Header, Content } = Layout;

const Task = (props: any) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  useEffect(() => {
    getTaskModel().then((res: any) => {
      setData(res);
    });
  }, []);

  const returnHome = () => {
    props.history.goBack();
  };

  const createTask = () => {
    setIsShowAddModal(true);
  };

  const deleteTask = (key: string) => {
    confirm({
      title: '小汪汪,你确定要删除这条任务么？',
      icon: <ExclamationCircleOutlined />,
      content: '删除了就找不到了哦！！！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteTaskModel(key).then((res: boolean) => {
          if (res) {
            getTaskModel().then((data: any) => {
              setData(data);
            });
          }
        });
      },
    });
  };

  const changeStatus = (e: any, record: any) => {
    let newRecord = record;
    newRecord['status'] = e.target.value;
    editTaskModel(record.key, newRecord).then((res: boolean) => {
      if(res) {
        getTaskModel().then((data: any) => {
          setData(data);
        });
      }
    });
  };

  const changeGetMoney = (e: any, record: any) => {
    let newRecord = record;
    newRecord['getMoney'] = e.target.value;
    editTaskModel(record.key, newRecord).then((res: boolean) => {
      if(res) {
        getTaskModel().then((data: any) => {
          setData(data);
        });
      }
    });
  };

  const selectTask = (select:{}) => {
    getTaskModel(select).then((res: any) => {
      setData(res);
    });
  }

  return (
    <Layout>
      <Header>
        <div>
          <Button onClick={returnHome} shape="round">
            返回
          </Button>
        </div>
      </Header>
      <Content>
        <div className="task-body">
          <StatisModule createTask={createTask} data={data} selectTask={selectTask} />
          <TaskTable
            data={data}
            deleteTask={deleteTask}
            changeStatus={changeStatus}
            setEditData={setEditData}
            setIsShowAddModal={setIsShowAddModal}
            changeGetMoney={changeGetMoney}
          />
        </div>
      </Content>
      <AddTaskModal
        isShowAddModal={isShowAddModal}
        setIsShowAddModal={setIsShowAddModal}
        setData={setData}
        editData={editData}
        setEditData={setEditData}
      />
    </Layout>
  );
};

export default withRouter(Task);
