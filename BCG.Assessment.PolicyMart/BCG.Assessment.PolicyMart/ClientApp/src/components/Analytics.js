
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardTitle,
    CardHeader,
    CardBody,
    CardFooter,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
    dashboardEmailStatisticsChart,
} from "../../src/variables/charts.js";
import { AnalyticsController } from "../controllers/AnalyticsController.js";

const Analytics = () => {

    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const { dashboardData, getDashboardStats } = AnalyticsController()

    const policyPerMonthStaticData = {
        labels: [],
        datasets: [
            {
                label: "Sales",
                data: [],
                maxBarThickness: 10,
            },
        ],
    };
    const policyRevenueStaticData = {
        labels: [],
        datasets: [
            {
                label: "Performance",
                data: [],
            }
        ],
    };
    const PolicyGenderStaticData = {
        labels: [],
        datasets: [
            {
                label: "Gender",
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ["#4acccd", "#fcc468", "#ef8157"],
                borderWidth: 0,
                data: [],
            },
        ],
    };
    const [policyCountByMonth, setPolicyCountByMonth] = useState(policyPerMonthStaticData);
    const [policyRevenueByMonth, setpolicyRevenueByMonth] = useState(policyRevenueStaticData);
    const [policyGenderRatio, setpolicyGenderRatio] = useState(PolicyGenderStaticData);


    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    useEffect(() => {
        let formattedData = {
            labels: dashboardData && dashboardData.policyCountPerMonth ? Object.keys(dashboardData.policyCountPerMonth) : [],
            datasets: [
                {
                    label: "Sales",
                    data: dashboardData && dashboardData.policyCountPerMonth ? Object.values(dashboardData.policyCountPerMonth): [],
                    maxBarThickness: 10,
                },
            ],
        }
        setPolicyCountByMonth(formattedData)
        formattedData = {
            labels: dashboardData && dashboardData.policyPremiunByMonth ? Object.keys(dashboardData.policyPremiunByMonth) : [],
            datasets: [
                {
                    label: "Sales",
                    data: dashboardData && dashboardData.policyPremiunByMonth ? Object.values(dashboardData.policyPremiunByMonth) : [],
                    maxBarThickness: 10,
                },
            ],
        }
        setpolicyRevenueByMonth(formattedData);
        formattedData = {
            labels: dashboardData && dashboardData.policyOwnedByGender ? Object.keys(dashboardData.policyOwnedByGender) : [],
            datasets: [
                {
                    label: "Gender",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
                    borderWidth: 0,
                    data: dashboardData && dashboardData.policyOwnedByGender ? Object.values(dashboardData.policyOwnedByGender) : [],
                },
            ],
        };
        setpolicyGenderRatio(formattedData)

        
    }, [dashboardData])

    useEffect(() => {
        getDashboardStats()
    }, dashboardData)

    const policyByRegion = dashboardData && dashboardData.policyCountByRegion ? Object.entries(dashboardData?.policyCountByRegion).map(([key, value]) => {
        return (
            <>
                <tr>
                    <th scope="row">{key}</th>
                    <td>{value}</td>
                    <td>
                        <div className="d-flex align-items-center">
                            <span className="mr-2">{((value / 1200)*100).toFixed(2)}%</span>
                            <div>
                                <Progress
                                    max="100"
                                    value={((value / 1200) * 100).toFixed(2) + ""}
                                    barClassName="bg-gradient-success"
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            </>)
    }) : <></>

    const policyByFuelType = dashboardData && dashboardData.policyByFuelType ? Object.entries(dashboardData?.policyByFuelType).map(([key, value]) => {
        return (
            <>
                <tr>
                    <th scope="row">{key}</th>
                    <td>{value}</td>
                    <td>
                        <div className="d-flex align-items-center">
                            <span className="mr-2">{((value / 1200) * 100).toFixed(2)}%</span>
                            <div>
                                <Progress
                                    max="100"
                                    value={((value / 1200) * 100).toFixed(2) + ""}
                                    barClassName="bg-gradient-success"
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            </>)
    }) : <></>


    return (
        <>
            <Container fluid>
            <h1>Analytics</h1>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="8">
                    <Card className="bg-gradient-default shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                        Overview
                    </h6>
                                    <h2 className="text-white mb-0">Policy Premium By Month</h2>
                                </div>
                                <div className="col">
                                    <Nav className="justify-content-end" pills>
                                        <NavItem>
                                            <NavLink
                                                className={classnames("py-2 px-3", {
                                                    active: activeNav === 1,
                                                })}
                                                href="#pablo"
                                                onClick={(e) => toggleNavs(e, 1)}
                                            >
                                                <span className="d-none d-md-block">Month</span>
                                                <span className="d-md-none">M</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames("py-2 px-3", {
                                                    active: activeNav === 2,
                                                })}
                                                data-toggle="tab"
                                                href="#pablo"
                                                onClick={(e) => toggleNavs(e, 2)}
                                            >
                                                <span className="d-none d-md-block">Week</span>
                                                <span className="d-md-none">W</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* Chart */}
                            <div className="chart">
                                <Line
                                        data={policyRevenueByMonth}
                                    options={chartExample1.options}
                                    getDatasetAtEvent={(e) => console.log(e)}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                                        Performance
                    </h6>
                                    <h2 className="mb-0">Total Policies Per Month</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* Chart */}
                            <div className="chart">
                                <Bar
                                        data={policyCountByMonth}
                                        options={chartExample2.options}
                                       
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md="4">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h3">Policy Owner Gender Ratio</CardTitle>
                        </CardHeader>
                        <CardBody style={{ height: "235px" }}>
                            <Pie
                                    data={policyGenderRatio}
                                options={dashboardEmailStatisticsChart.options}
                            />
                        </CardBody>
                    </Card>
                </Col>

                <Col xl="4">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">Policy By Regions</h3>
                                </div>
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Region</th>
                                    <th scope="col">Policy Count</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                    {policyByRegion}
                            </tbody>
                        </Table>
                    </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Policy By Fuel Type</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Fuel Type</th>
                                        <th scope="col">Policy Count</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {policyByFuelType}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                </ Container>
        </>
    );
}

export default Analytics