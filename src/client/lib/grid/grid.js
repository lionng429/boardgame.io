/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HexTile } from '../tile/hex';

export class Grid extends Component {
  static propTypes = {
    //onClick: PropTypes.func
    gridSize: {
      width: PropTypes.number,
      height: PropTypes.number,
    },
    viewBox: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    children: PropTypes.nodes
  }

  static defaultProps = {
    gridSize: { width: 20, height: 24 },
    viewBox: { x: 0, y: 0, width: 800, height: 600 }
  }

  constructor(props) {
    super(props);
  }

  //onClick = () => {
  //  this.props.onClick();
  //}
  //
  //onHover = () => {
  //  this.props.onHover();
  //}

  renderTiles = () => {
    const { width, height } = this.props.gridSize;

    let coordinates = [];

    for (let x = - (width / 2); x < width / 2; x ++) {
      for (let y = - (width / 2); y < height / 2; y ++) {
        let z = - x - y;
        coordinates.push({ x, y, z });
      }
    }

    return coordinates.map(({ x, y, z }) => (
      <HexTile key={`${x}.${y}.${z}`} x={x} y={y} z={z} />
    ));
  }

  render() {
    const { viewBox } =  this.props;

    return (
      <div className="board-grid">
        <svg id="grid" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
          <g transform={`translate(${viewBox.width/2}, ${viewBox.height/2})`}>
            { this.renderTiles() }
          </g>
        </svg>
      </div>
    );
  }
}
