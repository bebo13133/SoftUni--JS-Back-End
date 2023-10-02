function levels(currentOption) {
    const availableOptions = [
        { key: 'crypto-wallet', label: 'Crypto Wallet', selected: false },
        { key: 'credit-card', label: 'Credit Card', selected: false },
        { key: 'debit-card', label: 'Debit Card', selected: false },
        { key: 'paypal', label: 'PayPal', selected: false },
    ]
    const result = availableOptions.map(x => x.key == currentOption ? { ...x, selected: true } : x);
    return result;
}

module.exports = levels;