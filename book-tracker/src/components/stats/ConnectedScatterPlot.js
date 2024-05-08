import * as d3 from "d3"; // we will need d3.js

import React from "react";

const ConnectedScatterplot = ({ data }) => {

    const width = 200;
    const height = 200;

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)]) // Set domain from min to max of x values
        .range([0, width]); // Output range is from 0 to the width of the SVG

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)]) // Set domain from min to max of y values
        .range([height, 0]); // Output range from height to 0 (SVG's y-axis is inverted)


    const lineBuilder = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

    const linePath = lineBuilder(data);
    // read the data
    // build the scales and axes
    // build the lines and circles

    return (
        <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl flex items-center">
            <svg width={width} height={height}>
                <path
                    d={linePath}
                    stroke="#9a6fb0"
                    fill="none"
                    strokeWidth={2}
                />
            </svg>
            <div className="card-body">
                <h2 className="card-title">Work in progress</h2>
                <p>...</p>

            </div>
        </div>
    );
};

export default ConnectedScatterplot;