// tsc
// node dist/test.js
// 1
// function Component(target: Function) {
//     console.log(target)
// }
//
// @Component
// export class User {
//     id: number
//
//     updateId(newId: number) {
//         this.id = newId
//         return this.id
//     }
// }

// // 2
// function Component(id: number) {
//     console.log('init')
//     return(target: Function) => {
//        console.log('run') 
//        target.prototype.id = id
//     }
// }
//
// @Component(1)
// export class User {
//     id: number
//
//     updateId(newId: number) {
//         this.id = newId
//         return this.id
//     }
// }
//
// console.log(new User().id)


// // 3
// function Component(id: number) {
//     console.log('init component')
//     return(target: Function) => {
//        console.log('run component') 
//        target.prototype.id = id
//     }
// }
// function Logger() {
//     console.log('init logger')
//     return(target: Function) => {
//        console.log('run logger') 
//     }
// }
//
// @Logger()
// @Component(1)
// export class User {
//     id: number
//
//     updateId(newId: number) {
//         this.id = newId
//         return this.id
//     }
// }
//
// console.log(new User().id)


// 4
// NOTE: redefinition of methood
//
// function Component(id: number) {
//     console.log('init component')
//     return(target: Function) => {
//        console.log('run component') 
//        target.prototype.id = id
//     }
// }
// function Logger() {
//     console.log('init logger')
//     return(target: Function) => {
//        console.log('run logger') 
//     }
// }
// function Method(
//     target: Object,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor
// ){
//     console.log(propertyKey)
//     const oldValue = propertyDescriptor.value
//     propertyDescriptor.value = function(...args: any[]){
//         return args[0] * 10
//     }
// }
//
// @Logger()
// @Component(1)
// export class User {
//     id: number
//
//     @Method
//     updateId(newId: number) {
//         this.id = newId
//         return this.id
//     }
// }
//
// console.log(new User().id)
// console.log(new User().updateId(2))


// 6
// NOTE: 
//
function Component(id: number) {
    console.log('init component')
    return (target: Function) => {
        console.log('run component')
        target.prototype.id = id
    }
}
function Logger() {
    console.log('init logger')
    return (target: Function) => {
        console.log('run logger')
    }
}
function Method(
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
) {
    console.log(propertyKey)
    const oldValue = propertyDescriptor.value
    propertyDescriptor.value = function(...args: any[]) {
        return args[0] * 10
    }
}
function Prop(
    target: Object,
    propertyKey: string,
) {
    let value: number

    const getter = () => {
        console.log('get')
        return value
    }
    const setter = (newValue: number) => {
        console.log('set')
        value = newValue
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    })
}
function Param(
    target: Object,
    propertyKey: string,
    index: number
) {
    console.log(propertyKey, index)
}

@Logger()
@Component(1)
export class User {
    @Prop id: number

    @Method
    updateId(@Param newId: number) {
        this.id = newId
        return this.id
    }
}

console.log(new User().id)
console.log(new User().updateId(2))


