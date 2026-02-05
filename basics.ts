const username: string = "Huong";
let age: number = 25; 
const isActive: boolean = true;
const roles: string[] = ["admin", "editor"]; 

const user = { name: username, email: "tang.thi.diem.huong@sun-asterisk.com", isAdmin: true }

// In ra console
console.log("Username:", username);
console.log("Age:", age);
console.log("Is Active?", isActive);
console.log("Roles:", roles);
console.log("User Object:", user);

const checkAge = (checkAgeValue : number) : void =>{
   if (checkAgeValue >= 18) {
        console.log("Adult");
    } else {
        console.log("Under 18");
    } 
}

checkAge (age);