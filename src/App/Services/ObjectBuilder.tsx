import { Key } from "../../Data/Types/Key";
import { Value } from "../../Data/Types/Value";

export default class ObjectBuilder<Target> {

    protected target : Partial<Target>;

    public constructor(target : Partial<Target> = {}) {

        this.target = target;

    }

    public add(key : Key<Target>, value : Value<Target>) : ObjectBuilder<Target> {

        this.target[key] = value;

        return this;

    }

    public addObject(object : Partial<Target>) : ObjectBuilder<Target> {

        this.target = { ...this.target, ...object };

        return this;

    }

    public flush() : Target {

        return this.target as Target;

    }

}