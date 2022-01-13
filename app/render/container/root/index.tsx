import * as React from 'react';
import { shell } from 'electron';

import { withRouter } from 'react-router';
import './index.less';
// import Logo from '../../../../assets/logo.png';
import { useSelector } from 'react-redux';


const Root = (props: any) => {
  const appName = useSelector((state: any) => state.globalModel.appName);
  const handleClick = (text:string) => {
      if(text==='简历') {
        props.history.push('/resume');
      } else if (text==='百度') {
        shell.openExternal('https://www.baidu.com');
      }
  };
  return (
    <div className="root">
      <div className="container">
        {/* <img src={Logo} alt="" />  */}
        <div className="name">VisResumeMook</div>
        <div className="desc">一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div className="action">
          {['介绍', '简历', '模板', '源码', '百度'].map((text, index) => {
            return (
              <div onClick={()=>handleClick(text)} key={index} className="item">
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Root);
