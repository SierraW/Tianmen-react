import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { em_addOn, em_aida } from "../../../../services/firebaseInit";
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { formatDate } from "../../../../services/datePrintingService";

export default function ProjectSubscriptionManagementAddOnAutoComplete({ pid, onExit }) {
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [price, setPrice] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const loading = open && options.length === 0;

    function handleNumberChange(num) {
        if (num === "") {
            setPrice(0);
        } else if (num % 1 === 0) {
            setPrice(Number.parseInt(num).toFixed(0));
        } else if (num * 10 % 1 === 0) {
            setPrice(Number.parseFloat(num).toFixed(1));
        } else {
            setPrice(Number.parseFloat(num).toFixed(2));
        }
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {

            var addons = [];
            var result = await em_addOn.get();
            result.forEach((doc) => {
                addons.push({
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price
                })
            })

            if (active) {
                setOptions(addons);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        const coResObj = options.find(option => option.id === value.id);
        if (coResObj) {
            setPrice(coResObj.price);
        }
    }, [value])

    function addNewAddOn() {
        if (value) {
            em_aida(pid).doc(value.id).set({
                name: value.name,
                added: formatDate(Date.now()),
                price: Number.parseFloat(price)
            }).then(() => {
                alert("success");
                onExit();
            })
        } else {
            alert("You must select a name.");
        }
    }

    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                id="add-on-ac"
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Add-On Name"
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

            <TextField
                className="mt-6"
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(event) => {
                    handleNumberChange(event.target.value)
                }}
            />

            <Button className="mt-6 ml-7" variant="primary" onClick={() => addNewAddOn()}>
                Add
            </Button>
        </>
    );
}

ProjectSubscriptionManagementAddOnAutoComplete.propTypes = {
    pid: PropTypes.string.isRequired,
    onExit: PropTypes.func.isRequired
}