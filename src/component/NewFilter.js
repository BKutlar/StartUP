import React, { useState } from 'react';
import { format} from "date-fns";
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const records = [
    { club: "Lord", total_point: 2000, periode: '01/01/2012', date: "2012" },
    { club: "Name", total_point: 200, periode: '01/01/2015', date: "2015" }
];

// const records = [
//     { club: 'Banane', totalPoint: 2000, period: '2015' },
//     { club: 'Abricot', totalPoint: 6000, period: '2012' },
//     { club: 'OK4', totalPoint: 3000, period: '1985' },
//     { club: 'Ok', totalPoint: 4500, period: '2022' },
//   ];



export default function NewFilter() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ field: 'period', order: 'DESC' })



  

    const filteredRecords = records
        .filter((record) => record.club.toLowerCase().startsWith(search.toLowerCase()))
        .sort((a, b) =>
            (a[filter.field] > b[filter.field])
                ? (filter.order === 'ASC') ? 1 : -1
                : (filter.order === 'ASC') ? -1 : 1
        );

    console.log(filteredRecords);
    return (
        <>
            <div className='App'>

                <div className="search">
                    <br />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                        onChange={(event) => setSearch(event.target.value)}
                        style={{ display: 'flex', flexDirection: 'row', width: '350px', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'stretch' }}
                    />
                    <br />
                    <br />
                    <div className='allButton'>
                        <button style={{ backgroundColor: 'white', cursor:'pointer' }} onClick={() => setFilter({ field: 'club', order: (filter.order === 'ASC') ? 'DESC' : 'ASC' })}> Name <ArrowUpwardIcon /></button>
                        <button style={{ backgroundColor: 'white', cursor:'pointer'}} onClick={() =>  setFilter({ field: 'total_point', order: (filter.order === 'ASC') ? 'DESC' : 'ASC' })}> Point <ArrowUpwardIcon /></button>
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
        </>
    )
}