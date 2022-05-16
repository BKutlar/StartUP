import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { format, parse } from "date-fns";
import clsx from "classnames";
import "./styles.css";
import { Select } from "react-select";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from "@mui/icons-material/Sort";
import TextField from "@mui/material/TextField";


const records = [
    { club: "Lord", total_point: 2000, periode: "01/01/2012", date: "2012" },
    { club: "Name", total_point: 200, periode: "01/01/2015", date: "2015" }
    // { date: ["2012", "2015"] }
];

const SORT_ASCENDING = "asc";
const SORT_DESCENDING = "desc";

const sort = (order = "asc", field) => (a, b) => {
    if (a[field] === b[field]) return 0;

    var typeOfField = typeof a[field];

    const result =
        typeOfField === "number"
            ? sortNumber(a, b, field)
            : typeOfField === "string"
                ? sortString(a, b, field)
                : a[field] instanceof Date
                    ? sortDate(a, b, field)
                    : null;

    // console.log(a[field], b[field], result, ~result);

    return order === SORT_ASCENDING ? +result : -result;
};

function sortDate(a, b, field) {
    const l = field ? a[field] : a;
    const r = field ? b[field] : b;

    if (!l) return 1;
    else if (!r) return -1;

    const lx = l.getTime();
    const rx = r.getTime();

    return lx < rx ? -1 : lx > rx ? 1 : 0;
}

function sortNumber(a, b, field) {
    const l = field ? a[field] : a;
    const r = field ? b[field] : b;

    if (!l) return 1;
    else if (!r) return -1;

    return l - r;
}

function sortString(a, b, field) {
    const l = field ? a[field] : a;
    const r = field ? b[field] : b;

    if (!l) return 1;
    else if (!r) return -1;

    return l < r ? -1 : l > r ? 1 : 0;
}

function getNextSortOrder(order) {
    return order === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING;
}

function upperCase(text) {
    return text[0].toUpperCase() + text.substring(1);
}

function usePrevious(value) {
    const ref = useRef();
    useLayoutEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default function App() {
    const [sortedData, setSortedData] = useState([]);
    const [sortOrder, setSortOrder] = useState(SORT_ASCENDING);
    const [sortField, setSortField] = useState({
        curr: "club",
        prev: "club"
    });

    const test = usePrevious(sortField);
    console.log("Previous", test);

    useEffect(() => {
        const normalized = records
            .slice()
            .map((row) => ({
                ...row,
                date: row.periode
                    ? parse(row.periode, "MM/dd/yyyy", new Date("1970-01-01"))
                    : null
            }))
            .sort(sort(SORT_ASCENDING, "club"));

        setSortedData(normalized);
    }, []);

    const handleSort = (field) => () => {
        // Reset sort order when to ASC when user switches field
        const order =
            field === sortField.curr || sortField.curr === sortField.prev
                ? getNextSortOrder(sortOrder)
                : SORT_ASCENDING;
        const data = sortedData.slice().sort(sort(order, field));

        setSortedData(data);
        setSortOrder(order);
        setSortField((state) => ({
            curr: field,
            prev: state.curr
        }));
    };

    const Button = ({ name }) => {
        const nextOrder = getNextSortOrder(sortOrder);
        const order = sortField.curr === name ? nextOrder : "asc";
        return (
            <>
                <SortByAlphaIcon
                    data-state={order}
                    className={clsx("btn", {
                        "btn-asc": order === SORT_ASCENDING,
                        "btn-desc": order === SORT_DESCENDING
                    })}
                    onClick={handleSort(name)}
                >
                    Sort By <strong>"{name}"</strong> {upperCase(order)}
                </SortByAlphaIcon>
            </>
        );
    };

    const TotalButton = ({ point }) => {
        const next = getNextSortOrder(sortOrder);
        const order = sortField.curr === point ? next : "asc";
        return (
            <>
                <SortIcon
                    data-state={order}
                    className={clsx("totalbutton", {
                        "btn-asc": order === SORT_ASCENDING,
                        "btn-desc": order === SORT_DESCENDING
                    })}
                    onClick={handleSort(point)}
                >
                    <strong>"{point}"</strong> {upperCase(order)}
                </SortIcon>
            </>
        );
    };

    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const filterSearch = records.filter((record) => record.club.startsWith(search));
    const filteredRecords = filterSearch.filter((record) => {
        return filter === "" || record.date === filter;
    });
 
    console.log(filterSearch, filteredRecords);
    return (
        <div className="App">
            <h1>
                {/* Count of records: {sortedData.length} <br />{" "} */}
                <pre
                // style={{
                //   fontSize: ".5em",
                //   padding: 8,
                //   background: "#eee",
                //   color: "#333",
                //   fontWeight: 200
                // }}
                >
                    {/* Sorted by field <strong>"{sortField.curr}"</strong>, previous field{" "}
          <strong>"{sortField.prev}"</strong> */}
                </pre>
            </h1>
            <div style={{ display: "flex", margin: "1em 0" }}>
                <Button name="club" />
                <TotalButton point="total_point" />
                {/* <Button name="total_point" /> */}
                {/* <Button name="periode" /> */}

                {/* <select
          className="btn"
          onChange={(event) => setFilter(event.target.value)}
          defaultValue={("2012", "2015")}
        >
          <option value="">All</option>
          <option value="2012">2012</option>
          <option value="2015">2015</option>
        // </select> */}
                {/* trier par la periode */}

                {/* <Filter /> */}
            </div>
            <div className="search">

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                    onChange={(event) => setSearch(event.target.value)}
                />


            </div>
            <table>
                <thead>
                    <tr>
                        <th>Club</th>
                        <th>TP</th>
                        <th>Periode</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {(filter === "" ? sortedData : filteredRecords).map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.club || "--"}</td>
                                <td>{row.total_point || "--"}</td>
                                {/* <td>{row.date ? row.date.toString() : '--'}</td> 
                                <td>
                                    {row.periode ? format(new Date(row.periode), "yyyy") : "--"}
                                </td>
                            </tr>
                        );
                    })} */}
                </tbody>
                <tbody>
                    {filteredRecords.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.club || "--"}</td>
                                <td>{row.total_point || "--"}</td>
                                {/* <td>{row.date ? row.date.toString() : '--'}</td> */}
                                <td>
                                    {row.periode ? format(new Date(row.periode), "yyyy") : "--"}

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
