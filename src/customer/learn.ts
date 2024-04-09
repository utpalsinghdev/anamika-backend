export type Name = { name: string }
export type Age = { age: number }


type Union = Name | Age

let union: Union
union = { name: 'John Doe' }
union = { age: 30 }
union = { name: 'John Doe', age: 30 }

function filter(union: Union) {
    if ('name' in union) {
        union.name
    } else {
        console.log("it's not in the union")
    }
}