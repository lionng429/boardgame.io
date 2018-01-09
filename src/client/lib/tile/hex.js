/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

export class HexTile extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 15,
  }

  constructor(props) {
    super(props);
  }

  get width() {
    const { size } = this.props;
    return size * 2;
  }

  get height() {
    return (Math.sqrt(3) / 2 * this.width).toFixed(3);
  }

  get translate() {
    const { x, z } = this.props;
    return `translate(${x * this.height * 2 + z * this.height}, ${z * this.width * 1.5})`;
  }

  get points() {
    const width = this.width;
    const height = this.height;
    const points = [
      `${width},0.000`,
      `${width / 2},${height}`,
      `-${width / 2},${height}`,
      `-${width},0.000`,
      `-${width / 2},-${height}`,
      `${width / 2},-${height}`,
    ];

    return points.join(' ');
  }

  render() {
    const { x, y, z } = this.props;

    return (
      <g className="tile tile--hex" transform={this.translate}>
        <polygon
          points={this.points}
          transform="rotate(-30)"
        />
        <text>
          <tspan>{ x }, { y }, { z }</tspan>
        </text>
      </g>
    );
  }
}
