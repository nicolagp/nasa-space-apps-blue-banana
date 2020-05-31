import React, { useState } from "react";
import { Input } from 'antd';
import { Select } from 'antd';
import { Form } from 'antd';
const { Option } = Select;
const { Search } = Input;

const NewForm = ({ handleSubmit, history }) => {

    const [searchEntry, setSearchEntry] = useState("");
    // update search text state
    const updateSearchInput = e => {
        setSearchEntry(e.target.value);
    };

    const [locationEntry, setLocationEntry] = useState("");
    // update location state
    const updateLocationInput = e => {
        setLocationEntry(e.target.value);
    };


    return (
        <Form
            className="search-form"
            onSubmit={e => handleSubmit(e, history, searchEntry, locationEntry)}
        >
            <Search type="text"
                name="search"
                placeholder="Search..."
                onChange={updateSearchInput}
                value={searchEntry}
            />

            <Select defaultValue="" onChange={e => updateLocationInput}>
                <Option value="">Worldwide</Option>
                <Option value="BR">Brasil</Option>
                <Option value="US">United States</Option>
                <Option value="CN">China</Option>
            </Select>

        </Form >
    );
};

export default NewForm;
