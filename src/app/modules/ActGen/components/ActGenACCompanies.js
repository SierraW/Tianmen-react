import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { em_company } from "../../../../services/firebaseInit";
import PropTypes from "prop-types"

const filter = createFilterOptions();

export default function ActGenAutoCompleteCompanies({ setCompany }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            var results = [];
            await em_company.get()
                .then(query => {
                    query.forEach(doc => {
                        results.push({
                            name: doc.data().name
                        });
                    });
                })
                .catch(() => {
                    alert("Get company status Failed");
                });

            if (active) {
                setOptions(results);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        setCompany(value);
    }, [value]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-companies"
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            size="small"
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue(newValue);
                } else if (newValue && newValue.inputValue) {
                    setValue(newValue.inputValue);
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            style={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.value === value.value}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Regular option
                return option.name;
            }}
            options={options}
            freeSolo
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}