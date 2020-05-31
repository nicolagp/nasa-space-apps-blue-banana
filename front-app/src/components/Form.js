import React, { useState } from "react";
import { Input } from 'antd';
import { Select } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Search } = Input;

const Form = ({ handleSubmit, history }) => {
  const [searchEntry, setSearchEntry] = useState("");
  // update search text state
  const updateSearchInput = e => {
    setSearchEntry(e.target.value);
  };

  const [locationEntry, setLocationEntry] = useState("");
  // update location state
  const updateLocationInput = e => {
    console.log(e);
    setLocationEntry(e);
  };

  return (
    <form
      className="search-form"
      onSubmit={e => handleSubmit(e, history, searchEntry, locationEntry)}
    >
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={updateSearchInput}
        value={searchEntry}
      />

      <Select defaultValue="Location" onChange={updateLocationInput}>
        <Option value="WW" >Worldwide</Option>
        <Option value="BR">Brasil</Option>
        <Option value="US">United States</Option>
        <Option value="CN">China</Option>
      </Select>

      <button
        type="submit"
      >
        <svg height="32" width="32">
          <path
            d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
            fill="#ffffff"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default Form;
