const ACCOUNTS = {
        '1234567890': {'pin': '12345', 'name': 'John Doe', 'balance': 5000},
        '0987654321': {'pin': '54321', 'name': 'Jane Smith', 'balance': 10000}
    };

let currentAccount = null;

function showLogin() {
    toggleVisibility('welcome', false);
    toggleVisibility('login', true);
}

function showCreateAccount() {
    toggleVisibility('welcome', false);
    toggleVisibility('createAccount', true);
}

function showChangePin() {
    toggleVisibility('mainMenu', false);
    toggleVisibility('changePin', true);
}

function showWelcome() {
    toggleVisibility('login', false);
    toggleVisibility('createAccount', false);
    toggleVisibility('changePin', false);
    toggleVisibility('welcome', true);
}

function login() {
    const accountNumber = document.getElementById('loginAccountNumber').value;
    const pin = document.getElementById('loginPin').value;
    
    if (ACCOUNTS[accountNumber] && ACCOUNTS[accountNumber].pin === pin) {
        currentAccount = accountNumber;
        toggleVisibility('login', false);
        toggleVisibility('mainMenu', true);
    } else {
        document.getElementById('loginError').textContent = 'Invalid account number or PIN.';
    }
}

function createAccount() {
    const accountNumber = document.getElementById('newAccountNumber').value;
    const pin = document.getElementById('newPin').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);
    
    if (ACCOUNTS[accountNumber]) {
        document.getElementById('createAccountError').textContent = 'Account number already exists.';
    } else if (pin.length !== 5) {
        document.getElementById('createAccountError').textContent = 'PIN must be 5 digits.';
    } else {
        ACCOUNTS[accountNumber] = { pin: pin, balance: initialBalance };
        showMessage('Account created successfully. You can now log in.');
        showWelcome();
    }
}

function changePin() {
    const currentPin = document.getElementById('currentPin').value;
    const newPin = document.getElementById('newPin').value;

    if (ACCOUNTS[currentAccount].pin !== currentPin) {
        document.getElementById('changePinError').textContent = 'Current PIN is incorrect.';
        return;
    }
    if (newPin.length !== 5 || isNaN(newPin)) {
        document.getElementById('changePinError').textContent = 'New PIN must be 5 digits.';
        return;
    }
    ACCOUNTS[currentAccount].pin = newPin;
    showMessage('PIN changed successfully.');
    reset();
}

function viewBalance() {
    showMessage(`Your current balance is: N${ACCOUNTS[currentAccount].balance}`);
}

function showWithdraw() {
    toggleVisibility('mainMenu', false);
    toggleVisibility('withdrawMenu', true);
}

function withdraw(amount) {
    if (amount > ACCOUNTS[currentAccount].balance) {
        showMessage('Insufficient funds.');
    } else {
        ACCOUNTS[currentAccount].balance -= amount;
        showMessage(`Withdrawal successful. Your new balance is: N${ACCOUNTS[currentAccount].balance}`);
    }
}

function showDeposit() {
    toggleVisibility('mainMenu', false);
    toggleVisibility('depositMenu', true);
}

function deposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    if (amount > 0) {
        ACCOUNTS[currentAccount].balance += amount;
        showMessage(`Deposit successful. Your new balance is: N${ACCOUNTS[currentAccount].balance}`);
    } else {
        showMessage('Invalid deposit amount.');
    }
}

function cancelTransaction() {
    reset();
}

function exit() {
    showMessage('Thank you for using ABC Bank ATM.');
    reset();
}

function showMessage(message) {
    document.getElementById('messageText').textContent = message;
    toggleVisibility('message', true);
}

function reset() {
    toggleVisibility('withdrawMenu', false);
    toggleVisibility('depositMenu', false);
    toggleVisibility('changePin', false);
    toggleVisibility('mainMenu', false);
    toggleVisibility('message', false);
    showWelcome();
}

function toggleVisibility(id, show) {
    document.getElementById(id).classList.toggle('hidden', !show);
}
