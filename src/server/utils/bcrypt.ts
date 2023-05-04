import * as bcrypt from 'bcrypt';

const hash = (password: string) => bcrypt.hash(password, 12);
const compareHash = (password: string, hashed: string) => bcrypt.compareSync(password, hashed);
// function compareHash(password: string, hashed: string) {
//     return bcrypt.compareSync(password, hashed);
// }

export default {
    hash,
    compareHash
};

// import * as bcrypt from 'bcrypt';

// function generateHash(password: string) {
//     const salt = bcrypt. genSaltSync(12);
//     const hash = bcrypt.hashSync(password, salt);
//     return hash;
// }

// function compareHash(password: string, hashed: string) {
//     return bcrypt.compareSync(password, hashed);
// }