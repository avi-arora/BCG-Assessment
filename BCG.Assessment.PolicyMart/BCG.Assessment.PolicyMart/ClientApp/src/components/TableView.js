
import React, { useEffect, useState } from 'react';
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownToggle,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    DropdownItem,
    Table,
    UncontrolledDropdown,
    Row,
    UncontrolledTooltip,
    Modal,
    Col,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import {searchPolicy } from '../Store/Redux/PolicyActions'
import { PolicyController } from '../controllers/PolicyControlller'
import AsyncSelect from 'react-select/async';
import { useDispatch } from 'react-redux';
var DatePicker = require("reactstrap-date-picker");

const TableView = () => {

    let { policiesPaginated, getPoliciesPaginated, removePolicy,
        getMetadata, formMetadata, search } = PolicyController()
    let [isModalOpen, toogleModalState] = useState(false);

    const dispatch = useDispatch();
    /*
     * Control form fields
     * */
    let [policyId, setPolicyId] = useState();
    let [customerId, setCustomerId] = useState();
    let [dop, setDop] = useState();
    let [dopFormatted, setDopFormatted] = useState();
    let [gender, setGender] = useState();
    let [martialStatus, setMartialStatus] = useState();
    let [region, setRegion] = useState();
    let [fuelType, setFuelType] = useState();
    let [vehicleSegment, setVehicleSegment] = useState();
    let [premium, setPremium] = useState();
    let [incomeGroup, setIncomeGroup] = useState();
    let [comprehensive, setComprehensive] = useState();
    let [bil, setBil] = useState()
    let [pip, setPip] = useState()
    let [pdl, setPdl] = useState()

    useEffect(() => {
        getPoliciesPaginated({ currentPage: 1, pageSize: 10 })
        getMetadata()
    }, []);

    const edit = (obj) => {
        console.log(obj);
        toogleModalState(true);
        setPolicyId(obj.id);
        setCustomerId(obj.customerId);
        setDop(obj.dop);
        setGender(obj.gender);
        setRegion(obj.customerRegion);
        setFuelType(obj.fuel)
        setMartialStatus(obj.martialStatus);
        setVehicleSegment(obj.segment);
        setPremium(obj.premium);
        setIncomeGroup(obj.incomeGroup);
        setComprehensive(obj.isComprehensive);
        setBil(obj.bodilyInjuryLiability);
        setPip(obj.personalInjuryProtection);
        setPdl(obj.propertyDamageLiability);

    }

    const add = () => {
        toogleModalState(true);
        setPolicyId("");
        setCustomerId("");
        setDop(new Date().toISOString());
        setGender("");
        setRegion("");
        setFuelType("")
        setMartialStatus("");
        setVehicleSegment("");
        setPremium("")
        setIncomeGroup("");
        setComprehensive("");
        setBil("");
        setPip("");
        setPdl("");
    }

    const setDate = (date, formatted) => {
        setDopFormatted(formatted);
        setDop(date);
    }

    const updatePolicy = () => {

    }

    const addPolicy = () => {

    }

    /*
     * Search methods
     * */

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const filterColors = (inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (
        inputValue,
        callback
    ) => {
        dispatch(searchPolicy(inputValue))
        setTimeout(() => {
            callback(filterColors(inputValue));
        }, 1000);
    };


    const tableData = policiesPaginated?.data?.map((i) => {
        return (
            <>
                <tr key={i.id}>
                    <td className="text-center nopadding">{i.id}</td>
                    <td className="text-center nopadding">{(new Date(i.dop)).toDateString()}</td>
                    <td className="text-center nopadding">{i.customerId}</td>
                    <td className="text-center nopadding">{i.gender}</td>
                    <td className="text-center nopadding">{i.incomeGroup}</td>
                    <td className="text-center nopadding">{i.customerRegion}</td>
                    <td className="text-center nopadding">{i.martialStatus}</td>
                    <td className="text-center nopadding">{i.fuel}</td>
                    <td className="text-center nopadding"><strong>${i.premium}</strong></td>
                    <td className="text-center nopadding">{i.segment}</td>
                    <td className="text-center nopadding">{i.isComprehensive ? <Badge color="success" pill>YES</Badge> : <Badge color="danger" pill>NO</Badge>}</td>
                    <td className="text-center nopadding">{i.bodilyInjuryLiability ? <Badge color="success" pill>YES</Badge> : <Badge color="danger" pill>NO</Badge>}</td>
                    <td className="text-center nopadding">{i.personalInjuryProtection ? <Badge color="success" pill>YES</Badge> : <Badge color="danger" pill>NO</Badge>}</td>
                    <td className="text-center nopadding">{i.propertyDamageLiability ? <Badge color="success" pill>YES</Badge> : <Badge color="danger" pill>NO</Badge>}</td>
                    <td className="text-right ">
                        <UncontrolledDropdown>
                            <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                            >
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={() => edit(i)}
                                >
                                    Edit
                          </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={() => removePolicy(i.id)}
                                >
                                    Delete
                          </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr></>
        )
    })

    const genderOptions = formMetadata && formMetadata.genderList ? Object.entries(formMetadata.genderList).map(([key, value]) => {
        return (<>
            <option value={value}>{value}</option>
        </>)
    }) : <></>

    const regionOptions = formMetadata && formMetadata.regionList ? Object.entries(formMetadata.regionList).map(([key, value]) => {
        return (<>
            <option value={value}>{value}</option>
        </>)
    }) : <></>

    const martialOptions = formMetadata && formMetadata.martialStatusList ? Object.entries(formMetadata.martialStatusList).map(([key, value]) => {
        return (<>
            <option value={value}>{value}</option>
        </>)
    }) : <></>

    const fuelOptions = formMetadata && formMetadata.fuelTypeList ? Object.entries(formMetadata.fuelTypeList).map(([key, value]) => {
        return (<>
            <option value={value}>{value}</option>
        </>)
    }) : <></>

    const segmentOptions = formMetadata && formMetadata.segmentList ? Object.entries(formMetadata.segmentList).map(([key, value]) => {
        return (<>
            <option value={value}>{value}</option>
        </>)
    }) : <></>

    const incomeGroupsOptions = formMetadata && formMetadata.incomeGroups ? formMetadata.incomeGroups.map((i) => {
        return (
            <>
                <option value={i}>{i}</option>
            </>)
    }) : <></>

    return (
        <>
            <Modal
                className="modal-dialog-centered"
                isOpen={isModalOpen}
                toggle={() => toogleModalState(!isModalOpen)}
                size="xl"
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Policy
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toogleModalState(!isModalOpen)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col md="4">
                            <Label for="policyNumber">Policy Number</Label>
                            <FormGroup>
                                <Input disabled placeholder="Regular" type="text" value={policyId} />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <Label for="customerId">Customer Id</Label>
                            <FormGroup>
                                <Input disabled placeholder="Regular" type="text" value={customerId} />
                            </FormGroup>
                        </Col>
                        {policyId != "" ? <Col md="4">
                            <Label for="dop">Date of purchase</Label>
                            <FormGroup>
                                <Input disabled placeholder="Regular" type="text" value={(new Date(dop)).toDateString()} />
                            </FormGroup>
                        </Col> :
                            <Col md="4">
                                <Label for="dop">Date of purchase</Label>
                                <FormGroup>
                                    <DatePicker id="example-datepicker"
                                        value={dop}
                                        onChange={(v, f) => setDate(v, f)} />
                                </FormGroup>
                            </Col>
                        }

                    </Row>
                    <Row>
                        <Col md="4">
                            <Label for="gender">Gender</Label>
                            <Input
                                id="gender"
                                name="select"
                                type="select"
                                value={gender}
                                onSelect={(e) => setGender(e.target.value)}
                            >
                                {genderOptions}
                            </Input>
                        </Col>
                        <Col md="4">
                            <Label for="exampleSelect">Region</Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={region}
                                onSelect={(e) => setRegion(e.target.value)}
                            >
                                {regionOptions}
                            </Input>
                        </Col>
                        <Col md="4">
                            <Label for="exampleSelect">Martial Status</Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={martialStatus}
                                onSelect={(e) => setMartialStatus(e.target.value)}
                            >
                                {martialOptions}
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Label for="incomeGroup">Income Group</Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={incomeGroup}
                                onSelect={(e) => setIncomeGroup(e.target.value)}
                            >
                                {incomeGroupsOptions}
                            </Input>
                        </Col>
                        <Col md="6">
                            <Label for="premium">Premium</Label>
                            <FormGroup>
                                <Input
                                    id="exampleFormControlInput1"
                                    placeholder="Premium"
                                    type="number"
                                    value={premium}
                                    min={0}
                                    max={1000000}
                                    onChange={(e) => setPremium(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Label for="exampleSelect">Fuel Type</Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={fuelType}
                                onSelect={(e) => setFuelType(e.target.value)}
                            >
                                {fuelOptions}
                            </Input>
                        </Col>
                        <Col md="6">
                            <Label for="exampleSelect">Vehicle Segment</Label>
                            <Input
                                id="Segment"
                                name="select"
                                type="select"
                                value={vehicleSegment}
                                onSelect={(e) => setVehicleSegment(e.target.value)}
                            >
                                {segmentOptions}
                            </Input>
                        </Col>
                    </Row>
                    <Row className="p-5 mt-2">
                        <Col md="3">
                            <FormGroup check>
                                <Input type="checkbox" onChange={(e) => setComprehensive(e.target.checked)} checked={comprehensive} />
                                {' '}
                                <Label check>Comprehensive</Label>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup check>
                                <Input type="checkbox" onChange={(e) => setBil(e.target.checked)} checked={bil} />
                                {' '}
                                <Label check>BIL</Label>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup check>
                                <Input type="checkbox" onChange={(e) => setPip(e.target.checked)} checked={pip} />
                                {' '}
                                <Label check>PIP</Label>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup check>
                                <Input type="checkbox" onChange={(e) => setPdl(e.target.checked)} checked={pdl} />
                                {' '}
                                <Label check>PDL</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toogleModalState(!isModalOpen)}
                    >
                        Close
            </Button>
                    <Button color="primary" type="button">
                        Save changes
            </Button>
                </div>
            </Modal>
            <Row className="mb-5">
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h2 className="mb-0 text-center">Policies</h2>
                            <Row className="justify-content-center align-items-center">
                                <Col md="12" >
                                    <AsyncSelect
                                        className="mt-3"
                                        placeholder="Search Policies By Policy Number Or Customer Id"
                                            cacheOptions
                                            loadOptions={loadOptions}
                                            defaultOptions
                                            onInputChange={(i) => { console.log(i) }}
                                        />
                                    <Button onClick={() => add()} color="primary" outline type="button" size="sm" className="mx-auto d-block mt-4">Add Policy</Button>
                                </Col>
                            </Row>
                           
                           
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="nopadding">Policy Number</th>
                                    <th scope="col" className="nopadding">Date of purchase</th>
                                    <th scope="col" className="nopadding">CustomerId</th>
                                    <th scope="col" className="nopadding">Gender</th>
                                    <th scope="col" className="nopadding">Income Group</th>
                                    <th scope="col" className="nopadding">Region</th>
                                    <th scope="col" className="nopadding">Martial Status</th>
                                    <th scope="col" className="nopadding">Fuel Type</th>
                                    <th scope="col" className="nopadding">Premium</th>
                                    <th scope="col" className="nopadding">Vehicle Segment</th>
                                    <th scope="col" className="nopadding">Comprehensive</th>
                                    <th scope="col" id="bil" className="nopadding">BIL</th><UncontrolledTooltip
                                        delay={0}
                                        placement="top"
                                        target="bil"
                                    >
                                        Bodily Injury Liability
        </UncontrolledTooltip>
                                    <th scope="col" className="nopadding">PIP</th>
                                    <th scope="col" className="nopadding">PDL</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </Table>
                        <CardFooter className="py-4">
                            <nav aria-label="...">
                                <Pagination
                                    className="pagination justify-content-end mb-0"
                                    listClassName="justify-content-end mb-0"
                                >
                                    <PaginationItem className="disabled">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            tabIndex="-1"
                                        >
                                            <i className="fas fa-angle-left" />
                                            <span className="sr-only">Previous</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem className="active">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            1
                      </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            2 <span className="sr-only">(current)</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            3
                      </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fas fa-angle-right" />
                                            <span className="sr-only">Next</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </nav>
                        </CardFooter>
                    </Card>
                </div>
            </Row>
        </>
    );
}

export default TableView;