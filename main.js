// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:


const validateCred = (input) => {
    // We copy the card number to a local array (to not modifiy the original) and reverse it so it is easy to manipulate
    card = input.slice(0).reverse();
    // Doubling the value of every other digit starting on the second (pos 1 on array). Substracted 9 if it is over 9.
    for (let i = 1; i < card.length; i+=2) {
        card[i] = card[i] * 2;
        if (card[i] > 9) card[i] = card[i] - 9;
    }
    // We add all the values and find resto, if it is 0 card is valid
    if (card.reduce((accumulator, currentValue) => accumulator + currentValue) % 10 === 0) return true;
    return false;
}

const findInvalidCards = (lista) => {
    // The batch of cards is checked with vlidateCred(), if is valid the card is mapped for return, if it is not false is mapped. Then the falses are filtered.
    return lista.map((element) => {if(!validateCred(element)) {return element} else {return false}}).filter(element => element);
}

function idInvalidCardCompanies(lista) {
    let company = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // First digit of every card is used as index of company array
    lista.forEach(element => {company[element[0]]++});
    let companyName = [];
    // If an index on the array is more than 0 that means that at least one card from that company was found, then the name is added to an array.
    if (company[3] > 0) companyName.push('Amex (American Express)');
    if (company[4] > 0) companyName.push('Visa');
    if (company[5] > 0) companyName.push('Mastercard');
    if (company[6] > 0) companyName.push('Discover');
    if ((company[0] + company[1] + company[2] + company[7] + company[8] + company[9]) > 0) companyName.push('Company not found');
    return companyName;
}

// To convert a number to an array (one number one item)
const numToArray = (num) => {
    // The array to store the card number
    let tarjeta = [];
    // While there are still numbers we extract the last number (resto after dividing by 10) and add to the start of the array
    while (num > 0) {
        tarjeta.unshift(num % 10);
        // Delete the last number.
        num = (num - (num % 10)) / 10;
    }
    return tarjeta;
}

const cadenaToArray = (cadena) => {
    // If we have the card as string, first convert it to number and then call numToArray. Does not work with one or more 0 on the begining
    return numToArray(+cadena);
}

// Receives a card number (valid or invalid), returns a valid number corrected (changed last number if needed)
const toValid = (input) => {
    // Temporal array to make some math on it, reversed
    card = input.slice(0).reverse();
    // Double every other value. Substracted 9 if it is over 9
    for (let i = 1; i < card.length; i+=2) {
        card[i] = card[i] * 2;
        if (card[i] > 9) card[i] = card[i] - 9;
    }
    // checksum is what the last value should be
    let checksum = 10 - ((card.reduce((accumulator, currentValue) => accumulator + currentValue) - card[0]) % 10)
    // We copy on card the original number (to not modify the original) and then put the correct checksum on the last value of card
    card = input.slice(0);
    card[card.length -1] = checksum;
    return card;
}

// Should return an array of the invlid cards
console.log(findInvalidCards(batch));

// Should return list of companies with bad cards [ 'Amex (American Express)', 'Visa', 'Mastercard', 'Discover' ] 
console.log(idInvalidCardCompanies(findInvalidCards(batch)));

// Should return the same number with an 8 as the last number
console.log(toValid([4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 0]));
