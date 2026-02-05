
import { LoginPage } from "./pages/loginPage.js";
import { DashboardPage } from "./pages/dashboardPage.js";

const testLogin = async () => {
    // 1. Khởi tạo các Page Object
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    console.log("--- START: LOGIN ---");

    // 2. Thực hiện các bước test tuần tự
    await loginPage.gotoLoginPage();
    
    // Gọi hàm login với data test
    await loginPage.login("admin", "123456");

    // 3. Kiểm tra kết quả
    await dashboardPage.verifyLoginSuccess();

    console.log("--- DONE ---");
};

// Chạy hàm test
testLogin();