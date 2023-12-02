const cloneObject = <T>(o: T): T => JSON.parse(JSON.stringify(o));

export default cloneObject;
