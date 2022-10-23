// interface IUserService {
//     users: number;
//     getUsersInDatabase(): number;
// }
// // @nullUser
// // @threeUserAdvanced
// @setUsers(10)
// class UserService implements IUserService {
//     users: number = 1000;

//     getUsersInDatabase(): number {
//         return this.users;
//     }
// }

// function nullUser(target: Function) {
//     target.prototype.users = 0;

// }

// function setUsers(users: number) {
//     return (target: Function) => {
//         target.prototype.users = users;
// }
// }

// function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         users = 3;
//     }
// }

// console.log(new UserService().getUsersInDatabase());



//*****************Декоратор класса 



// interface IUserService {
//         users: number;
//         getUsersInDatabase(): number;
//     }

// @CreatedAt

//     class UserService implements IUserService {
//         users: number = 1000;

//         getUsersInDatabase(): number {
//             return this.users;
//         }
//     }

// function CreatedAt <T extends {new(...args: any[]): {} }> (constructor: T){
//     return class extends constructor{
//         createdAt = new Date();
//     }
// }

// console.log(new UserService());


//**************** */ Декоратор метода


// interface IUserService{
//         users: number;
//         getUsersInDatabase(): number;
//     }


//     class UserService implements IUserService {
//         users: number = 1000;

//         @Log()

//         getUsersInDatabase(): number {
//             throw new Error ('123');
//         }
//     }

//     function Log()
//     {   return(
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
//     ): TypedPropertyDescriptor<(...args: any[]) => any> | void {
//         console.log(target);
//         console.log(propertyKey);
//         console.log(descriptor);
//         descriptor.value = () => {
//             console.log('no error')
//         }
//     }
// }


// console.log(new UserService().getUsersInDatabase());

// interface IUserSevice {
//     users: number;
//     getUsersInDatabase(): number;
// }


// class UserService implements IUserSevice {
//     users: number = 1000;

//     @Catch({rethrow: true})

//     getUsersInDatabase(): number {
//         throw new Error('123');
//     }
// }

// function Catch({rethrow}: {rethrow : boolean} = {rethrow: true}) {
//     return (
//         target: Object,
//         _: string | symbol,
//         descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
//     ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
//         const method = descriptor.value;
//         descriptor.value = async (...args: any[]) => {
//             try {
//                 return await method?.apply(target, args)

//             }
//             catch (e) {
//                 if (e instanceof Error) {
//                     console.log(e.message);
//                     if (rethrow) { throw e }
//                 }

//             }
//         }
//     }
// }

// console.log(new UserService().getUsersInDatabase());




//.******************** Декоратор свойств 


// interface IUserSevice {
//     users: number;
//     getUsersInDatabase(): number;
// }


// class UserService implements IUserSevice {
//     @Max(100)

//     users: number = 1000;

//     getUsersInDatabase(): number {
//         throw new Error('123');
//     }
// }

// function Max(max: number) {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//     ) => {
//         let value: number;
//         const setter = function(newValue: number){
//             if(newValue > max){
//                 console.log(`no no, max ${max}`)
//             }else {
//                 value = newValue;
//             }
//         }
//         const getter = function (){
//             return value;
//         }

//         Object.defineProperty(target, propertyKey, {
//             set: setter,
//             get: getter
//         });
//     }
// }
// const userService = new UserService;
// userService.users = 1;
// console.log(userService.users);
// userService.users = 200;
// console.log(userService.users);

// ********************* Декоратор Аксессор


// interface IUserSevice {
//     users: number;
//     getUsersInDatabase(): number;
// }


// class UserService implements IUserSevice {
// private _users: number = 1000;


// @Log()
// set users(num: number){
//     this._users = num;
// }
// get users(){
//     return this._users
// }

//     getUsersInDatabase(): number {
//         throw new Error('123');
//     }
// }

// function Log() {
//     return (
//         target: Object,
//         _: string | symbol,
//         descriptor: PropertyDescriptor
//     ) => {
//         const set = descriptor.set;
//         descriptor.set =(...args: any) => {
//             console.log(args);
//             set?.apply(target, args);
//         }
//     }
// }
// const userService = new UserService;
// userService.users = 1;
// console.log(userService.users);
// userService.users = 200;
// console.log(userService.users);


// ********************* Декоратор Параметра
// import 'reflect-metadata'

// const POSITIVE_METADATAKEY = Symbol('POSITIVE_METADATAKEY');

// interface IUserService {
//     getUsersInDatabase(): number;
// }


// class UserService implements IUserService {
//     private _users: number;

//     getUsersInDatabase(): number {
//         return this._users;
//     }

//     @Validate()
//     setUsersInDatabase(@Positive() num: number): void {
//         this._users = num;
//     }
// }

// function Positive() {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         parametrIndex: number
//     ) => {
//         console.log(Reflect.getOwnMetadata('desing:type', target, propertyKey));
//         console.log(Reflect.getOwnMetadata('desing:paramtypes', target, propertyKey));
//         console.log(Reflect.getOwnMetadata('desing:returntype', target, propertyKey));
//         let existParams: number[] = Reflect.getMetadata(POSITIVE_METADATAKEY, target, propertyKey) || [];
//         existParams.push(parametrIndex)
//         Reflect.defineMetadata(POSITIVE_METADATAKEY, existParams, target, propertyKey)
//     }
// }

// function Validate() {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
//     ) => {
//         let method = descriptor.value;
//         descriptor.value = function (...args: any) {
//             let positivParams: number[] = Reflect.getMetadata(POSITIVE_METADATAKEY, target, propertyKey);
//             if (positivParams) {
//                 for( let index of positivParams){
//                     if (args[index] < 0){
//                         throw new Error('Тупой курс число нужно больше нуля');
//                     }
//                 }
//             }
//             return method?.apply(this, args);
//         }
//     }
    
// }
// const userService = new UserService();
// console.log(userService.setUsersInDatabase(10));
// console.log(userService.setUsersInDatabase(-1));


function Uni(name: string): any {
	console.log(`Инициализация: ${name}`);
	return function () {
		console.log(`Вызов: ${name}`);
	}
}

@Uni('Класс1')
@Uni('Класс2')
class MyClass {
	@Uni('Метод')
	method(@Uni('Параметр метода') _: any) { }

	constructor(@Uni('Параметр конструктора') _: any) {

	}

	@Uni('Свойство 3')
	props3?: any;

	@Uni('Свойство 1')
	props?: any;

	@Uni('Свойство static')
	static prop2?: any;

	@Uni('Метод static')
	static method2(@Uni('Параметр метода static') _: any) { }


}