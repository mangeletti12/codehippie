import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() {}

    // for sorting 
    sortCollection(array: any, field: string, orderBy) {
        const newArray = [...array];

        function compareValues(key: string, order: string) {

            return (a: any, b: any) => {

                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }
                // if string, toUpperCase it
                const varA = (typeof a[key] === 'string')
                    ? a[key].toUpperCase()
                    : a[key];

                const varB = (typeof b[key] === 'string')
                    ? b[key].toUpperCase()
                    : b[key];

                // console.log('a: ' + varA, 'b: ' + varB);

                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                
                return (order === 'desc') ? (comparison * -1) : comparison;

            };
        }
        //
        return newArray.sort(compareValues(field, orderBy));

    }


    // for pagination
    sliceCollection(array: any, pageNumber: number, pageSize: number = 100) {
        const start = (pageNumber - 1) * pageSize;
        const end = pageNumber * pageSize;
        console.log(start, end);
        const slice = array.slice(start, end);
        return slice;
    }


}