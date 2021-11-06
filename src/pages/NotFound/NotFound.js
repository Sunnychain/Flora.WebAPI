import React from 'react';
import { Link } from 'react-router-dom';
import './notfoun.scss';
export default function NotFound () {
  return (
<div class="code-area">
  <span style="color: #777;font-style:italic;">
    // 404 page not found.
  </span>
  <span>
    <span style="color:#d65562;">
      if
    </span>
	  (<span style="color:#4ca8ef;">!</span><span style="font-style: italic;color:#bdbdbd;">found</span>)
    {
  </span>
  <span>
    <span style="padding-left: 15px;color:#2796ec">
       <i style="width: 10px;display:inline-block"></i>throw
    </span>
    <span>
      (<span style="color: #a6a61f">"(╯°□°)╯︵ ┻━┻"</span>);
    </span>
	  <span style="display:block">}</span>
	  <span style="color: #777;font-style:italic;">
		  // <a href="/">Go home!</a>
	  </span>
  </span>
</div>
  );
}
