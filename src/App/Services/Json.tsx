export default class Json<Schema> {

    protected jsonString : string;

    public constructor(jsonString : string) {

        this.jsonString = jsonString;

    }

    public parse() : Schema {

        return JSON.parse(this.jsonString);

    }

}