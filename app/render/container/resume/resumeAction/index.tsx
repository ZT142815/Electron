import * as React from 'react';
import './index.less';
import MyButton from '../../../common/components/MyButton';

const ResumeAction = () => {
    return(
        <div className='actions'>
            <div className='back'>返回</div>
            <MyButton size='middle' className='export-btn'>导出pdf</MyButton>
        </div>
    )
}

export default ResumeAction;