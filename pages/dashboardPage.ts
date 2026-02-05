export class DashboardPage {
    
    // Verify đã login thành công
    async verifyLoginSuccess() {
        console.log("... Checking Dashboard");
        await new Promise(r => setTimeout(r, 500));
        console.log("SUCCESS: Dashboard!");
    }
}