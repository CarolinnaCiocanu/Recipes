export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        console.log('return null this._tokenExpirationDate = ', this._tokenExpirationDate);
        console.log('return null new Date() > this._tokenExpirationDate = ', new Date() > this._tokenExpirationDate);

        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            console.log('return null');
            return null;
        }
        console.log('return this._token = ', this._token);

        return this._token;
    }
}
