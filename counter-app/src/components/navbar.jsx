import React from 'react';

const Nav = (props) => {
	return <nav className='navbar navbar-light bg-light'>
		<span className="badge badge-pill badge-secondary">
          {props.count}
        </span>
	</nav>;
};

export default Nav;
