import { BOOLEAN } from "../../Data/Constants/Boolean";

export default class LocalStorage {

    protected key : string;

    public constructor(key : string) {

        this.key = key;

    }

    public has() : boolean {

        return localStorage.getItem(this.key) !== null;

    }

    public getString() : string | null {

        const result = localStorage.getItem(this.key);

        return result;

    }

    public getNumber() : number | null {

        const result = localStorage.getItem(this.key);

        return result ? parseInt(result) || null : null;

    }

    public getBoolean() : boolean | null {

        const result = localStorage.getItem(this.key);

        return result ? result === BOOLEAN.TRUE ? true : result === BOOLEAN.FALSE ? false : null : null;

    }

    public setString(value : string) : void {

        localStorage.setItem(this.key, value);

    }

    public setNumber(value : number) : void {

        localStorage.setItem(this.key, value.toString());

    }

    public setBoolean(value : boolean) : void {

        localStorage.setItem(this.key, value ? BOOLEAN.TRUE : BOOLEAN.FALSE);

    }

    public remove() : void {

        localStorage.removeItem(this.key);

    }

}