import React from 'react';

const Like = (props) => {
	let classes = 'fa fa-heart';
	if (!props.isLiked) classes += '-o';
	return (
		<i
			className={classes}
			style={{ cursor: 'pointer' }}
			aria-hidden='true'
			onClick={props.onLike}
		/>
	);
};

export default Like;
