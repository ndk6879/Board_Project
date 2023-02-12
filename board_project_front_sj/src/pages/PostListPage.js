/* eslint-disable */

function PostListPage(props) {
    return (
        <div>
            게시글 목록
            {props.contents.map((data, i) => <div key={i}>{data.title}</div>)}
        </div>
    )
}

export default PostListPage;