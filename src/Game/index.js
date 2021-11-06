
import 'react-godot/dist/styles.css';

import React from 'react';
import ReactGodot from 'react-godot';

const examplePck = '/flappy/OghamWeb.pck';
const exampleEngine = '/flappy/OghamWeb.js';

function RenderGame () {
  return <ReactGodot pck={examplePck} script={exampleEngine} />;
}

export default RenderGame;
