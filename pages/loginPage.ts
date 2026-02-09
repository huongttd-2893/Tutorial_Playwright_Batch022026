
export class LoginPage {
    
    async gotoLoginPage() {
        console.log("... Go to Login...");
        // Đợi 1 chút
        await new Promise(r => setTimeout(r, 500)); 
    }

    // đăng nhập
    async login(username: string, pass: string) {
        console.log(`... Username: ${username}`);
        console.log(`... Password: ${pass}`);
        console.log("... Click Login");
        await new Promise(r => setTimeout(r, 1000));
    }
}