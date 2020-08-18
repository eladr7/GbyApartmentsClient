import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';

const PostText = ({ head, date, wrapClass, children }) => {
  //   const formatDate =
  //     Number.isNaN(date) === false ? new Date(date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  return (
    <div className="post-card-text">
      <div className="post-title">
        <h3 className="post-header">{head}</h3>
        <span className="post-icon">
          <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }} />
          {/* {formatDate} */}
        </span>
      </div>
      {children}
    </div>
  );
};

export default PostText;
// export default React.memo(PostText);
