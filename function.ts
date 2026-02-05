function sum (a:number , b:number):number {
    return a+b;
}

const multiply = (a:number, b:number) :number =>{
    return a*b;
}
function greet(name: string, role: string = "Guest"): void {
    console.log(`Hello ${name}, your role is ${role}`);
}

// in 
console.log("Tổng 5 + 10 =", sum(5, 10));
console.log("Tích 5 * 10 =", multiply(5, 10));

greet("Huong", "Admin"); 
greet("Huong");


// Nâng cao
const delayPrint = async (msg: string, time: number): Promise<void> => {
    console.log(`Đang đợi ${time}ms...`);
    
    await new Promise((resolve) => setTimeout(resolve, time));
    
    console.log(`Message: ${msg}`);
};
delayPrint("Học TypeScript đi nèo!", 2000);