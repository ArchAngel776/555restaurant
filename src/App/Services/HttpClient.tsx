import { STRING } from "../../Data/Constants/String";
import HttpRequestHeaders from "../../Data/Interfaces/HttpRequestHeaders";
import ObjectStructure from "../../Data/Interfaces/ObjectStructure";

export default class HttpRequest<Response = ObjectStructure> {

    protected url : string;

    protected headers : HttpRequestHeaders;

    protected body : string;

    public constructor(url : string) {

        this.url = url;

        this.headers = {};

        this.body = STRING.EMPTY;

    }

    public Header(headerName : string, headerValue : string) : HttpRequest<Response> {

        this.headers[headerName] = headerValue;

        return this;

    }

    public Headers(headers : HttpRequestHeaders) : HttpRequest<Response> {

        this.headers = headers;

        return this;

    }

    public Body(body : string) : HttpRequest<Response> {

        this.body = body;

        return this;

    }

    public JsonBody(json : ObjectStructure) : HttpRequest<Response> {

        this.body = JSON.stringify(json);

        return this;

    }

    public async Get() : Promise<Response> {

        const { url, headers } = this;

        const response = await fetch(url, { method: "GET", headers });

        const result : Response = await response.json()

        return result;

    }

    public async Post() : Promise<Response> {

        const { url, headers, body } = this;

        const response = await fetch(url, { method: "POST", headers, body });

        const result : Response = await response.json()

        return result;

    }

}