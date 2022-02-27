
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
    Container
} from "reactstrap";

import TableView from '../../src/components/TableView';
import Analytics from '../../src/components/Analytics';


const Home = () => {
   
    return (
        <> 
            <Container fluid>
                <h1>Master Data</h1>
                <TableView />
            </Container>
            
        </>
    );
};

export default Home;
