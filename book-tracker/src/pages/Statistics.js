import React from "react";
import ConnectedScatterPlot from "../components/stats/ConnectedScatterPlot";

export default function Statistics() {
    const getRandomData = () => {
        const data = [];
        for (let i = 1; i <= 10; i++) {
            data.push({ x: i, y: Math.random() * 30 });
        }
        return data;
    }


    return (
        <div className="flex flex-col w-full">
            <h1 className="mb-6 text-4xl font-bold">Στατιστικά</h1>
            <div className="flex flex-wrap items-center justify-start">
                <ConnectedScatterPlot data={getRandomData()} />
                <ConnectedScatterPlot data={getRandomData()} />
                <ConnectedScatterPlot data={getRandomData()} />
                <ConnectedScatterPlot data={getRandomData()} />
            </div>
        </div>
    );
}
