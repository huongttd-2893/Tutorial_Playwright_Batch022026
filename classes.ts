// 1. Tạo Interface
interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}

// 2. Tạo Class User implement 
class User implements IUser {
    constructor(
        public name: string, 
        public email: string, 
        public isAdmin: boolean
    ) {}

    // Method lấy thông tin
    getInfo(): string {
        return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
    }
}

// --- TEST CƠ BẢN ---
const user1 = new User("Huong", "tang.thi.diem.huong@sun-asterisk.com", false);
console.log(user1.getInfo());

// 3. Tạo Class Admin kế thừa từ User
class AdminUser extends User {
    // Admin có thêm quyền xóa user
    deleteUser(userToDelete: User): void {
        console.log(`[Admin] ${this.name} deleted user: ${userToDelete.name}`);
    }
}

// --- TEST NÂNG CAO ---
const admin = new AdminUser("Admin", "admin@company.com", true);

// Thử chức năng riêng của Admin
admin.deleteUser(user1);

// Tạo mảng chứa cả User thường và Admin (Tính đa hình)
const users: User[] = [user1, admin];

console.log("\n--- LIST USERS ---");
// Duyệt mảng và in thông tin
users.forEach(u => {
    console.log(u.getInfo());
});