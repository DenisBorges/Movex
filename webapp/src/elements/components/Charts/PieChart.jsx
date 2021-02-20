import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';

export default function (props) {
debugger;
    return <PieChart
        data={[...props.data]}
    />;
}