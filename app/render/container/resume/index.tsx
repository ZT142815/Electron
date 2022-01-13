import * as React from 'react';
import fileAction from '../../common/utils/file';
import { getAppPath } from '../../common/utils/appPath';
import MyButton from '../../common/components/myButton';

const Resume = () => {
  getAppPath().then((rootPath: string) => {
    fileAction?.write(
      `${rootPath}app/render/container/resume/global.config.json`,
      { name: '全局配置表', resumeSavePath: '' },
      'utf8'
    );
    fileAction.read(`${rootPath}app/render/container/resume/index.tsx`).then((data) => {
    });
  });
  return <div style={{ width: '100%', height: '100%', backgroundColor: '#27292c' }}></div>;
};

export default Resume;
