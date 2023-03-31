import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import debounce from "lodash.debounce";
import axios from "axios";

const ITEMS_API_URL = "https://cwbarry.pythonanywhere.com/product/";
const DEBOUNCE_DELAY = 500;

export default function Autocomplete() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const searchURL = ITEMS_API_URL + "?search=";

  const debounceAttempt = async (userQuery) => {
    try {
      const response = await axios.get(userQuery);
      console.log(response);
      const data = response.data;
      setData(data)
      return data
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="container pt-5 mt-5">
      <div className="row justify-content-md-center m-3">
        <h1>Auto Complete</h1>
      </div>
      <div className="row justify-content-md-center m-3">
        <div className="col-4">
          <h3>{query}</h3>
          <InputGroup>
            <Input
              onChange={(e) => {
                setQuery(e.target.value);
                const searchInstance = `${searchURL}${query}`;
                debounceAttempt(searchInstance);
              }}
              type="text"
              className="input mx-3"
              value={query}
            />
            <Button
              onClick={() => {
                setQuery("");
                setData([]);
              }}
              color="danger"
              className="rounded bg-dark"
            >
              Clear!
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-4">
          <ListGroup>
            {data?.map((item, id) => (
              <ListGroupItem key={id}>{item.title}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
