class Counter {
    count: number = 0;

    increment() {
        this.count++; 
        console.log(`Count is now: ${this.count}`);
    }

    // 3. Reset về 0
    reset() {
        this.count = 0;
        console.log("Counter reset");
    }
}

// --- RUN
const myCounter = new Counter();

console.log("--- START COUNT ---");

myCounter.increment(); 
myCounter.increment(); 
myCounter.reset();