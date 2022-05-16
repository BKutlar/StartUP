import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { format, parse } from "date-fns";
import clsx from 'classnames';
import "./styles.css";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const records = [
    { club: "Lord", total_point: 2000, periode: '01/01/2012', date: "2012" },
    { club: "Name", total_point: 200, periode: '01/01/2015', date: "2015" }
];

export default function NewFilter() {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className='App'>

                <div className="search">
                    <br/>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                        onChange={(event) => setSearch(event.target.value)}
                        style={{display: 'flex', flexDirection: 'row', width: '350px', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'stretch'}}
                    />
                    <br/>
                    <br/>
                    <div className='allButton'>
                        <button style={{backgroundColor: 'white' }}> Name <ArrowUpwardIcon /></button>
                        <button style={{backgroundColor: 'white' }}> Point <ArrowUpwardIcon/></button>
                    </div>

                    
                

                </div>



                <div style={{ display: "flex", margin: "1rem 0" }}>
                    <div name='club' />
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
                        {records.map((row, index) => {
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
        </>
    )
}