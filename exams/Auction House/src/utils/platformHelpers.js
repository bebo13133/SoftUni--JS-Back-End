function levels(currentOption) {
    const availableOptions = [
        { key: 'estate', label: 'Real Estate', selected: false },
        { key: 'vehicles', label: 'Vehicles', selected: false },
        { key: 'furniture', label: 'Furniture', selected: false },
        { key: 'electronics', label: 'Electronics', selected: false },
        { key: 'other', label: 'Other', selected: false },

    ]
     const result = availableOptions.map(x => x.key == currentOption ? { ...x, selected: true } : x);
    return result;
}

module.exports = levels;