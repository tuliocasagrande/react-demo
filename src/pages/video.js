import React from 'react';
import CommentBox from '../components/comment-box';

export default class VideoPage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <article className="article article--video">
            <div className="article--video-img">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/zB4I68XVPzQ?rel=0" frameborder="0" allowfullscreen></iframe>
            </div>
          </article>
        </div>

        <CommentBox apiPath="video"/>
      </div>
    )
  }
}
