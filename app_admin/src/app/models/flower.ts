/*  This model represents the data coming from the API endpoint.
/   Instances of this interface will be used to transfer the HTML form data 
/   back to the component as well as back and forth with the REST endpoint. 
/   Angular will take care of automatically converting or mapping the JSON data 
/   into a JavaScript object and back.
*/
export interface Flower {
    _id: string, // internal MongoDB primary key
    code: string,
    name: string,
    latin: string,
    type: string,
    size: string,
    cost: string,
    image: string,
    description: string
}