import React from 'react';
import CommentBox from '../components/comment-box';

export default class PicturePage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <article className="article article--picture">
            <div className="article--picture-img">
              <img src="assets/images/DeathStar.png" />
            </div>
          </article>
        </div>

        <CommentBox apiPath="picture" />
      </div>
    )
  }
}
