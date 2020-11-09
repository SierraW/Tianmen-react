import React, { useState, useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';


export default function ProjectManagerTableSearchBar() {
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    let timeoutId;

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);

        if (event.target.value.length > 2) {
            clearTimeout();

            setLoading(true);

            // simulate getting search result
            timeoutId = setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const clear = () => {
        setSearchValue("");
    };

    useEffect(() => {
        return () => {
            clearTimeout();
        };
    }, []);

    return <>
        <form className="quick-search-form">
            <div className="input-group">
                <div className={`input-group-prepend`}>
                    <span className="input-group-text">
                        <span className="svg-icon svg-icon-lg">
                            <SearchIcon></SearchIcon>
                        </span>
                    </span>
                </div>
                <input
                    type="text"
                    autoFocus={true}
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{minHeight: "3.3rem"}}
                />

                <div
                    className={`input-group-append ${loading ? "spinner spinner-sm spinner-primary" : ""
                        }")}`}
                >
                    <span className="input-group-text">
                        <i
                            style={{
                                display:
                                    loading && searchValue && searchValue.length > 0
                                        ? "none"
                                        : "flex",
                            }}
                            onClick={clear}
                            className="quick-search-close ki ki-close icon-sm text-muted"
                        />
                    </span>
                </div>
            </div>
        </form>
    </>;
}